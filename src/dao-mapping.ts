import { BigInt } from '@graphprotocol/graph-ts';
import {
  NewProposal as NewProposalEvent,
  ProposalCancelled as ProposalCancelledEvent,
  ProposalSponsored as ProposalSponsoredEvent,
  ProposalProcessed as ProposalProcessedEvent,
  VoteCast as VoteCastEvent,
  DelegateChanged as DelegateChangedEvent,
  PauseFlipped as PauseFlippedEvent,
  Transfer as TransferEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  Approval as ApprovalEvent,
} from '../generated/templates/KaliDAO/KaliDAO';
import { Token, Member, Proposal, Vote, Delegate } from '../generated/schema';
import { getBalance } from './token-helpers';
import { validateProposalType } from './utils';
import { ZERO_ADDRESS } from './constants';

export function handleNewProposal(event: NewProposalEvent): void {
  const daoId = event.address.toHexString();
  const proposalId = daoId + '-proposal-' + event.params.proposal.toHex();

  const proposal = new Proposal(proposalId);
  const proposalType = validateProposalType(event.params.proposalType);

  proposal.dao = daoId;
  proposal.proposalType = proposalType;
  proposal.proposer = event.params.proposer;
  proposal.description = event.params.description;
  proposal.creationTime = event.block.timestamp;

  proposal.save();
}

export function handleProposalProcessed(event: ProposalProcessedEvent): void {
  const daoId = event.address.toHexString();
  const proposalId = daoId + '-proposal-' + event.params.proposal.toHex();
  let proposal = Proposal.load(proposalId);

  if (proposal === null) {
    proposal = new Proposal(proposalId);
  }

  proposal.status = event.params.didProposalPass;
  proposal.save();
}

export function handleProposalCancelled(event: ProposalCancelledEvent): void {
  const daoId = event.address.toHexString();
  const proposalId = daoId + '-proposal-' + event.params.proposal.toHex();
  let proposal = Proposal.load(proposalId);

  if (proposal === null) {
    proposal = new Proposal(proposalId);
  }

  proposal.proposer = event.params.proposer;
  proposal.status = false;
  proposal.save();
}

export function handleProposalSponsored(event: ProposalSponsoredEvent): void {
  const daoId = event.address.toHexString();
  const proposalId = daoId + '-proposal-' + event.params.proposal.toHex();
  let proposal = Proposal.load(proposalId);

  if (proposal === null) {
    proposal = new Proposal(proposalId);
  }

  proposal.sponsor = event.params.sponsor;
  proposal.sponsored = true;

  proposal.save();
}

export function handleVoteCast(event: VoteCastEvent): void {
  const daoId = event.address.toHexString();
  const proposalId = daoId + '-proposal-' + event.params.proposal.toHex();
  const voteId = proposalId + '-vote-' + event.transaction.hash.toHex();

  const vote = new Vote(voteId);

  vote.dao = daoId;
  vote.proposal = proposalId;
  vote.voter = event.params.voter;
  vote.vote = event.params.approve;

  vote.save();
}

// kalidao token events
export function handleTransfer(event: TransferEvent): void {
  const daoId = event.address.toHexString();

  // Minting
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    const memberId = daoId + '-member-' + event.params.to.toHexString();
    let member = Member.load(memberId);

    if (member === null) {
      member = new Member(memberId);
      member.shares = BigInt.fromI32(0);
      member.dao = daoId;
      member.address = event.params.to;
    }

    member.shares = member.shares.plus(event.params.amount);
    member.save();
  } else {
    const memberFromId = daoId + '-member-' + event.params.from.toHexString();
    const memberToId = daoId + '-member-' + event.params.to.toHexString();
    let memberFrom = Member.load(memberFromId);
    let memberTo = Member.load(memberToId);

    if (memberFrom === null) {
      memberFrom = new Member(memberFromId);
      memberFrom.dao = daoId;
      memberFrom.address = event.params.from;
    }

    if (memberTo === null) {
      memberTo = new Member(memberToId);
      memberTo.dao = daoId;
      memberTo.address = event.params.to;
    }

    memberFrom.shares = getBalance(event.address, event.params.from);
    memberTo.shares = getBalance(event.address, event.params.to);

    memberFrom.shares = memberFrom.shares.minus(event.params.amount);
    memberTo.shares = memberTo.shares.plus(event.params.amount);

    // check negative
    // if (memberFrom.shares < BigInt.fromI32(0)) {
    //   memberFrom.
    // }

    memberFrom.save();
    memberTo.save();
  }
}

export function handleApproval(event: ApprovalEvent): void {
  const daoId = event.address.toHexString();
  const memberId = daoId + '-member-' + event.params.owner.toHexString();
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
  }

  member.approval = true;
  member.amountApproved = event.params.amount;

  member.save();
}

export function handleDelegateChanged(event: DelegateChangedEvent): void {
  const daoId = event.address.toHexString();
  const memberId = daoId + '-member-' + event.params.delegator.toHexString();
  const delegateId = daoId + '-delegate-' + event.params.toDelegate.toHexString();

  let delegate = Delegate.load(delegateId);

  if (delegate === null) {
    delegate = new Delegate(delegateId);
  }

  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
  }

  member.delegate = delegateId;
  delegate.dao = daoId;

  member.save();
  delegate.save();
}

export function handleDelegateVotesChanged(event: DelegateVotesChangedEvent): void {
  const daoId = event.address.toHexString();
  const delegateId = daoId + '-delegate-' + event.params.delegate.toHexString();
  let delegate = Delegate.load(delegateId);

  if (delegate === null) {
    delegate = new Delegate(delegateId);
  }

  delegate.balance = event.params.newBalance;
  delegate.save();
}

export function handlePauseFlipped(event: PauseFlippedEvent): void {
  const daoId = event.address.toHexString();
  const tokenId = daoId + '-token';

  let token = Token.load(tokenId);

  if (token === null) {
    token = new Token(tokenId);
  }

  token.paused = event.params.paused;

  token.save();
}
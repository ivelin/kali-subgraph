// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewTributeProposal extends ethereum.Event {
  get params(): NewTributeProposal__Params {
    return new NewTributeProposal__Params(this);
  }
}

export class NewTributeProposal__Params {
  _event: NewTributeProposal;

  constructor(event: NewTributeProposal) {
    this._event = event;
  }

  get dao(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get proposal(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get asset(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get nft(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }

  get value(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class TributeProposalCancelled extends ethereum.Event {
  get params(): TributeProposalCancelled__Params {
    return new TributeProposalCancelled__Params(this);
  }
}

export class TributeProposalCancelled__Params {
  _event: TributeProposalCancelled;

  constructor(event: TributeProposalCancelled) {
    this._event = event;
  }

  get dao(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposal(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TributeProposalReleased extends ethereum.Event {
  get params(): TributeProposalReleased__Params {
    return new TributeProposalReleased__Params(this);
  }
}

export class TributeProposalReleased__Params {
  _event: TributeProposalReleased;

  constructor(event: TributeProposalReleased) {
    this._event = event;
  }

  get dao(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposal(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class KaliDAOtribute__tributesResult {
  value0: Address;
  value1: Address;
  value2: boolean;
  value3: BigInt;

  constructor(
    value0: Address,
    value1: Address,
    value2: boolean,
    value3: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromBoolean(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class KaliDAOtribute extends ethereum.SmartContract {
  static bind(address: Address): KaliDAOtribute {
    return new KaliDAOtribute("KaliDAOtribute", address);
  }

  multicall(data: Array<Bytes>): Array<Bytes> {
    let result = super.call("multicall", "multicall(bytes[]):(bytes[])", [
      ethereum.Value.fromBytesArray(data)
    ]);

    return result[0].toBytesArray();
  }

  try_multicall(data: Array<Bytes>): ethereum.CallResult<Array<Bytes>> {
    let result = super.tryCall("multicall", "multicall(bytes[]):(bytes[])", [
      ethereum.Value.fromBytesArray(data)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytesArray());
  }

  tributes(param0: Address, param1: BigInt): KaliDAOtribute__tributesResult {
    let result = super.call(
      "tributes",
      "tributes(address,uint256):(address,address,bool,uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return new KaliDAOtribute__tributesResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toBoolean(),
      result[3].toBigInt()
    );
  }

  try_tributes(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<KaliDAOtribute__tributesResult> {
    let result = super.tryCall(
      "tributes",
      "tributes(address,uint256):(address,address,bool,uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new KaliDAOtribute__tributesResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toBoolean(),
        value[3].toBigInt()
      )
    );
  }
}

export class CancelTributeProposalCall extends ethereum.Call {
  get inputs(): CancelTributeProposalCall__Inputs {
    return new CancelTributeProposalCall__Inputs(this);
  }

  get outputs(): CancelTributeProposalCall__Outputs {
    return new CancelTributeProposalCall__Outputs(this);
  }
}

export class CancelTributeProposalCall__Inputs {
  _call: CancelTributeProposalCall;

  constructor(call: CancelTributeProposalCall) {
    this._call = call;
  }

  get dao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposal(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CancelTributeProposalCall__Outputs {
  _call: CancelTributeProposalCall;

  constructor(call: CancelTributeProposalCall) {
    this._call = call;
  }
}

export class MulticallCall extends ethereum.Call {
  get inputs(): MulticallCall__Inputs {
    return new MulticallCall__Inputs(this);
  }

  get outputs(): MulticallCall__Outputs {
    return new MulticallCall__Outputs(this);
  }
}

export class MulticallCall__Inputs {
  _call: MulticallCall;

  constructor(call: MulticallCall) {
    this._call = call;
  }

  get data(): Array<Bytes> {
    return this._call.inputValues[0].value.toBytesArray();
  }
}

export class MulticallCall__Outputs {
  _call: MulticallCall;

  constructor(call: MulticallCall) {
    this._call = call;
  }

  get results(): Array<Bytes> {
    return this._call.outputValues[0].value.toBytesArray();
  }
}

export class ReleaseTributeProposalCall extends ethereum.Call {
  get inputs(): ReleaseTributeProposalCall__Inputs {
    return new ReleaseTributeProposalCall__Inputs(this);
  }

  get outputs(): ReleaseTributeProposalCall__Outputs {
    return new ReleaseTributeProposalCall__Outputs(this);
  }
}

export class ReleaseTributeProposalCall__Inputs {
  _call: ReleaseTributeProposalCall;

  constructor(call: ReleaseTributeProposalCall) {
    this._call = call;
  }

  get dao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposal(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ReleaseTributeProposalCall__Outputs {
  _call: ReleaseTributeProposalCall;

  constructor(call: ReleaseTributeProposalCall) {
    this._call = call;
  }
}

export class ReleaseTributeProposalAndProcessCall extends ethereum.Call {
  get inputs(): ReleaseTributeProposalAndProcessCall__Inputs {
    return new ReleaseTributeProposalAndProcessCall__Inputs(this);
  }

  get outputs(): ReleaseTributeProposalAndProcessCall__Outputs {
    return new ReleaseTributeProposalAndProcessCall__Outputs(this);
  }
}

export class ReleaseTributeProposalAndProcessCall__Inputs {
  _call: ReleaseTributeProposalAndProcessCall;

  constructor(call: ReleaseTributeProposalAndProcessCall) {
    this._call = call;
  }

  get dao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposal(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ReleaseTributeProposalAndProcessCall__Outputs {
  _call: ReleaseTributeProposalAndProcessCall;

  constructor(call: ReleaseTributeProposalAndProcessCall) {
    this._call = call;
  }
}

export class SubmitTributeProposalCall extends ethereum.Call {
  get inputs(): SubmitTributeProposalCall__Inputs {
    return new SubmitTributeProposalCall__Inputs(this);
  }

  get outputs(): SubmitTributeProposalCall__Outputs {
    return new SubmitTributeProposalCall__Outputs(this);
  }
}

export class SubmitTributeProposalCall__Inputs {
  _call: SubmitTributeProposalCall;

  constructor(call: SubmitTributeProposalCall) {
    this._call = call;
  }

  get dao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalType(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get description(): string {
    return this._call.inputValues[2].value.toString();
  }

  get accounts(): Array<Address> {
    return this._call.inputValues[3].value.toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[4].value.toBigIntArray();
  }

  get payloads(): Array<Bytes> {
    return this._call.inputValues[5].value.toBytesArray();
  }

  get nft(): boolean {
    return this._call.inputValues[6].value.toBoolean();
  }

  get asset(): Address {
    return this._call.inputValues[7].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }
}

export class SubmitTributeProposalCall__Outputs {
  _call: SubmitTributeProposalCall;

  constructor(call: SubmitTributeProposalCall) {
    this._call = call;
  }
}
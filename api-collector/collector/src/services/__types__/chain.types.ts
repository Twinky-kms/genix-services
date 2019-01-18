export type BlockResponse = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: string[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  previousblockhash: string;
  nextblockhash: string;
};

export type ChainData = {
  blockTime: number;
  difficulty: number;
  hashrate: number;
  height: number;
  lastHash: string;
  supply: number;
  timestamp: number;
};

export type ChainServiceArguments = {
  protocol: string;
  user: string;
  pass: string;
  host: string;
  port: number;
};

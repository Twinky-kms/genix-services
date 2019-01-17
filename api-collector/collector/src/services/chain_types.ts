export type Block = {
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

export type MiningInfo = {
  blocks: number;
  currentblockweight: number;
  currentblocktx: number;
  difficulty: number;
  networkhashps: number;
  hashespersec: number;
  pooledtx: number;
  chain: string;
  warnings: string;
};

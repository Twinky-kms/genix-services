export type PoolResponse = {
  PGN: {
    algo: string;
    port: number;
    name: string;
    height: number;
    workers: number;
    shares: number;
    hashrate: number;
    estimate: string;
    "24h_blocks": number;
    "24h_btc": number;
    lastblock: number;
    timesincelast: number;
  };
};

export type PoolData = {
  miners: number;
  hashrate: number;
  lastBlock: number;
  lastBlockTime: number;
  dailyBlocks: number;
  timeToFind: number;
  timestamp: number;
};

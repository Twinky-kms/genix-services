import axios from "axios";
import { PoolResponse, PoolData } from "./__types__/pool.types";

export class Pool {
  private _url: string;

  constructor(yiimpUrl: string) {
    this._url = `${yiimpUrl}/api/currencies`;
  }

  async getLatestData() {
    const { data } = await axios.get<PoolResponse>(this._url);
    const poolResponse = data.PGN;

    const lastBlockTime = Date.now() / 1000 - poolResponse.timesincelast;
    const dailyBlocks = poolResponse["24h_blocks"];

    const poolData: PoolData = {
      miners: poolResponse.workers,
      hashrate: poolResponse.hashrate,
      lastBlock: poolResponse.lastblock,
      lastBlockTime,
      dailyBlocks,
      timeToFind: (24 * 60 * 60) / dailyBlocks,
      timestamp: Math.floor(Date.now() / 1000)
    };

    return poolData;
  }
}

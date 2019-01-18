import axios from "axios";

import {
  PoolResponse,
  PoolData,
  PoolServiceArguments
} from "./__types__/pool.types";

export class PoolService {
  private _url: string;
  private _coinId: string;

  constructor({ url, coinId }: PoolServiceArguments) {
    this._url = `${url}/api/currencies`;
    this._coinId = coinId;
  }

  async getLatestData() {
    const { data } = await axios.get<PoolResponse>(this._url);
    const poolResponse = data[this._coinId];

    const lastBlockTime = Date.now() / 1000 - poolResponse.timesincelast;
    const dailyBlocks = poolResponse["24h_blocks"];

    const poolData: PoolData = {
      miners: poolResponse.workers,
      hashrate: poolResponse.hashrate,
      lastBlock: poolResponse.lastblock,
      lastBlockTime: Math.floor(lastBlockTime),
      dailyBlocks,
      timeToFind: (24 * 60 * 60) / dailyBlocks,
      timestamp: Math.floor(Date.now() / 1000)
    };

    return poolData;
  }
}

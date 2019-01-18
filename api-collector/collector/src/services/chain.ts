import axios from "axios";

import {
  ChainServiceArguments,
  ChainData,
  BlockResponse
} from "./__types__/chain.types";

export class ChainService {
  private _url: string;

  constructor({ protocol, user, pass, host, port }: ChainServiceArguments) {
    this._url = `${protocol}://${user}:${pass}@${host}:${port}`;
  }

  /**
   * get the latest chain data
   */

  public async getLatestData(): Promise<ChainData> {
    const lastHeight = await this._get<number>("getblockcount");
    const chainData = this.getChainData(lastHeight);
    return chainData;
  }

  /**
   * Get chain data from block height
   */

  public async getChainData(height: number) {
    const averageWindow = Math.min(72, height);
    const averagingHeight = height - averageWindow;

    const averagingBlock = await this._getBlock(averagingHeight);
    const block = await this._getBlock(height);

    const blockTime =
      (block.mediantime - averagingBlock.mediantime) / averageWindow;

    const hashrate = (block.difficulty * Math.pow(2, 32)) / blockTime;

    const chainData: ChainData = {
      blockTime: blockTime || 1,
      difficulty: block.difficulty,
      hashrate: hashrate || 1,
      height: block.height,
      lastHash: block.hash,
      supply: block.height * 5000,
      timestamp: Math.floor(Date.now() / 1000)
    };

    return chainData;
  }

  // /**
  //  * Get a block response from block height
  //  */

  private async _getBlock(height: number) {
    const hash = await this._get<string>("getblockhash", height);
    const blockResponse = await this._get<BlockResponse>("getblock", hash);

    return blockResponse;
  }

  /**
   * Send a command and arguments to the bitcoin RPC server
   */
  private async _get<T>(command: string, ...args: any) {
    const request = {
      jsonrpc: "1.0",
      method: command,
      params: [...args]
    };

    const { data } = await axios.post<{ result: T }>(this._url, request);

    return data.result;
  }
}

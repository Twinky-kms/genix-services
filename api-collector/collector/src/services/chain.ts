import axios from "axios";
import { Block, MiningInfo } from "./__types__/chain.types";

type Arguments = {
  protocol: string;
  user: string;
  pass: string;
  host: string;
  port: number;
};

export class Chain {
  private _url: string;

  constructor({ protocol, user, pass, host, port }: Arguments) {
    this._url = `${protocol}://${user}:${pass}@${host}:${port}`;
  }

  /**
   * Send a command and arguments to the bitcoin RPC server
   */
  async get<T>(command: string, ...args: any) {
    const request = {
      jsonrpc: "1.0",
      method: command,
      params: [...args]
    };

    const { data } = await axios.post<{ result: T }>(this._url, request);

    return data.result;
  }

  /**
   * Get a block from block height
   */

  async getBlock(heightOrHash: number | string) {
    var hash: string = "";

    if (typeof heightOrHash == "number") {
      const height = heightOrHash;
      hash = await this.get<string>("getblockhash", height);
    } else {
      hash = heightOrHash;
    }

    const block = await this.get<Block>("getblock", hash);
    return block;
  }

  /**
   * Get current mining info
   */
  async getMiningInfo() {
    const miningInfo = await this.get<MiningInfo>("getmininginfo");
    return miningInfo;
  }
}

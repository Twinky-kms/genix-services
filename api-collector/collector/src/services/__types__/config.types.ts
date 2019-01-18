import admin from "firebase-admin";

import { ChainServiceArguments } from "./chain.types";
import { PoolServiceArguments } from "./pool.types";

export type ConfigArguments = {
  chain: ChainServiceArguments;
  pool: PoolServiceArguments;
  market: string;
  database: admin.AppOptions;
};

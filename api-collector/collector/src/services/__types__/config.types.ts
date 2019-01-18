import admin from "firebase-admin";

import { MainArguments } from "./main.types";
import { ChainServiceArguments } from "./chain.types";
import { PoolServiceArguments } from "./pool.types";

export type ConfigArguments = {
  main: MainArguments;
  chain: ChainServiceArguments;
  pool: PoolServiceArguments;
  market: string;
  database: admin.AppOptions;
};

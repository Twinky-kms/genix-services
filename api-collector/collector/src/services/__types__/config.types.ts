import admin from "firebase-admin";

import { ChainServiceArguments } from "./chain.types";

export type ConfigArguments = {
  chain: ChainServiceArguments;
  pool: string;
  market: string;
  database: admin.AppOptions;
};

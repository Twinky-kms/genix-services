import admin from "firebase-admin";

const serviceAccountKey = require("./serviceAccountKey.json");

import { ConfigArguments } from "./services/__types__/config.types";

export const config: ConfigArguments = {
  /// eg: http://rpc_user:rpc_password@localhost:8757
  chain: {
    protocol: "http",
    user: "rpc_user",
    pass: "rpc_password",
    host: "localhost",
    port: 8757
  },

  /// the url for a yiimp pool
  pool: "https://pool.pigeoncoin.org",

  /// the CoinGecko coin id
  market: "pigeoncoin",

  /// Firebase credential and databaseUrl
  database: {
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://scratch-project-9f138.firebaseio.com"
  }
};

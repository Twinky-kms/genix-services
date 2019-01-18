import admin from "firebase-admin";

const serviceAccountKey = require("./serviceAccountKey.json");

import { ConfigArguments } from "./services/__types__/config.types";

export const config: ConfigArguments = {
  /// The interval for fetching latest data (in seconds) and historical data (in minutes)
  main: {
    intervalLatest: parseInt(process.env["FETCH_LATEST_SECONDS"] || "15"),
    intervalHistorical: parseInt(
      process.env["FETCH_HISTORICAL_MINUTES"] || "30"
    ),
    historicalPoints: parseInt(process.env["HISTORICAL_POINTS"] || "200"),
    blocksPerPoint: parseInt(process.env["BLOCKS_PER_POINT"] || "140")
  },

  /// eg: http://rpc_user:rpc_password@localhost:8757
  chain: {
    protocol: process.env["RPC_PROTOCOL"] || "http",
    user: process.env["RPC_USER"] || "rpc_user",
    pass: process.env["RPC_PASSWORD"] || "rpc_password",
    host: process.env["RPC_HOST"] || "localhost",
    port: parseInt(process.env["RPC_PORT"] || "8757")
  },

  /// the url and coinId for a Yiimp pool
  pool: {
    url: process.env["YIIMP_URL"] || "https://pool.pigeoncoin.org",
    coinId: process.env["YIIMP_COIN_ID"] || "PGN"
  },

  /// the CoinGecko coin id
  market: process.env["GECKO_COIN_ID"] || "pigeoncoin",

  /// Firebase credential and databaseUrl
  database: {
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL:
      process.env["RTDB_URL"] || "https://scratch-project-9f138.firebaseio.com"
  }
};

import admin from "firebase-admin";

import { config } from "./config";

import { ChainService } from "./services/chain";
import { MarketService } from "./services/market";
import { PoolService } from "./services/pool";
import { DatabaseService } from "./services/database";

import { MainArguments } from "./services/__types__/main.types";

/**
 * The entrypoint to the app. Handles dispatching actions to
 * the various services
 */
main(config.main);

async function main({
  intervalLatest,
  intervalHistorical,
  historicalPoints,
  blocksPerPoint
}: MainArguments) {
  admin.initializeApp(config.database);

  const db = new DatabaseService(admin.database());

  const chain = new ChainService(config.chain);
  const market = new MarketService(config.market);
  const pool = new PoolService(config.pool);

  console.log(`ready to collect some data 🚀`);

  updateLatest();
  setInterval(updateLatest, intervalLatest * 1000);

  updateHistorical();
  setInterval(updateHistorical, intervalHistorical * 60 * 1000);

  /**
   * Update the database with latest data
   */
  async function updateLatest() {
    db.updateLatestPool(await pool.getLatestData());
    db.updateLatestMarket(await market.getLatestData());
    db.updateLatestChain(await chain.getLatestData());
    console.log(`updated latest! ${Date.now().toString()}`);
  }

  /**
   * Update the database with historical data
   */
  async function updateHistorical() {
    const chainHistoricalData = await chain.getHistoricalData(
      historicalPoints,
      blocksPerPoint
    );

    /// build a list of timestamps so we can build a matching list of historical data
    const timestamps = chainHistoricalData.map(c => c.timestamp);

    const marketHistoricalData = await market.getHistoricalData(timestamps);

    db.updateHistoricalData(chainHistoricalData, marketHistoricalData);
    console.log(`updated historical! ${Date.now().toString()}`);
  }
}

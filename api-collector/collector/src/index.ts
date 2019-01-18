import admin from "firebase-admin";

import { config } from "./config";

import { ChainService } from "./services/chain";
import { MarketService } from "./services/market";
import { PoolService } from "./services/pool";
import { DatabaseService } from "./services/database";

main();
async function main() {
  admin.initializeApp(config.database);

  const db = new DatabaseService(admin.database());

  const chain = new ChainService(config.chain);
  const market = new MarketService(config.market);
  const pool = new PoolService(config.pool);

  console.log(`ready to collect some data 🚀`);

  updateLatest();
  setInterval(updateLatest, 15 * 1000);

  updateHistorical();
  setInterval(updateHistorical, 30 * 60 * 1000);

  /**
   * Update the database with latest data
   */
  async function updateLatest() {
    db.updateLatestPool(await pool.getLatestData());
    db.updateLatestMarket(await market.getLatestData());
    db.updateLatestChain(await chain.getLatestData());
  }

  /**
   * Update the database with historical data
   */
  async function updateHistorical() {
    const chainHistoricalData = await chain.getHistoricalData();

    const timestamps = chainHistoricalData.map(c => c.timestamp);
    const marketHistoricalData = await market.getHistoricalData(timestamps);

    db.updateHistoricalData(chainHistoricalData, marketHistoricalData);
  }
}

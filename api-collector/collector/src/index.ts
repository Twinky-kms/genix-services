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

  setInterval(async () => {
    db.updateLatestPool(await pool.getLatestData());
    db.updateLatestMarket(await market.getLatestData());
    db.updateLatestChain(await chain.getLatestData());
  }, 15 * 1000);
}

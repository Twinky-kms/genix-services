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

  db.updateLatestPool(await pool.getLatestData());
  console.log("updated pool!");
}

import { config } from "./config";

import { ChainService } from "./services/chain";
import { MarketService } from "./services/market";
import { PoolService } from "./services/pool";

main();
async function main() {
  const chain = new ChainService(config.chain);
  const market = new MarketService(config.market);
  const pool = new PoolService(config.pool);
}

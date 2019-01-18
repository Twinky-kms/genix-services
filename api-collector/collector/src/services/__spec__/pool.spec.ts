import { PoolService } from "../pool";

import { PoolData } from "../__types__/pool.types";

/// An active Yiimp pool is required for testing.
/// https://pool.pigeoncoin.org may be used.

const integrationConfig = {
  url: "https://pool.pigeoncoin.org",
  coinId: "PGN"
};

describe("Chain", () => {
  const pool = new PoolService(integrationConfig);
  const poolSlash = new PoolService({
    ...integrationConfig,
    url: "https://pool.pigeoncoin.org/"
  });

  var p: PoolData;

  /// prefetch so we don't spam the endpoint with tests
  beforeAll(async () => {
    p = await pool.getLatestData();
  });

  it("gets a response with the correct shape", async () => {
    expect(typeof p.dailyBlocks).toBe("number");
    expect(typeof p.hashrate).toBe("number");
    expect(typeof p.lastBlock).toBe("number");
    expect(typeof p.lastBlockTime).toBe("number");
    expect(typeof p.miners).toBe("number");
    expect(typeof p.timeToFind).toBe("number");
    expect(typeof p.timestamp).toBe("number");
  });

  it("has integer timestamps", async () => {
    const { lastBlockTime, timestamp } = p;

    expect(Math.floor(lastBlockTime)).toBe(lastBlockTime);
    expect(Math.floor(timestamp)).toBe(timestamp);
  });

  /// This test is fragile because yiimp pools often wont response to repeated
  /// requests, but we happen to know that trailing slashes work
  it.skip("gets a response with a trailing slash", async () => {
    const { miners } = await poolSlash.getLatestData();

    expect(miners).toBeTruthy();
  });
});

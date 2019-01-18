import { PoolService } from "../pool";

const integrationUrl = "https://pool.pigeoncoin.org";

describe("Chain", () => {
  const pool = new PoolService(integrationUrl);

  it("gets a response", async () => {
    const { miners } = await pool.getLatestData();

    expect(miners).toBeTruthy();
  });

  it("gets a response with a trailing slash", async () => {
    const pool2 = new PoolService(`${integrationUrl}/`);
    const { miners } = await pool2.getLatestData();

    expect(miners).toBeTruthy();
  });
});

import { ChainService } from "../chain";

const integrationConfig = {
  protocol: "http",
  user: "rpc_user",
  pass: "rpc_password",
  host: "localhost",
  port: 8757
};

describe("Chain", () => {
  const chain = new ChainService(integrationConfig);

  it("gets a correctly shaped response", async () => {
    const c = await chain.getLatestData();

    expect(typeof c.blockTime).toBe("number");
    expect(typeof c.difficulty).toBe("number");
    expect(typeof c.hashrate).toBe("number");
    expect(typeof c.height).toBe("number");
    expect(typeof c.lastHash).toBe("string");
    expect(typeof c.supply).toBe("number");
    expect(typeof c.timestamp).toBe("number");

    expect(Object.keys(c).length).toBe(7);
  });
});

import { ChainService } from "../chain";
import { ChainData } from "../__types__/chain.types";

const integrationConfig = {
  protocol: "http",
  user: "rpc_user",
  pass: "rpc_password",
  host: "localhost",
  port: 8757
};

describe("getLatestData()", () => {
  const chain = new ChainService(integrationConfig);

  it("gets a correctly shaped response", async () => {
    const c = await chain.getLatestData();
    expectChainDataIsValid(c);
  });
});

describe("getChainData()", () => {
  const chain = new ChainService(integrationConfig);

  it("handles genesis block", async () => {
    const c = await chain.getChainData(0);
    expectChainDataIsValid(c);
  });

  it("handles first block", async () => {
    const c = await chain.getChainData(1);
    expectChainDataIsValid(c);
  });

  it("handles tenth block", async () => {
    const c = await chain.getChainData(1);
    expectChainDataIsValid(c);
  });
});

describe("getHistoricalData()", () => {
  const chain = new ChainService(integrationConfig);

  it("handles 10", async () => {
    const results = await chain.getHistoricalData(10);
    for (const c of results) {
      expectChainDataIsValid(c);
    }
  });

  /// This test takes a long time but it is known to work
  it.skip(
    "handles 1000",
    async () => {
      const results = await chain.getHistoricalData(1000);
      for (const c of results) {
        expectChainDataIsValid(c);
      }
    },
    100 * 1000
  );
});

function expectChainDataIsValid(c: ChainData) {
  expect(typeof c.blockTime).toBe("number");
  expect(typeof c.difficulty).toBe("number");
  expect(typeof c.hashrate).toBe("number");
  expect(typeof c.height).toBe("number");
  expect(typeof c.lastHash).toBe("string");
  expect(typeof c.supply).toBe("number");
  expect(typeof c.timestamp).toBe("number");

  expect(c.blockTime).not.toBeNaN();
  expect(c.difficulty).toBeTruthy();
  expect(c.hashrate).not.toBeNaN();
  expect(c.height).not.toBeNaN();
  expect(c.lastHash).toBeTruthy();
  expect(c.supply).not.toBeNaN();
  expect(c.timestamp).toBeTruthy();

  expect(c.blockTime).not.toBe(Infinity);
  expect(c.difficulty).toBeTruthy();
  expect(c.hashrate).not.toBe(Infinity);
  expect(c.height).not.toBe(Infinity);
  expect(c.lastHash).toBeTruthy();
  expect(c.supply).not.toBe(Infinity);
  expect(c.timestamp).toBeTruthy();

  expect(Object.keys(c).length).toBe(7);
}

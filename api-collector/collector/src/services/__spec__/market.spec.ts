import { Market } from "../market";

const integrationId = "litecoin";

describe("Chain", () => {
  const market = new Market(integrationId);

  it("gets a response", async () => {
    const { priceBtc } = await market.getLatestData();

    expect(priceBtc).toBeTruthy();
  });
});

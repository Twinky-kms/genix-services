import { MarketService } from "../market";

const integrationId = "litecoin";

describe("getLatestData()", () => {
  const market = new MarketService(integrationId);

  it("gets a response", async () => {
    const { priceBtc } = await market.getLatestData();

    expect(priceBtc).toBeTruthy();
  });
});

describe("getHistoricalData()", () => {
  const market = new MarketService(integrationId);

  it("gets a getHistoryData() response", async () => {
    const timestamps = [1546960487, 1547824487]; // 10 days
    const epsilon = 0.05 * (10 * 24 * 60 * 60);

    const marketHistoryData = await market.getHistoricalData(timestamps);

    const firstDelta = marketHistoryData[0].timestamp - timestamps[0];
    const lastDelta =
      marketHistoryData[marketHistoryData.length - 1].timestamp -
      timestamps[timestamps.length - 1];

    expect(Math.abs(firstDelta)).toBeLessThan(epsilon);
    expect(Math.abs(lastDelta)).toBeLessThan(epsilon);
  });
});

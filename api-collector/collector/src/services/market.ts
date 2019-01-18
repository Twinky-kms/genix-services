import axios from "axios";
import datefns from "date-fns";

import {
  MarketCurrency,
  MarketData,
  MarketHistoryResponse,
  MarketResponse
} from "./__types__/market.types";

/**
 * Gets data from CoinGecko and prepares it for persist
 */
export class MarketService {
  private _url: string;

  constructor(geckoId: string) {
    this._url = `https://api.coingecko.com/api/v3/coins/${geckoId}/`;
  }

  /**
   * Get the latest market data
   */
  public async getLatestData() {
    const { data } = await axios.get<MarketResponse>(this._url);
    const market = data.market_data;

    const marketData: MarketData = {
      priceBtc: +market.current_price.btc,
      priceUsd: +market.current_price.usd,
      volumeBtc: +market.total_volume.btc,
      volumeUsd: +market.total_volume.usd,
      marketCapBtc: +market.market_cap.btc,
      marketCapUsd: +market.market_cap.usd,
      timestamp: Math.floor(Date.now() / 1000)
    };

    return marketData;
  }

  /**
   * Get historical data
   */
  public async getHistoricalData(timestamps: number[]) {
    const days = datefns.differenceInDays(
      timestamps[timestamps.length - 1] * 1000,
      timestamps[0] * 1000
    );

    const usdMarketHistory = await this._getMarketHistory(days, "usd");
    const btcMarketHistory = await this._getMarketHistory(days, "btc");

    const marketHistoryData: MarketData[] = usdMarketHistory.map((_, i) => ({
      priceBtc: +btcMarketHistory[i].price,
      priceUsd: +usdMarketHistory[i].price,
      volumeBtc: +btcMarketHistory[i].total_volume,
      volumeUsd: +usdMarketHistory[i].total_volume,
      marketCapBtc: +btcMarketHistory[i].market_cap,
      marketCapUsd: +usdMarketHistory[i].market_cap,
      timestamp: Math.floor(btcMarketHistory[i].timestamp / 1000)
    }));

    const marketTimestamps = marketHistoryData.map(m => m.timestamp);

    const result: MarketData[] = [];

    timestamps.forEach(t => {
      const index = datefns.closestIndexTo(t, marketTimestamps);
      result.push(marketHistoryData[index]);
    });

    return marketHistoryData;
  }

  /**
   * Get market history data from CoinGecko and package it in a way
   * that is easy to consume
   */
  private async _getMarketHistory(days: number, currency: MarketCurrency) {
    const { data } = await axios.get<MarketHistoryResponse>(
      `${this._url}market_chart?days=${days}&vs_currency=${currency}`
    );

    const mappedData = data.market_caps.map(([timestamp], i) => ({
      timestamp,
      market_cap: data.market_caps[i][1],
      price: data.prices[i][1],
      total_volume: data.total_volumes[i][1]
    }));

    return mappedData;
  }
}

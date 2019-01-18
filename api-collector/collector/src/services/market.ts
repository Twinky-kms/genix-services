import axios from "axios";

import { MarketData, MarketResponse } from "./__types__/market.types";

export class MarketService {
  private _url: string;

  constructor(geckoId: string) {
    this._url = `https://api.coingecko.com/api/v3/coins/${geckoId}/`;
  }

  async getLatestData() {
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
}

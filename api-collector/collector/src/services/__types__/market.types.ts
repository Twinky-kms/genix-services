export type MarketData = {
  priceBtc: number;
  priceUsd: number;
  volumeBtc: number;
  volumeUsd: number;
  marketCapBtc: number;
  marketCapUsd: number;
  timestamp: number;
};

export type MarketResponse = {
  market_data: {
    current_price: Record<Currency, number>;
    total_volume: Record<Currency, number>;
    market_cap: Record<Currency, number>;
  };
};

type Currency = "btc" | "usd";

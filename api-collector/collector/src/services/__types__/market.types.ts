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
    current_price: Record<MarketCurrency, number>;
    total_volume: Record<MarketCurrency, number>;
    market_cap: Record<MarketCurrency, number>;
  };
};

export type MarketCurrency = "btc" | "usd";

/// The first number is timestamp in secondsSinceEpoch
/// The second number is the value in the currency requested
export type MarketHistoryResponse = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

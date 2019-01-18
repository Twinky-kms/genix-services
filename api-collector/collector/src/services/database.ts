import admin from "firebase-admin";

import { ChainData } from "./__types__/chain.types";
import { MarketData } from "./__types__/market.types";
import { PoolData } from "./__types__/pool.types";

/**
 *  Persists data to Firebase Realtime Database
 */
export class DatabaseService {
  constructor(private _db: admin.database.Database) {}

  private _chainRef = this._db.ref(`/latestData/chain`);
  private _marketRef = this._db.ref(`/latestData/market`);
  private _poolRef = this._db.ref(`/latestData/pool`);

  private _historicalRef = this._db.ref(`/historicalData`);

  public async updateLatestChain(chainData: ChainData) {
    this._chainRef.update(chainData);
  }

  public async updateLatestMarket(marketData: MarketData) {
    this._marketRef.update(marketData);
  }

  public async updateLatestPool(poolData: PoolData) {
    this._poolRef.update(poolData);
  }

  public async updateHistoricalData(
    chainHistoryData: ChainData[],
    marketHistoryData: MarketData[]
  ) {
    const updateObject: Record<
      string,
      { chain: ChainData; market: MarketData }
    > = {};

    /// Make sure we don't upload undefined data due to one list being shorter than the other
    const length = Math.min(chainHistoryData.length, marketHistoryData.length);

    /// Slice and build updateObject
    chainHistoryData.slice(0, length).forEach((chain, i) => {
      const key = chain.height;
      const market = marketHistoryData[i];
      updateObject[key] = { chain, market };
    });

    this._historicalRef.set(updateObject);
  }
}

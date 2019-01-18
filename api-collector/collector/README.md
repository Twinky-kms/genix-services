# Setup

Put your Firebase private key in `/src/serviceAccountKey.json`
Run in Docker, or `npm install && npm start`

## Containerized

This is a stateless Docker service that relies on a Pigeoncoin core wallet,
a Yiimp pool, CoinGecko, and a Firebase project for persistance.

## Environment Variable Defaults

```
FETCH_LATEST_SECONDS=15
FETCH_HISTORICAL_MINUTES=30
HISTORICAL_POINTS=200
BLOCKS_PER_POINT=140

RPC_PROTOCOL=http
RPC_USER=rpc_user
RPC_PASSWORD=rpc_password
RPC_HOST=localhost
RPC_PORT=8757

YIIMP_URL=https://pool.pigeoncoin.org
YIIMP_COIN_ID=PGN

GECKO_COIN_ID=pigeoncoin

RTDB_URL=https://scratch-project-9f138.firebaseio.com
```

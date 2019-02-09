Core Node
=========

This is a setup for reproducing all the core services for Pigeoncoin except for the website. The website consumes these services.

Setup is identical to `community-node` with the additional steps of 

adding `serviceAccountKey.json` from `pigeoncoin-api` firebase project to `api-collector/collector/src/`

adding discord, bitly, and firebase keys to `bot/settings.json`
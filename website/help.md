---
layout: help
title: FAQ
permalink: /faq/
weight: 8

categories:
  - title: Basics
    subtitle: The kitchen sink
    topics:

    - title: Mission
      content: |
        We are using Pigeoncoin, a mineable cryptocurrency, to build a social network which will never have to collect user data to pay the bills.

    - title: Name
      content: |
        Pigeons have been used throughout history to send messages. We're applying the pigeon's legacy to modern communications.

    - title: Get involved
      content: |
        We hang out on Discord, make announcements on Twitter, and can occasionally be found on Telegram. All official social media accounts can be found in our footer.

    - title: Wallet
      content: |
        We release wallets for macOS, Windows, and Linux. These can be found on our front page.

    - title: Mining
      content: |
        Our community has created GPU mining software for Nvidia and AMD GPUs, with software available for Linux and Windows. See our front page for links.

    - title: Exchanges
      content: |
        Our official exchange is [CryptoBridge](https://crypto-bridge.org/), with other exchanges listed on the front page. Disclaimer: We cannot be held responsible for the conduct of any exchange. Trading on any platform is at your own risk.


  - title: Technology
    subtitle: The nitty gritty
    topics:

    - title: Consensus
      content: |
         We use the proof-of-work Satoshi blockchain because, quite frankly, it is proven to work. With nine years of battle hardened security, we can rely on it as a source of truth.

    - title: Algorithm
      content: |
        We debuted X16S (shuffle) as an improved version of X16R (random). We improved hashrate and power consistency with no drawbacks. We are proud to have our algorithm listed under the MIT license. We believe that any coin forking away from specific hardware will benefit from using X16S as a wrapper for their existing algorithm. If you are a coin founder with questions about this, please reach out via Discord.

    - title: Difficulty
      content: |
        We debuted the LWMA (linear-weighted moving-average) difficulty algorithm at block 111,222. This algorithm uses the last 45 blocks to calculate the new target, setting a new difficulty each block. This has provided difficulty stability that is simply unmatched by any other method. We recommend the LWMA algorithm to coins of any size.

    - title: Supply
      content: |
        We issue 5000 PGN per block, with a blocktime of one minute, and a halving interval of approximately 4 years. Maximum supply is approximately 21B, of which only <span data-id="chain-supplyPercentage">2%</span> has been issued so far.

  - title: Exploits
    subtitle: Patched issues
    topics:

      - title: CVE-17144
        content: |
          On Sep 26th Pigeoncoin was exploited by a known BTC bug (CVE-2018-17144) that was made public the prior week, which allows one to be able to send duplicate unspent inputs when they mine their own block with such transactions. As a result, they were able to mine 3 blocks with these transactions in their block, which turned 5k PGN into 244M PGN. By the time the team and community was notified, it was too late to invalidate these transactions. Within 24 hrs the Dev team had patched and fixed the exploit, and as a community we decided not to rollback the blockchain to invalidate these transactions because of centralisation concerns from the community. The Pigeoncoin team and community take this as a learning opportunity to making changes in team/role structure to ensure we can minimize the chance of such an event from happening in the future. [commit](https://github.com/Pigeoncoin/pigeoncoin/commit/cc4885cc8e176e4e68a6ef966638b6728191c853)
        
      - title: Timestamp
        content: |
          ZAWY, the author of the LWMA difficulty adjustment algorithm, informed us of a security issue related to coins who were originally designed for a 10 minute blocktime who then switched to a lower block time and incorporated every-block retargeting. This security issue would allow a miner to submit incorrect block timestamps allowing them to mine for a period of time without the difficulty algorithm responding. This vulnerability has not been exploited on our chain to the best of our knowledge. [commit](https://github.com/Pigeoncoin/pigeoncoin/commit/90e2dcbe60aa413b4efba2ad4518bcd003a3dca0)
---

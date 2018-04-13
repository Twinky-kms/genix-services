const settings = require('./settings');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var message = msg.content.toLowerCase();


  //////////////////////
  // channels
  //////////////////////
  var newsChannel = "<#428888110634500097>";


  //////////////////////
  // general
  //////////////////////

  if (message.startsWith("!pool") ||
      message.startsWith("!when pool")){
    msg.reply(`
      https://pool.pigeoncoin.org/ *Supports development*
      https://blockcruncher.com/
      https://pign.suprnova.cc/
      https://pickaxe.pro/
      http://alttank.ca/`);
  }

  if (message.startsWith("!when website") ||
      message.startsWith("!website")){
    msg.reply('http://pigeoncoin.org');
  }

  if (message.startsWith("!when exchange") ||
      message.startsWith("!exchange")){
    msg.reply(`we have trading pairs with Ravencoin, Litecoin, and Bitcoin on CryptoBridge! https://crypto-bridge.org/`);
  }

  if (message.startsWith("!when roadmap") ||
      message.startsWith("!roadmap")){
    msg.reply(`roadmap is in progress! We will announce updates in ${newsChannel}`);
  }

  if (message.startsWith("!when whitepaper") ||
      message.startsWith("!whitepaper")){
    msg.reply(`the X16S (shuffle) mini-whitepaper is here http://pigeoncoin.org/assets/X16S-whitepaper.pdf`);
  }

  if (message.startsWith("!whattomine")){
    msg.reply(`Pigeoncoin, of course! https://pool.pigeoncoin.org/`);
  }

  if (message.startsWith("!mining") ||
      message.startsWith("!miner")){
    msg.reply(`http://pigeoncoin.org/mining`);
  }


  if (message.startsWith("!release") ||
      message.startsWith("!wallet")){
    msg.reply(`https://github.com/Pigeoncoin/pigeoncoin/releases`);
  }

  if (message.startsWith("!donate") ||
      message.startsWith("!when donate")){
    msg.reply('please donate!\n\nPigeoncoin: `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG` \nBitcoin: `1NaVP4cKiWY6MxSDkTCZ2kh5Xm3coA27Qv`');
  }

  if (message.startsWith("!when ios") ||
      message.startsWith("!when android")){
    msg.reply('keep an eye out for the roadmap! ' + newsChannel);
  }



  //////////////////////
  // features that wont happen
  //////////////////////

  if (message.startsWith("!when masternode") ||
      message.startsWith("!when airdrop") ||
      message.startsWith("!when faucet")){
    msg.reply('never.');
  }


  //////////////////////
  // help 
  //////////////////////

  if (message.startsWith("!help stuck transaction")){
    msg.reply('check this out https://bitzuma.com/posts/how-to-clear-a-stuck-bitcoin-transaction/');
  }


  //////////////////////
  // listings
  //////////////////////

  if (message.startsWith("!when cmc") ||
      message.startsWith("!when coinmarketcap") ||
      message.startsWith("!when coin market cap") ){
    msg.reply('when we have 15 BTC daily volume on all exchanges.');
  }

  if (message.startsWith("!when lcw") ||
      message.startsWith("!when livecoinwatch") ||
      message.startsWith("!when live coin watch") ){
    msg.reply('livecoinwatch listing is in progress!');
  }

  if (message.startsWith("!when wtm") ||
      message.startsWith("!when whattomine") ||
      message.startsWith("!when what to mine") ){
    msg.reply('we need to be listed on Abucoins, Bitfinex, Bittrex, Binance, Cryptopia, HitBTC, Poloniex or YoBit first!');
  } // see "!whattomine" in //general


  //////////////////////
  // exchanges
  //////////////////////

  if (message.startsWith("!when cb") ||
      message.startsWith("!when cryptobridge") ||
      message.startsWith("!when crypto bridge")){
    msg.reply('we have trading pairs with Ravencoin, Litecoin, and Bitcoin on CryptoBridge! https://crypto-bridge.org/');
  }

  if (message.startsWith("!when cobinhood") ||
      message.startsWith("!when cob")){
    msg.reply('cobinhood listing is in progress.');
  }

  if (message.startsWith("!when cryptopia")){
    msg.reply('when you donate all your Pigeon to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`');
  }

  if (message.startsWith("!when bittrex")){
    msg.reply('when you donate all your Pigeon to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`');
  }

  if (message.startsWith("!when binance")){
    msg.reply('when you donate all your Pigeon to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`');
  }

  if (message.startsWith("!when coinbase") ||
      message.startsWith("!when gdax")){
    msg.reply('when you donate all your Pigeon and your first born child to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`');
  }


  //////////////////////
  // fun
  //////////////////////

  if (message.startsWith("!when moon")){
    msg.reply('fly pigeon, fly! :rocket:');
  }

  if (message.startsWith("!when lambo")){
    msg.reply('when lambo?! When land!');
  }

  if (message.startsWith("!surfin")){
    msg.reply(':surfer:\nhttps://www.youtube.com/watch?time_continue=80&v=gBexh377HbQ');
  }




});

client.login(settings.key);

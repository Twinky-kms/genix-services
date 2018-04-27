const settings = require('./settings');

const Discord = require('discord.js');
const client = new Discord.Client();

const https = require('https');
var data = {};



main();

setInterval( main , 1000*60*1)

function main(){
  promiseJSON('https://explorer.pigeoncoin.org:8000')
    .then(json => {
    data = json;

/*    data.price = json.price
    data.volume = 
    data.marketCap = 
    data.supply = 
    data.hashrate = 
    data.difficulty = 
    data.blockTime = 
    data.retarget = */
  })
}





  //////////////////////
  // https functions
  //////////////////////


function promiseJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";

      res.on("data", data => {
        // save stream as body
        body += data;
      });

      res.on("end", () => {
        // resolve with the JSON object from the body!
        resolve(JSON.parse(body));
      });
    });
  });
}






  //////////////////////
  // setup discord
  //////////////////////



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var message = msg.content.toLowerCase();


  //////////////////////
  // channels
  //////////////////////
  var newsChannel = "<#428888110634500097>";
  var faqChannel =  "<#427877188990402571>";



  //////////////////////
  // stats
  //////////////////////


  if (message.startsWith("!stats")){
    msg.reply(`!price, !volume, !marketcap, !supply, !hashrate, !difficulty, !blocktime, !retarget :chart_with_upwards_trend:`);
  }


  if (message.startsWith("!price")){
    msg.reply(`${data.price * 1e8} satoshi`);
  }

  if (message.startsWith("!volume")){
    msg.reply(`${data.volume.toPrecision(2)} BTC per day`);
  }

  if (message.startsWith("!marketcap")){
    msg.reply(`${data.marketCap.toPrecision(2)} BTC`);
  }

  if (message.startsWith("!supply")){
    msg.reply(`${Number((data.supply / 1e6).toPrecision(2))}M PGN`);
  }

  if (message.startsWith("!hash")){
    msg.reply(`${data.hashrate.toPrecision(2)} GH`);
  }

  if (message.startsWith("!diff")){
    msg.reply(`${Math.round(data.difficulty)}`);
  }

  if (message.startsWith("!blocktime")){
    msg.reply(`${data.blockTime.toPrecision(2)} minutes`);
  }

  if (message.startsWith("!retarget")){
    msg.reply(`${data.retarget} blocks, ${(data.retarget * data.blockTime / 60).toPrecision(2)} hours`);
  }



  //////////////////////
  // general
  //////////////////////

  if (message.startsWith("!pool") ||
      message.startsWith("!when pool")){
    msg.reply(`
      https://pool.pigeoncoin.org/ *Supports development*
      Other pools can be found in ${faqChannel}`);
  }

  if (message.startsWith("!when explorer") ||
      message.startsWith("!explorer")){
    msg.reply('https://explorer.pigeoncoin.org');
  }

  if (message.startsWith("!when website") ||
      message.startsWith("!website")){
    msg.reply('https://pigeoncoin.org');
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
    msg.reply(`the X16S (shuffle) mini-whitepaper is here https://pigeoncoin.org/assets/X16S-whitepaper.pdf`);
  }

  if (message.startsWith("!whattomine")){
    msg.reply(`Pigeoncoin, of course! https://pool.pigeoncoin.org/`);
  }

  if (message.startsWith("!mining") ||
      message.startsWith("!miner")){
    msg.reply(`https://pigeoncoin.org/mining`);
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
    msg.reply('when we have $100k USD daily volume on all exchanges.');
  }

  if (message.startsWith("!when coingecko") ||
      message.startsWith("!when cg") ||
      message.startsWith("!when coin gecko") ){
    msg.reply('we updated Explorer API to meet their needs and have submitted a request for listing!');
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

  if (message.startsWith("!handsom")){
    msg.reply('', {
      files:['./img/handsome-boy.jpg']
    });
  }




});

client.login(settings.key);

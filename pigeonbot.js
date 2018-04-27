const settings = require('./settings');

const Discord = require('discord.js');
const client = new Discord.Client();

const https = require('https');
var data = {};

var stringSimilarity = require('string-similarity');



main();

setInterval( main , 1000*60*1)

function main(){
  promiseJSON('https://explorer.pigeoncoin.org:8000')
    .then(json => {
    data = json;

    /*
    data.price
    data.volume
    data.marketCap
    data.supply
    data.hashrate
    data.difficulty
    data.blockTime
    data.retarget
    */
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
// stripPrefix function
//////////////////////

function cleanMessage(message){
  let deleteThis = ['!','when','help','who','what','where','how','why']
  let result = message

  for(item in deleteThis){
    result = result.replace(deleteThis[item],'');
  }

  // delete all leading and trailing spaces
  result = result.trim()

  return result;
}



function getReply(cleanedMessage){
  // match a cleaned up message

  const newsChannel = "<#428888110634500097>";
  const faqChannel =  "<#427877188990402571>";

  let dictionary = {

    'stats':        {response: `!price, !volume, !marketcap, !supply, !hashrate, !difficulty, !blocktime, !retarget :chart_with_upwards_trend:`},
    'blockchain':   {response: `${data.hashrate.toPrecision(2)} GH, ${Math.round(data.difficulty)} diff, ${data.blockTime.toFixed(1)} min/block, ${data.retarget} blocks and ${(data.retarget * data.blockTime / 60).toPrecision(2)} hours to retarget`},
    'market':       {response: `we're trading at ${data.price * 1e8} satoshi, with ${data.volume.toPrecision(2)} BTC daily volume, and a ${data.marketCap.toPrecision(2)} BTC market cap`},

    'price':        {response: `${data.price * 1e8} satoshi`},
    'volume':       {response: `${data.volume.toPrecision(2)} BTC per day`},
    'marketcap':    {response: `${data.marketCap.toPrecision(2)} BTC`},
    'supply':       {response: `${Number((data.supply / 1e6).toPrecision(2))}M PGN`},
    'hashrate':     {response: `${data.hashrate.toPrecision(2)} GH`},
    'difficulty':   {response: `${Math.round(data.difficulty)} for the next ${(data.retarget * data.blockTime / 60).toPrecision(2)} hours`},
    'blocktime':    {response: `${data.blockTime.toFixed(1)} minutes`},
    'retarget':     {response: `${data.retarget} blocks, ${(data.retarget * data.blockTime / 60).toPrecision(2)} hours`},


    'pool':         {response: `https://pool.pigeoncoin.org/ *Supports development*\nOther pools can be found in ${faqChannel}`},
    'explorer':     {response: `https://explorer.pigeoncoin.org`},
    'website':      {response: `https://pigeoncoin.org`},
    'exchange':     {response: `we have trading pairs with Ravencoin, Litecoin, and Bitcoin on CryptoBridge! https://crypto-bridge.org/`},
    'roadmap':      {response: `roadmap is in progress! We will announce updates in ${newsChannel}`},
    'whitepaper':   {response: `the X16S (shuffle) mini-whitepaper is here https://pigeoncoin.org/assets/X16S-whitepaper.pdf`},
    'whattomine':   {response: `Pigeoncoin, of course! https://pool.pigeoncoin.org/`},
    'miners':       {response: `https://pigeoncoin.org/mining`},
    'release':      {response: `https://github.com/Pigeoncoin/pigeoncoin/releases`},
    'donate':       {response: 'please donate!\n\nPigeoncoin: `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG` \nBitcoin: `1NaVP4cKiWY6MxSDkTCZ2kh5Xm3coA27Qv`'},

    'mobile':       {response: `keep an eye out for the roadmap!  ${newsChannel}`},

    'masternode':   {response: `never.`},

    'coinmarketcap':       {response: `when we have $100k USD daily volume on all exchanges.`},
    'coingecko':       {response: `we're there! https://www.coingecko.com/en/coins/pigeoncoin`},
    'livecoinwatch':       {response: `livecoinwatch listing is in progress!`},
    'whattomine':       {response: `we need to be listed on Abucoins, Bitfinex, Bittrex, Binance, Cryptopia, HitBTC, Poloniex or YoBit first!`},


    'cryptobridge': {response: `we have trading pairs with Ravencoin, Litecoin, and Bitcoin on CryptoBridge! https://crypto-bridge.org/`},
    'cobinhood': {response: `we are speaking with Cobinhood and are expecting a determination around Q3 2018.`},
    'cryptopia': {response: 'when you donate all your Pigeon to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`'},
    'bittrex': {response: 'when you donate all your Pigeon to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`'},
    'binance': {response: 'when you donate all your Pigeon to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`'},
    'coinbase': {response: 'when you donate all your Pigeon and your first born child to `PDiZ89gk5HMqwrcGp6Hs9WdgFALzLbD4HG`'},

    'moon': {response: `fly pigeon, fly! :rocket:`},
    'lambo': {response: `when lambo?! When land!`},
    'surfin': {response: `:surfer:\nhttps://www.youtube.com/watch?time_continue=80&v=gBexh377HbQ`},
    'handsome boy': {files: ['./img/handsome-boy.jpg']},
    'nasdaq': {response: 'why not?'},
    'good bot': {files: ['./img/good-bot.jpg']},

    'stuck transaction': {response: `check this out https://bitzuma.com/posts/how-to-clear-a-stuck-bitcoin-transaction/`}

  }

  const shorthand = [
    {key: 'diff', inherits: 'difficulty'},
    {key: 'diff change', inherits: 'retarget'},
    {key: 'difficulty change', inherits: 'retarget'},

    {key: 'wallet', inherits: 'release'},

    {key: 'ios', inherits: 'mobile'},
    {key: 'android', inherits: 'mobile'},
    {key: 'spv', inherits: 'mobile'},
    {key: 'mobile wallet', inherits: 'mobile'},
    {key: 'spv wallet', inherits: 'mobile'},

    {key: 'airdrop', inherits: 'masternode'},
    {key: 'faucet', inherits: 'masternode'},

    {key: 'cmc', inherits: 'coinmarketcap'},

    {key: 'cb', inherits: 'cryptobridge'},
    {key: 'gdax', inherits: 'coinbase'}
  ]


  for(item in shorthand){
    const newKey = shorthand[item].key
    const inherits = shorthand[item].inherits

    if(dictionary[inherits]){
        dictionary[newKey] = dictionary[inherits]
    }
  }


  const matches = stringSimilarity.findBestMatch(cleanedMessage, Object.keys(dictionary));

  if(matches.bestMatch.rating > 0.6){
    return Object.assign(dictionary[matches.bestMatch.target],{'rating':matches.bestMatch.rating})
  }
}


//msg.reply(`!price, !volume, !marketcap, !supply, !hashrate, !difficulty, !blocktime, !retarget :chart_with_upwards_trend:`);



  //////////////////////
  // setup discord
  //////////////////////



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if( message.content.trim().startsWith('!') ){
    let replyObject = getReply(cleanMessage(message.content))

    if(replyObject){

      message.reply(replyObject.response, {
        files: replyObject.files
      });
    }

  }
});




client.login(settings.key);

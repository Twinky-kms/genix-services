const settings = require('../settings.json')

const BitlyClient = require('bitly')
const bitly = BitlyClient(settings.bitlyKey)

const geturls = require('get-urls')

const message = "bitly https://pigeoncoin.org/mining"

async function shortenLinks(message){
  const urls = geturls(message)

  for(url of urls){
    let response = await requestBitlyLink(url)
    return response
  }
}

async function requestBitlyLink(longUrl){
  try {
    const result = await bitly.bitlyRequest('shorten', { longUrl, domain:'pgn.gg' });

    if(result.data.url && result.status_txt === 'OK'){
      return `<${longUrl}> → <${result.data.url}>`
    }else {
      return `error! code ${result.status_code}, status ${result.status_txt}`
    }
  } catch(e) {
    return 'error'
    throw e;
  }
}



//bitlyRequest('shorten', { longUrl, domain:'pgn.gg' });

module.exports = shortenLinks

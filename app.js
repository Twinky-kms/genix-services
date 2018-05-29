// get data from Firebase
const config = require('./config.json')
const firebase = require('firebase')

firebase.initializeApp(config)

const db = firebase.database()

// FIREBASE

//  latestData
const latestRef = db.ref('latestData')
var latestData = {};

latestRef.on('value', snap => {
  latestData = snap.val()
  console.log(`firebase sent us latestData!`)
  updateLegacyData()
})

//  historyData
const historyRef = db.ref('historyData')
var historyData = {};

historyRef.on('value', snap => {
  historyData = snap.val()
  console.log(`firebase sent us historyData!`)
  updateLegacyData()
})



// GATHER LEGACY FORMAT

let legacyData = {}

function updateLegacyData(){
  if(historyData){
    let legacyHistoryData = {
      "history": {
        "price": getArrayFromHistoryData('market-priceBtc'),
        "volume": getArrayFromHistoryData('market-volumeBtc'),
        "supply": getArrayFromHistoryData('chain-supply'),
        "hashrate": getArrayFromHistoryData('chain-hashrate'),
        "difficulty": getArrayFromHistoryData('chain-difficulty'),
        "height": getArrayFromHistoryData('chain-height'),
        "marketCap": getArrayFromHistoryData('market-marketCapBtc'),
        "blockTime": getArrayFromHistoryData('chain-blockTime'),
        "retarget": getArrayFromHistoryData('chain-retarget'),
      },
    }

    legacyData = Object.assign(legacyData, legacyHistoryData)
  }

  if(latestData){
    let legacyLatestData = {
      "_id": randomId(),
      "price": latestData.market.priceBtc,
      "volume": latestData.market.volumeBtc,
      "supply": latestData.chain.supply,
      "hashrate": latestData.chain.hashrate,
      "difficulty": latestData.chain.difficulty,
      "height": latestData.chain.height,
      "marketCap": latestData.market.marketCapBtc,
      "blockTime": latestData.chain.blockTime,
      "retarget": (2016 - latestData.chain.height % 2016),
      "created": new Date(latestData.chain.timestamp*1000).toISOString(),
    }
    // console.log(historyData)
    legacyData = Object.assign(legacyData, legacyLatestData)

    console.log(getArrayFromHistoryData("chain-supply"))
  }

}



//

function getArrayFromHistoryData(dataId){
  let [key, value] = dataId.split("-")
  let result = []

  for(item in historyData){
    if(dataId == 'chain-retarget'){
      let height = historyData[item]['chain']['height']
      result.push(2016 - height % 2016)
    }else{
      result.push(historyData[item][key][value])
    }
  }

  let length = result.length

  return result.slice(length - 14)
}



// EXPRESS

// serve it via http(s)
const express = require('express')
const app = express()
app.listen(3000, () => console.log('Example app listening on port 3000!'))


//  legacy format /v1/
app.get('/v1/', (req, res) => res.send(legacyData))

//  latestData /v2/latestData/
app.get('/v2/latestData/', (req, res) => res.send(latestData))

//  historyData /v2/historyData/
app.get('/v2/historyData/', (req, res) => res.send(historyData))








// UTILITIES

function randomId() {
  const length = 24
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = '';

  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}

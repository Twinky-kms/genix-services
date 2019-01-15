// get data from Firebase
const config = require('./config.json')
const firebase = require('firebase')

firebase.initializeApp(config.firebase)

const db = firebase.database()

// FIREBASE

//  latestData
const latestRef = db.ref('latestData')
var latestData = {};

latestRef.on('value', snap => {
  latestData = snap.val()
  console.log(`firebase sent us latestData!`)
})

//  historyData
const historyRef = db.ref('historyData')
var historyData = {};

historyRef.on('value', snap => {
  historyData = snap.val()
  console.log(`firebase sent us historyData!`)
})



// EXPRESS

// serve it via http(s)
const fs = require('fs')
const https = require('https');
const express = require('express')

const certRoot = config.certRoot
const app = express()

https.createServer({
    ca: fs.readFileSync(certRoot + 'chain.pem'),
    cert: fs.readFileSync(certRoot + 'cert.pem'),
    key: fs.readFileSync(certRoot + 'privkey.pem'),
}, app).listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))

//  latestData /v2/latestData/
app.get('/', (req, res) => res.json({ latestData, historyData }))

//  latestData /v2/latestData/
app.get('/latestData/', (req, res) => res.json({ latestData }))

//  historyData /v2/historyData/
app.get('/historyData/', (req, res) => res.json({ historyData }))

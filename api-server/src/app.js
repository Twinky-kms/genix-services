// get data from Firebase
const express = require("express");
const firebase = require("firebase");
const config = require("./config.json");

firebase.initializeApp(config.firebase);

const db = firebase.database();

// FIREBASE

//  latestData
const latestRef = db.ref("latestData");
var latestData = {};

latestRef.on("value", snap => {
  latestData = snap.val();
  console.log(`firebase sent us latestData!`);
});

//  historyData
const historyRef = db.ref("historyData");
var historyData = {};

historyRef.on("value", snap => {
  historyData = snap.val();
  console.log(`firebase sent us historyData!`);
});

// EXPRESS

const app = express();

//  latestData /v2/
app.get("/", (req, res) =>
  res.json({ latestData: "/latestData", historyData: "/historyData" })
);

//  latestData /v2/latestData/
app.get("/latestData/", (req, res) => res.json({ latestData }));

//  historyData /v2/historyData/
app.get("/historyData/", (req, res) => res.json({ historyData }));

app.listen(config.port, () =>
  console.log(`Example app listening on port ${config.port}!`)
);

// global state object
// set default state
var state = {
  graphState: "chain-hashrate"
};

// var statsGraph is defined in the body of chart.html

// firebase config
const config = {
  apiKey: "AIzaSyDSb7CJlXlzJjQPE9IRVRTZpCjeJwAgk54",
  authDomain: "pigeoncoin-api.firebaseapp.com",
  databaseURL: "https://pigeoncoin-api.firebaseio.com",
  projectId: "pigeoncoin-api",
  storageBucket: "pigeoncoin-api.appspot.com",
  messagingSenderId: "16957585674"
};

//////////////////////////////

onReady(() => {
  // on load
  console.log(`DOM is ready!`);

  // initialize firebase
  firebase.initializeApp(config);
  const db = firebase.database();

  // set up listeners
  latestDataListener(db);
  historyDataListener(db);

  // set up helpers
  statsWidgetHelper();
  hamburgerHelper();

  // set state to localStorage state
  if (localStorage.state) {
    setState(JSON.parse(localStorage.state));
  }
});

// listeners

function stateListener() {
  // new state!
  console.log(state);

  // update widgets
  updateAllWidgets();
  activateWidget();

  // update graph
  if (typeof statsGraph !== "undefined") updateGraph();

  // update progress bars
  updateMiningPool();
}

function latestDataListener(db) {
  // listen for latestData
  const ref = db.ref("latestData");

  ref.on("value", snap => {
    const latestData = snap.val();
    // setState
    setState({
      latestData
    });
  });
}

function historyDataListener(db) {
  // listen for historyData
  const ref = db.ref("historyData");

  ref
    .orderByKey()
    .limitToLast(90)
    .on("value", snap => {
      const historyData = snap.val();
      // setState
      setState({
        historyData
      });
    });
}

// updaters

function updateAllWidgets() {
  const { chain, market } = state.latestData;

  // at height 87,570 our retargeting period changes from 2016 to 360
  const retargetingPeriod =
    chain.height < 87570 ? 2016 : chain.height < 111222 ? 360 : 1;

  // update all widgets with proper data format
  updateWidget(
    "chain-hashrate",
    +(chain.hashrate / 1e9).toPrecision(2) + " GH"
  );
  updateWidget("chain-difficulty", +chain.difficulty.toPrecision(3));
  updateWidget("chain-blockTime", (chain.blockTime / 60).toFixed(1) + " min");

  updateWidget("chain-retarget", "LWMA");
  updateWidget("market-priceBtc", Math.round(market.priceBtc * 1e8) + " sats");
  updateWidget("market-volumeBtc", market.volumeBtc.toFixed(1) + " BTC");
  updateWidget("market-marketCapBtc", Math.round(market.marketCapBtc) + " BTC");
  updateWidget("chain-supply", +(chain.supply / 1e9).toPrecision(2) + "B PGN");
  updateSpan(
    "chain-supplyPercentage",
    +((chain.supply / (21 * 1e9)) * 100).toPrecision(2) + "%"
  );

  function updateSpan(dataId, newData) {
    // find a span by dataId, give it newData!
    const el = document.querySelector(`[data-id=${dataId}]`);
    if (el) {
      el.innerHTML = newData;
    }
  }

  function updateWidget(dataId, newData) {
    // find a widget by dataId, give it newData!
    const el = document.querySelector(`[data-id=${dataId}] .title`);
    if (el) {
      el.innerHTML = newData;
    }
  }
}

function activateWidget() {
  const dataId = state.graphState;

  hideAllWidgets();
  highlightWidget(dataId);

  function hideAllWidgets() {
    // select all widgets
    const els = document.querySelectorAll(`#graph-widgets .notification`);
    Array.from(els).forEach(el => {
      // remove class is-primary
      if (el) el.classList.remove("is-primary");
    });
  }

  function highlightWidget(dataId) {
    // find dataId, add class id-primary
    const el = document.querySelector(`#graph-widgets [data-id="${dataId}"]`);
    if (el) el.classList.add("is-primary");
  }
}

function updateMiningPool() {
  const { pool } = state.latestData;

  // update pool-miners
  updateProgressBar("pool-miners", pool.miners, 1000);
  updateTag("pool-miners-tag", Math.round(pool.miners));

  // update pool-payout
  const lastPayout = Date.now() / 1000 / 60 - 60;
  updateProgressBar("pool-payout", lastPayout % 180, 180);
  updateTag("pool-payout-tag", `in ${Math.round(180 - (lastPayout % 180))}m`);

  // update pool-lastBlock
  const minutesAgo = (Date.now() / 1000 - pool.lastBlockTime) / 60;
  updateProgressBar("pool-lastBlock", minutesAgo, (pool.timeToFind / 60) * 2);
  updateTag("pool-lastBlock-tag", `${Math.round(minutesAgo)}m ago`);

  function updateTag(dataId, value) {
    const el = document.querySelector(`[data-id="${dataId}"]`);
    if (el) el.innerHTML = value;
  }

  function updateProgressBar(dataId, value, max) {
    const el = document.querySelector(`[data-id="${dataId}"]`);
    if (el) {
      el.value = value;
      el.max = max;
    }
  }
}

function updateGraph() {
  const chart = statsGraph; // defined in the body of chart.html
  const { historyData, graphState } = state;
  const dataId = graphState;
  let k = 1; // we use this to scale our data

  // scale our data so it displays right
  if (dataId == "chain-hashrate") k = 1e-9;
  if (dataId == "chain-blockTime") k = 1 / 60;
  if (dataId == "chain-supply") k = 1e-6;
  if (dataId == "market-priceBtc") k = 1e8;

  const { data, labels } = parseHistoryData(historyData, dataId, k);

  pushUpdateToGraph(chart, data, labels);

  function parseHistoryData(historyData, dataId, k) {
    // get parentId and childId from dataId
    const [parentId, childId] = dataId.split("-");

    const data = [];
    const labels = [];

    for (dataPoint of Object.values(historyData)) {
      // special case for retarget
      if (dataId === "chain-retarget") {
        let height = dataPoint[parentId]["height"];

        // we changed from 2016 retarget period to 360
        // at a height of 87,570
        const retargetingPeriod =
          height < 87570 ? 2016 : height < 111222 ? 360 : 1;

        data.push(retargetingPeriod - (height % retargetingPeriod) || 1);
      } else {
        // push the data
        data.push(dataPoint[parentId][childId] * k);
      }
      // push the label
      labels.push(dataPoint[parentId]["timestamp"] * 1000);
    }

    console.log({ data, labels });
    return { data, labels };
  }

  function pushUpdateToGraph(chart, data, labels) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }
}

// helpers

function statsWidgetHelper() {
  // find all graph widgets
  var els = document.querySelectorAll("#graph-widgets .notification");

  // tell them all to wait for a click
  Array.from(els).forEach(el => {
    el.addEventListener("click", function() {
      let graphState = this.getAttribute("data-id");
      // then set graphState
      setState({
        graphState
      });
    });
  });
}

function hamburgerHelper() {
  // find the hamburger and tell them to toggleNav
  document.querySelector(".navbar-burger").addEventListener("click", toggleNav);

  function toggleNav() {
    // find the menu
    const nav = document.querySelector(".navbar-menu");

    // toggle is-active
    if (nav.className == "navbar-menu") {
      nav.className = "navbar-menu is-active";
    } else {
      nav.className = "navbar-menu";
    }
  }
}

// core utilities

function setState(object) {
  // set global state
  state = Object.assign(state, object);

  // persist global state
  localStorage.state = JSON.stringify(state);

  // trigger stateListener
  stateListener();
}

function onReady(callback) {
  // when the document is ready, callback
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    callback;
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

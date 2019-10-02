var request = require('request');
//"https://swiftex.co/api/v2/tickers/genix-btc
var swiftex = 'https://swiftex.co/api/v2/tickers/genix-btc';

function get_summary(coin, exchange, cb) {
  console.log("fetching price please fuckign show up");
  var req_url = swiftex;
  request({uri: req_url, json: true}, function (error, response, body) {
    if (error) {
      return cb(error, null);
    } else {
      if (body.message) {
        console.log(body.nessage)
        return cb(body.message, null)
      } else {
        body.result[0]['last'] = body.result[5].Last;
        return cb (null, body.result[5]);
      }
    }
  });
}

function get_trades(coin, exchange, cb) {
  return cb(null, []);

  // trades endpoint doesn't exist yet

  // var req_url = base_url + '/GetMarketHistory/' + coinexchange_id;
  // request({ uri: req_url, json: true }, function (error, response, body) {
  //     if (body.Success == true) {
  //         var tTrades = body.Data;
  //         var trades = [];
  //         for (var i = 0; i < tTrades.length; i++) {
  //             var Trade = {
  //                 orderpair: tTrades[i].Label,
  //                 ordertype: tTrades[i].Type,
  //                 amount: parseFloat(tTrades[i].Amount).toFixed(8),
  //                 price: parseFloat(tTrades[i].Price).toFixed(8),
  //                 //  total: parseFloat(tTrades[i].Total).toFixed(8)
  //                 // Necessary because API will return 0.00 for small volume transactions
  //                 total: (parseFloat(tTrades[i].Amount).toFixed(8) * parseFloat(tTrades[i].Price)).toFixed(8),
  //                 timestamp: tTrades[i].Timestamp
  //             }
  //             trades.push(Trade);
  //         }
  //         return cb(null, trades);
  //     } else {
  //         return cb(body.Message, null);
  //     }
  // });
}

function get_orders(coin, exchange, cb) {
  return cb(null, []);
  // var req_url = base_url + '/getorderbook?market_id=' + coinexchange_id;
  // request({ uri: req_url, json: true }, function (error, response, body) {
  //     if (body.success == "1") {
  //         var orders = body.result;
  //         var buys = [];
  //         var sells = [];
  //         if (orders['BuyOrders'].length > 0){
  //             for (var i = 0; i < orders['BuyOrders'].length; i++) {
  //                 var order = {
  //                     amount: parseFloat(orders.BuyOrders[i].Quantity).toFixed(8),
  //                     price: parseFloat(orders.BuyOrders[i].Price).toFixed(8),
  //                     //  total: parseFloat(orders.BuyOrders[i].Total).toFixed(8)
  //                     // Necessary because API will return 0.00 for small volume transactions
  //                     total: (parseFloat(orders.BuyOrders[i].Quantity).toFixed(8) * parseFloat(orders.BuyOrders[i].Price)).toFixed(8)
  //                 }
  //                 buys.push(order);
  //             }
  //             } else {}
  //             if (orders['SellOrders'].length > 0) {
  //             for (var x = 0; x < orders['SellOrders'].length; x++) {
  //                 var order = {
  //                     amount: parseFloat(orders.SellOrders[x].Quantity).toFixed(8),
  //                     price: parseFloat(orders.SellOrders[x].Price).toFixed(8),
  //                     //    total: parseFloat(orders.SellOrders[x].Total).toFixed(8)
  //                     // Necessary because API will return 0.00 for small volume transactions
  //                     total: (parseFloat(orders.SellOrders[x].Quantity).toFixed(8) * parseFloat(orders.SellOrders[x].Price)).toFixed(8)
  //                 }
  //                 sells.push(order);
  //             }
  //         } else {
  //         }
  //         return cb(null, buys, sells);
  //         } else {
  //         return cb(body.Message, [], [])
  //     }
  // });
}


module.exports = {
  get_data: function(coin, exchange, cb) {
    var error = null;
    get_orders(coin, exchange, function(err, buys, sells) {
      if (err) {
        error = err;
      }
      get_trades(coin, exchange, function(err, trades) {
        if (err) {
          error = err;
        }
        get_summary(coin, exchange, function(err, stats) {
          if (err) {
            error = err;
          }
          return cb(error, {
            buys: buys,
            sells: sells,
            chartdata: [],
            trades: trades,
            stats: stats
          });
        });
      });
    });
  }
};

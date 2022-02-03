/*              Web Sockets           */


/* REAL-TIME PRICE DATA */


// lets connect to the stream we need -- for real-time price updating we need to conect to the real websocket endpoint and not to the testnet
// Base API URLs
const baseSocketUrl = 'wss://stream.binance.com:9443/ws';


// the function to get the stream data nad render on the webapp
var getData = function(asset, element) {

  // open the websocket and get the stream
  const asset_price = new WebSocket(`${baseSocketUrl}${asset}`)

  // placeholder for the last rpice data
  let lastPrice = null;

  // code to handle the returned stream
  asset_price.onmessage = (event) => {
    let assetObject = JSON.parse(event.data)
    var price = parseFloat(assetObject.p).toFixed(2);

    // console.log(assetObject);
    element.innerText = price;

    // now some styling for the price ticker
    element.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';

    lastPrice = price;
  };

}

// variables to render the price data for each crypto as needed
var btcPrice = '/btcusdt@aggTrade';
var ethPrice = '/ethusdt@aggTrade';

// and now we will add the returned data to the page
let bitcoinPriceElement = document.getElementById('price_stream_bitcoin')
let etherPriceElement = document.getElementById('price_stream_ether')

// use the function to render the data onscreen
var btc = getData(btcPrice, bitcoinPriceElement);
var ether = getData(ethPrice, etherPriceElement);







/*    *********  CANDLESTICK DATA    *************     */

/* Data Stream Object

{
  "e": "kline",
  "E": 1626722545166,
  "s": "ETHUSDT",
  "k": {
    "t": 1626722400000,
    "T": 1626722699999,
    "s": "ETHUSDT",
    "i": "5m",
    "f": 522705156,
    "L": 522706231,
    "o": "1808.99000000",
    "c": "1813.46000000",
    "h": "1814.99000000",
    "l": "1808.00000000",
    "v": "939.37579000",
    "n": 1076,
    "x": false,
    "q": "1701253.12725550",
    "V": "470.62051000",
    "Q": "852409.97062880",
    "B": "0"
  }
}

*/

// candlestick stream -- this gts us the live stream with the current price data
var candlestickStream = '/ethusdt@kline_5m';

// websocket for the andlestick stream
const fiverEth = new WebSocket(`${baseSocketUrl}${candlestickStream}`);

fiverEth.onmessage = (event) => {
  let fiverStream = JSON.parse(event.data);
  let fiverStreamKline = fiverStream.k;

  console.log(fiverStreamKline)

  return fiverStreamKline;
}



/**********    Save Candlestick Data to a CSV file     **********************/


// 1. might be easier to get historical data rather than try to grab the stream and saving that.

// 2. So, the next step should be to find a way to download this historical candlestick data from binance into a csv file

// seems to me that doing it with python might be easier. But in that case I might have to spin up a jupyter nb, a sm one just to get the csv file created.

// or I can try to get it with the ccxt lib

// another option is to get the data from another source, such a yahoo finance or coingecko.

// The important point to remember for this step is that the goal is to use this data for backtesting a strategy. So for now, it might be more important to


// the webscket object and then the initialization

// var binanceSocket = new WebSocket('wss://testnet.binance.vision/ws/btcusdt@kline_5m');


// 1. log results -- here we get a websocket object
// console.log(binanceSocket);

// 2. Next lets view the streaming data on the webpage
var tradeDiv = document.getElementById('trades');

// but first, to get the data, we need another method

// binanceSocket.onmessage = function(event) {
// 	console.log(event.data);

// 	// now to print the websocket data to the page
// 	var streamDataObject = JSON.parse(event.data);
// 	tradeDiv.append(streamDataObject.k['h']);
// }

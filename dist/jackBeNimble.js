/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keyboardHandlers = __webpack_require__(1);

	var interfaces = __webpack_require__(3);

	var domInterface = null;

	/** ****************************************
	 *      SET PLUGIN LOCATION STRATEGY
	 ********************************************/
	/**
	 * find and set the current web location
	 *
	 * determines the interface module we use for interfacing
	 * with the webpage DOM.
	 */

	// iterate through our interfaces list
	for (var DInterface in interfaces) {
	  if (interfaces.hasOwnProperty(DInterface)) {
	    // if the current window locations contains the string of the interface objects name property
	    if (window.location.hostname.indexOf(interfaces[DInterface].name) !== -1) {
	      domInterface = interfaces[DInterface];
	      console.log('Set interface to: ', domInterface);
	    }
	  }
	}

	// make sure we got an interface
	if (!domInterface) {
	  throw new Error('Unable to set domInterface');
	}

	// load up the plugins methods
	var utils = __webpack_require__(7)(domInterface);

	// create a keyboard handler
	// TODO:
	// change to keyboard commander
	var kbc = keyboardHandlers(utils);

	/**
	* Initialize the interface
	* - sets default lotsize
	* - add the default offset value to the display
	*/
	domInterface.init();

	/** ****************************************
	 * - setup keyboard event listeners
	 ****************************************/
	window.addEventListener('keydown', kbc.onKeydown, false);
	window.addEventListener('keypress', kbc.onKeypress, false);
	window.addEventListener('keyup', kbc.onKeyup, false);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(2);

	module.exports = function (actionsObject) {

	  var public_api = {
	    onKeydown: onKeydown,
	    onKeypress: onKeypress,
	    onKeyup: onKeyup
	  };

	  return public_api;

	  /* **************************************
	   *            KEYBOARD HANDLERS
	   * @TODO convert to an engine that can handle more than one key
	   ****************************************/
	  function onKeydown(e) {
	    store.get(function (settings) {
	      console.log(settings);
	      switch (e.keyCode) {
	        /**************************************
	         *            TOGGLE KEYS
	         *************************************/

	        // LOTSIZE UP
	        case settings.KEYS.TOGGLE_LOTSIZE_UP:
	          actionsObject.toggleLotSize('up');
	          break;

	        // LOTSIZE DOWN
	        case settings.KEYS.TOGGLE_LOTSIZE_DOWN:
	          actionsObject.toggleLotSize('down');
	          break;

	        // OFFSET UP
	        case settings.KEYS.TOGGLE_OFFSET_UP:
	          actionsObject.toggleOffset('up');
	          break;

	        // OFFSET DOWN
	        case settings.KEYS.TOGGLE_OFFSET_DOWN:
	          actionsObject.toggleOffset('down');
	          break;

	        /********************************
	         *          BUY ORDER KEYS
	         ********************************/
	        // place best limit bid order on the market
	        case settings.KEYS.BID_BETTER:
	          actionsObject.bidBetter();
	          break;

	        // place bid at current best bid
	        case settings.KEYS.BID_WITH_BEST_BID:
	          actionsObject.bidWithBest();
	          break;

	        // Place bid at (INCR) below the current best bid
	        case settings.KEYS.BID_BELOW_BEST:
	          actionsObject.bidBelowBest();
	          break;

	        // Place bid at (INCR) below the current best bid
	        case settings.KEYS.BID_DOUBLE_BELOW_BEST:
	          actionsObject.bidDoubleBelowBest();
	          break;

	        // place limit order at the current ask price
	        case settings.KEYS.HIT_THE_OFFER:
	          actionsObject.hitTheOffer();
	          break;

	        // place market buy
	        case settings.KEYS.MARKET_BUY:
	          actionsObject.marketBuy();
	          break;

	        /********************************
	         *           SELL ORDER KEYS
	         ********************************/
	        // place the best limit sell on the market
	        case settings.KEYS.OFFER_BETTER:
	          actionsObject.offerBetter();
	          break;

	        // place offer at current best ask
	        case settings.KEYS.OFFER_WITH_BEST_ASK:
	          actionsObject.offerWithBest();
	          break;

	        // place offer at current best ask
	        case settings.KEYS.OFFER_ABOVE_BEST:
	          actionsObject.offerAboveBest();
	          break;

	        // place offer at current best ask
	        case settings.KEYS.OFFER_DOUBLE_ABOVE_BEST:
	          actionsObject.offerDoubleAboveBest();
	          break;

	        // place limit order at the current bid price
	        case settings.KEYS.HIT_THE_BID:
	          actionsObject.hitTheBid();
	          break;

	        // place market sell
	        case settings.KEYS.MARKET_SELL:
	          actionsObject.marketSell();
	          break;

	        /********************************
	         *      CANCEL ORDER KEYS
	         ********************************/
	        // cancel all bids
	        case settings.KEYS.CANCEL_BIDS:
	          actionsObject.cancelBids();
	          break;

	        // cancel all order
	        case settings.KEYS.CANCEL_OFFERS:
	          actionsObject.cancelOffers();
	          break;

	        // cancel last order
	        case settings.KEYS.CANCEL_LAST:
	          actionsObject.cancelLast();
	          break;

	        // cancel all order
	        case settings.KEYS.CANCEL_ALL:
	          actionsObject.cancelAll();
	          break;

	        default:
	          console.log('Key: ', e.keyCode);
	          break;
	      }
	    });
	  }

	  function onKeypress(e) {
	    //console.log('Keyup', e);
	  }

	  function onKeyup(e) {}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* globals chrome */

	/**
	 * Set a config value
	 * @param {string} key - a name representing the object
	 * @param {any?} value - An object with the key/value pair to set
	 * @param {cb} optional callback
	 * -- the callback returns an object with a message and the created data object
	 * @TODO error checking
	 */
	function set(key, value) {
	  console.log('Setting: ', key, ' to ', value);

	  var obj = {};
	  obj[key] = value;

	  if (chrome) {
	    // check for existing value
	    chrome.storage.sync.set(obj);
	  }
	  chrome.storage.sync.get(function (all) {
	    console.log(all);
	  });
	}

	function get(keyValue, cb) {
	  if (typeof keyValue === 'string') {
	    chrome.storage.sync.get(keyValue, cb);
	  } else if (typeof keyValue === 'function') {
	    chrome.storage.sync.get(null, keyValue);
	  } else {
	    console.error('Invalid keyValue type: ', typeof keyValue === 'undefined' ? 'undefined' : _typeof(keyValue));
	  }
	}

	module.exports = {
	  set: set,
	  get: get
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var interfaces = [];

	// add the interfaces to our array
	// TODO: as more dynamic method for this
	// so that as we add interfaces, we dont have
	// to add lines for each one here
	// the obvious solution of using requireDirectory is not
	// as easy at it might seem here (because of webpack)
	interfaces.push(__webpack_require__(4)());
	interfaces.push(__webpack_require__(6)());

	// export the array of interfaces
	module.exports = interfaces;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(5);
	var store = __webpack_require__(2);

	module.exports = function () {
	  var public_api = {

	    name: 'bitfinex',

	    init: init,

	    getLotSizeInputElement: getLotSizeInputElement,
	    displayLotsize: displayLotsize,

	    marketBuy: marketBuy,
	    marketSell: marketSell,

	    cancelBids: cancelBids,
	    cancelOffers: cancelOffers,
	    cancelAll: cancelAll,
	    cancelLast: cancelLast,

	    displayOffset: displayOffset,

	    placeBuyOrder: placeBuyOrder,
	    placeSellOrder: placeSellOrder,

	    setBuyPrice: setBuyPrice,

	    getBestBid: getBestBid,
	    getBestOffer: getBestOffer

	  };

	  return public_api;
	};
	/**
	 *              INIT
	 *
	 *  get existing settings and apply them
	 */
	function init() {
	  store.get(function (settings) {
	    displayLotsize(settings.lotsize);
	    displayOffset(settings.offset);
	  });
	}

	/*  MARKET BUY  */
	function marketBuy() {
	  getBuyOrderTypeElement().value = 'MARKET';
	  config.placeBuyOrder();
	  getBuyOrderTypeElement().value = 'LIMIT';
	}

	/*  MARKET SELL */
	function marketSell() {
	  getSellOrderTypeElement().value = 'MARKET';
	  placeSellOrder();
	  getSellOrderTypeElement().value = 'LIMIT';
	}

	/* CANCEL BIDS */
	function cancelBids() {
	  var orders = getOrders();
	  orders.forEach(function (order) {
	    if (order.side === 'buy') {
	      setTimeout(function () {
	        order.cancelButton.click();
	      }, 100);
	    }
	  });
	}

	/* CANCEL OFFERS */
	function cancelOffers() {
	  var orders = getOrders();
	  orders.forEach(function (order) {
	    if (order.side === 'sell') {
	      setTimeout(function () {
	        order.cancelButton.click();
	      }, 100);
	    }
	  });
	}

	/*  CANCEL LAST ORDER */
	function cancelLast() {
	  var orders = getOrders();
	  orders[orders.length - 1].cancelButton.click();
	}

	/*  CANCEL ALL ORDERS */
	// this uses xhr because the sites 'cancel all button' causes
	// a popup which is not desirable here
	function cancelAll() {
	  /* global XMLHttpRequest */
	  // TODO: change this to fetch
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', encodeURI('/orders/cancel_all'));
	  xhr.send();
	}

	/**
	 *     DISPLAY THE OFFSET VALUE ON THE PAGE
	 *
	 * @param {Number} v - the offset value to display
	 */
	function displayOffset(v) {
	  var homeDiv = getOffsetParentElement();
	  var target = getOffsetElement();
	  if (!target) {
	    var span = document.createElement('span');
	    span.id = 'BFX_OFFSET_VALUE';
	    span.innerHTML = 'Offset: ' + v;
	    homeDiv.appendChild(span);
	  } else {
	    target.innerHTML = 'Offset: ' + v;
	  }
	}

	function displayLotsize(v) {
	  getLotSizeInputElement().value = v;
	}

	/**    PLACE A BUY ORDER   */
	function placeBuyOrder(p) {
	  setBuyPrice(p);
	  if (!config.DEBUG) {
	    getBuyButtonElement().click();
	  } else {
	    console.log('Simulating buy @ ', p);
	  }
	}

	/**    PLACE A SELL ORDER   */
	function placeSellOrder(p) {
	  setSellPrice(p);
	  if (!config.DEBUG) {
	    getSellButtonElement().click();
	  } else {
	    console.log('Simulating sell @ ', p);
	  }
	}

	/**
	 *        SET THE BUY PRICE
	 * @param {Number} p - the price to set
	 */
	function setBuyPrice(p) {
	  getBuyPriceElement().value = p;
	}

	/**
	 *        SET THE SELL PRICE
	 * @param {Number} p - the price to set
	 */
	function setSellPrice(p) {
	  getSellPriceElement().value = p;
	}

	/**
	 * GET BEST BID
	 * @returns {String} - the current best bid
	 */
	function getBestBid() {
	  var bestBid = getBestBidElement();
	  return bestBid.innerHTML;
	}

	/**
	 * GET BEST Offer
	 * @returns {String} - the current best offer
	 */
	function getBestOffer() {
	  var bestAsk = getBestOfferElement();
	  return bestAsk.innerHTML;
	}

	/** *******************************/
	/*        Private functions       */
	/** *******************************/

	/**
	*  Gets all orders currently on the page
	*  @returns {Array} - an array of the html tr elements containing the order data.
	*  @TODO strip only the critical order data from the orders.
	*/
	function getOrders() {
	  var orderEls = getOrderElements();
	  return filterOrders(orderEls);
	}

	/**
	* Filter an array of order elements down to the most important data only
	* @param {nodeList} - nodeList - the HTML nodelist of orders
	* @returns {Array} - an array of order objects
	*
	    0: "505434297"         // id
	    1: "BTCUSD"            // pair
	    2: "Limit"             // type
	    3: "-1.00000000"       // size
	    4: "324.50"            // price
	    5: "Active"            // status
	    6: "22-11-15"          // date
	    7: "11:19:28"          // time

	*/
	function filterOrders(nodeList) {
	  var orders = [];

	  for (var i = 0; i < nodeList.length; i++) {
	    // 0th element of this list is text - so we dont use it
	    if (i !== 0) {
	      // the string is full of whitespace - so strip it
	      var thisOrderElement = nodeList[i];
	      var orderData = thisOrderElement.textContent.split(' ');
	      var cancelButton = thisOrderElement.childNodes[18].childNodes[0];

	      // create a new array with the order data we want
	      var newOrderData = [];
	      for (var idx = 0; idx < orderData.length; idx++) {
	        if (orderData[idx] !== '') {
	          newOrderData.push(orderData[idx]);
	        }
	      }

	      newOrderData.push(cancelButton);

	      // Use that order data array to create an order object and push
	      // it onto our array of orders.
	      orders.push(new Order(newOrderData));
	    }
	  }
	  return orders;
	}

	/**
	* take an array of order data, and create an order object with it
	* @param {Array} orderDataArray
	*      - an array of strings, containing order data
	*      - and an HTMLElement
	*
	*    [id, pair, orderType, size, price, status, date, time, cancelButton]
	*
	* @returns {Object} - an object with all of the order data in it
	*
	*/
	function Order(orderData) {
	  this.id = orderData[0];
	  this.pair = orderData[1];
	  this.orderType = orderData[2];
	  this.side = isSellOrder(orderData[3]) ? 'sell' : 'buy';
	  this.size = orderData[3];
	  this.price = orderData[4];
	  this.status = orderData[5];
	  this.date = orderData[6];
	  this.time = orderData[7];
	  this.cancelButton = orderData[8];
	}

	function isSellOrder(order) {
	  return order < 0;
	}

	/** ******************************************************
	 *     ELEMENT ACCESSORS
	 *     these functions are used to get html elements
	 *     any changes to a sites css/html can be addressed here
	 **********************************************************/

	function getOffsetParentElement() {
	  return document.querySelector('#orders > div > ul > li > div.collapsible-header') || document.querySelector('#positions > div > ul > li > div.collapsible-header');
	}

	function getOffsetElement() {
	  return document.getElementById('BFX_OFFSET_VALUE');
	}

	function getBuyButtonElement() {
	  return document.getElementById('buy-button');
	}

	function getSellButtonElement() {
	  return document.getElementById('sell-button');
	}

	function getBestBidElement() {
	  return document.querySelector('#bids > div > table > tbody > tr:nth-child(1) > td > div > div.col.price.col-currency');
	}

	function getBestOfferElement() {
	  return document.querySelector('#asks > div > table > tbody > tr:nth-child(1) > td > div > div.col.col-currency.price');
	}

	function getOrderElements() {
	  return document.getElementById('orderstable').children[1].childNodes;
	}

	function getSellPriceElement() {
	  return document.getElementById('sell_price');
	}

	function getBuyPriceElement() {
	  return document.getElementById('buy_price');
	}

	function getLotSizeInputElement() {
	  return document.getElementById('amount');
	}

	function getBuyOrderTypeElement() {
	  return document.getElementById('buy_type');
	}

	function getSellOrderTypeElement() {
	  return document.getElementById('sell_type');
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(2);

	// set to true to turn off live orders
	// and get a console.log message instead of an order
	module.exports = {
	  DEBUG: false
	};

	// SETUP SOME SANE DEFAULTS

	// LOT SIZE VALUES
	var LOTSIZES = [0.01, 0.05, 0.1, 0.2, 0.25, 0.5, 0.75, 1, 2, 2.5, 5, 10];

	// OFFSET VALUES
	var OFFSETS = [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.6, 0.75, 1, 1.5, 2, 2.5, 3, 5, 10];

	// Set default OFFSET
	var DEFAULT_OFFSET = 0.1;

	// Set default lotsize
	var DEFAULT_LOTSIZE = 0.1;

	var DEFAULT_KEYS = {
	  CANCEL_ALL: 89, // y
	  CANCEL_LAST: 84, // t
	  CANCEL_BIDS: 82, // r
	  CANCEL_OFFERS: 85, // u

	  TOGGLE_LOTSIZE_UP: 220,
	  TOGGLE_LOTSIZE_DOWN: 222,
	  TOGGLE_OFFSET_UP: 189,
	  TOGGLE_OFFSET_DOWN: 187,

	  BID_BETTER: 70, // f
	  BID_WITH_BEST_BID: 68, // d
	  BID_BELOW_BEST: 83, // s
	  BID_DOUBLE_BELOW_BEST: 65, // a

	  OFFER_BETTER: 74, // j
	  OFFER_WITH_BEST_ASK: 75, // k
	  OFFER_ABOVE_BEST: 76, // l
	  OFFER_DOUBLE_ABOVE_BEST: 186,

	  HIT_THE_BID: 72, // h
	  HIT_THE_OFFER: 71, // g

	  MARKET_BUY: 444, // ctrl + g
	  MARKET_SELL: 555 // ctrl + h
	};
	var startingProps = [{ LOTSIZES: LOTSIZES }, { OFFSETS: OFFSETS }, { offset: DEFAULT_OFFSET }, { lotsize: DEFAULT_LOTSIZE }, { KEYS: DEFAULT_KEYS }];

	// do some version checking here
	// clean out the storage area when requested

	startingProps.forEach(function (prop) {
	  var target = Object.keys(prop)[0];
	  initSetting(target, prop[target]);
	});

	// checks to see if a key already exists
	// and adds the default value if it doesnt
	function initSetting(key, value) {
	  store.set(key, value);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(2);
	var config = __webpack_require__(5);

	module.exports = function () {
	  var public_api = {

	    name: 'coinbase',

	    init: init,

	    getLotSizeInputElement: getLotSizeInputElement,
	    displayLotsize: displayLotsize,

	    marketBuy: marketBuy,
	    marketSell: marketSell,

	    cancelBids: cancelBids,
	    cancelOffers: cancelOffers,
	    cancelAll: cancelAll,
	    cancelLast: cancelLast,

	    displayOffset: displayOffset,

	    placeBuyOrder: placeBuyOrder,
	    placeSellOrder: placeSellOrder,

	    setBuyPrice: setBuyPrice,

	    getBestBid: getBestBid,
	    getBestOffer: getBestOffer
	  };

	  return public_api;
	};

	/**
	 *              INIT
	 *
	 * Try to get the dom object we need,
	 * if it exists, init, otherwise try again later.
	 * Keep trying until we get our dom object!
	 *
	 * once we get our element:
	 *    - set lot size
	 *    - display offset
	 */
	function init() {
	  if (switchToLimitOrder()) {
	    setTimeout(function () {
	      initialize();
	    }, 500);
	  } else {
	    setTimeout(function () {
	      init();
	    }, 500);
	  }
	}

	/*  MARKET BUY  */
	function marketBuy() {
	  switchToMarketOrder();
	  setTimeout(function () {
	    setMarketOrderLotSize();
	    placeBuyOrder();
	  }, 100);
	  setTimeout(function () {
	    switchToLimitOrder();
	  }, 200);
	}

	/*  MARKET SELL */
	function marketSell() {
	  switchToMarketOrder();
	  setTimeout(function () {
	    setMarketOrderLotSize();
	    placeSellOrder();
	  }, 100);
	  setTimeout(function () {
	    switchToLimitOrder();
	  }, 200);
	}

	/* CANCEL ALL BIDS */
	function cancelBids() {
	  var orders = getOrders();
	  orders.forEach(function (order) {
	    if (order.side === 'buy') {
	      setTimeout(function () {
	        order.cancelButton.click();
	      }, 100);
	    }
	  });
	}

	/* CANCEL ALL OFFERS */
	function cancelOffers() {
	  var orders = getOrders();
	  orders.forEach(function (order) {
	    if (order.side === 'sell') {
	      setTimeout(function () {
	        order.cancelButton.click();
	      }, 100);
	    }
	  });
	}

	/*  CANCEL LAST ORDER */
	function cancelLast() {
	  var orders = getOrders();
	  var button = getLastValidCancelButton(orders);
	  if (button) {
	    button.click();
	  }
	}

	/*  CANCEL ALL ORDERS */
	function cancelAll() {
	  var cancelButton = getCancelAllButtonElement();
	  cancelButton.click();
	}

	/**
	 *     DISPLAY THE OFFSET VALUE ON THE PAGE
	 *
	 *     @param {Number} v - the offset value to display
	 */
	function displayOffset(v) {
	  var homeDiv = getOffsetParentElement();
	  var target = getOffsetElement();
	  if (!target) {
	    var listItem = document.createElement('li');
	    listItem.style.textAlign = 'center';
	    var newEl = document.createElement('span');
	    newEl.id = 'CBEX_OFFSET_VALUE';
	    newEl.innerHTML = 'Offset: ' + v;
	    listItem.appendChild(newEl);
	    homeDiv.appendChild(listItem);
	  } else {
	    target.innerHTML = 'Offset: ' + v;
	  }
	}

	/**    PLACE A BUY ORDER   */
	function placeBuyOrder(p) {
	  console.log(p);
	  var switchTarget = getBuyTabButtonElement();
	  if (switchTarget) {
	    switchTarget.click();
	    setTimeout(function () {
	      var target = getBuyButtonElement();
	      if (target) {
	        setBuyPrice(p);
	        setTimeout(function () {
	          if (!config.DEBUG) {
	            target.click();
	          } else {
	            console.log('DEBUG -> SIMULATING CLICK ON: ', target);
	          }
	        }, 100);
	      } else {
	        console.error('Unable to locate buy button');
	      }
	    }, 10);
	  } else {
	    console.error('Cannot locate buy button');
	  }
	}

	/**   PLACE A SELL ORDER    */
	function placeSellOrder(p) {
	  // switch to sell window
	  var switchTarget = getSellTabButtonElement();
	  if (switchTarget) {
	    switchTarget.click();
	    setTimeout(function () {
	      var target = getSellButtonElement();
	      if (target) {
	        setSellPrice(p);
	        setTimeout(function () {
	          if (!config.DEBUG) {
	            target.click();
	          } else {
	            console.log('DEBUG -> SIMULATING CLICK ON: ', target);
	          }
	        }, 250);
	      } else {
	        console.error('Unable to locate sell button');
	      }
	    }, 10);
	  } else {
	    console.error('No sell tab button found');
	  }
	}

	/**
	 *        SET THE BUY PRICE
	 * @param {Number} p - the price to set
	 */
	function setBuyPrice(p) {
	  getPriceInputElement().value = p;
	}

	/**
	 *        SET THE SELL PRICE
	 * @param {Number} p - the price to set
	 */
	function setSellPrice(p) {
	  getPriceInputElement().value = p;
	}

	/**
	 * GET BEST BID
	 * @returns {String} - the current best bid
	 */
	function getBestBid() {
	  var bid = getBestBidElement();
	  var wholeNum = bid.children[0].innerHTML;
	  var decimal1 = bid.children[1].innerHTML;
	  var decimal2 = bid.children[2].innerHTML;

	  var bb = wholeNum + '.' + decimal1 + decimal2;
	  return bb;
	}

	/**
	 * GET BEST Offer
	 * @returns {String} - the current best offer
	 */
	function getBestOffer() {
	  var offer = getBestOfferElement();

	  var wholeNum = offer.children[0].innerHTML;
	  var decimal1 = offer.children[1].innerHTML;
	  var decimal2 = offer.children[2].innerHTML;

	  var bo = wholeNum + '.' + decimal1 + decimal2;
	  return bo;
	}

	/** ********************************************************/
	/** ***************   Private Functions *******************/
	/** *******************************************************/

	/**
	*        INITIALIZE
	* @param {PluginObject} - plugin - the plugin object
	*/
	function initialize(plugin) {
	  store.get(function (settings) {
	    displayLotsize(settings.lotsize);
	    displayOffset(settings.offset);
	  });
	}

	function displayLotsize(value) {
	  getLotSizeInputElement().value = value;
	}

	/**
	* switches the site page to the market order screen.
	*/
	function switchToMarketOrder() {
	  var marketButtonElement = getMarketButtonElement();
	  if (marketButtonElement) {
	    marketButtonElement.click();
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	* switches the site page to the limit order screen.
	*/
	function switchToLimitOrder() {
	  var limitButtonElement = getLimitButtonElement();
	  if (limitButtonElement) {
	    limitButtonElement.click();
	    return true;
	  } else {
	    return false;
	  }
	}

	/* set the lot size on the market order screen */
	function setMarketOrderLotSize() {
	  var lotSize = getLotSizeElement();
	  store.get(function (settings) {
	    lotSize.value = settings.lotsize;
	  });
	}

	/**
	* gets the list of orders
	* @return {Array} - an array of order objects
	*/
	function getOrders() {
	  var orders = getOrderElements();
	  return filterOrders(orders);
	}

	/**
	* takes a list of order elements and
	* extracts the needed order info from it
	* @returns {Array} - an array of order objects
	*/
	function filterOrders(orders) {
	  var orderList = [];
	  for (var i = 0; i < orders.length; i++) {
	    var order = orders[i].childNodes;

	    var size = order[0].innerText;
	    var filled = order[1].innerText;
	    var price = order[2].innerText;
	    var side = order[0].className.split(' ').indexOf('order-buy') !== -1 ? 'buy' : 'sell';

	    /**
	     * @TODO The actual numbering here can change depenging on the size of the display
	     * so we need to do some work to make this smarter and detect the proper field
	     * based on something other than numbers....
	     */
	    var cancelButton = order[7].childNodes[1].childNodes[0];

	    var thisOrderData = [size, side, filled, price, cancelButton];
	    orderList.push(new Order(thisOrderData));
	  }
	  return orderList;
	}

	/**
	* take an array of order data, and create an order object with it
	* @param {Array} orderDataArray
	*      - an array of strings, containing order data
	*      - and an HTMLElement
	*
	*    [size, side, filled, price, cancelButton]
	*
	* @returns {Object} - an object with all of the order data in it
	*
	*/
	function Order(orderData) {
	  this.size = orderData[0];
	  this.side = orderData[1];
	  this.filled = orderData[2];
	  this.price = orderData[3];
	  this.cancelButton = orderData[4];
	}

	/**
	* cbex cancel buttons will still show even if cancelled
	* so we must get a valid cancel button when needed
	* @param {Array} orders - an array of order object
	* @returns a usable cancel button or null
	*/
	function getLastValidCancelButton(orders) {
	  var index = 0;
	  var button;
	  var classes;

	  while (index < orders.length) {
	    button = orders[index].cancelButton;
	    classes = button.className.split(' ');

	    if (classes.indexOf('visible') !== -1) {
	      return button;
	    } else {
	      index++;
	    }
	  }

	  return null;
	}

	/** *******************************************************
	 *     ELEMENT ACCESSORS
	 *     these functions are used to get html elements
	 *     any changes to a sites css/html can be addressed here
	 **********************************************************/

	function getLotSizeInputElement() {
	  return document.querySelector('body > div:nth-child(10) > aside > div > div > form > article > div > ul.clearfix > span.visible > span > li:nth-child(2) > div > input') || document.querySelector('body > div:nth-child(9) > aside > div > div > form > article > div > ul.clearfix > span.visible > span > li:nth-child(2) > div > input');
	}

	function getOrderElements() {
	  return document.querySelector('#orders-list > ul').children;
	}

	function getLotSizeElement() {
	  return document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > li > div > input');
	}

	function getLimitButtonElement() {
	  return document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)') || document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)');
	}

	function getMarketButtonElement() {
	  return document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(1)');
	}

	function getBestOfferElement() {
	  return document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable') || document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable');
	}

	function getBestBidElement() {
	  return document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable') || document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable');
	}

	function getPriceInputElement() {
	  return document.getElementById('inputusd');
	}

	function getSellTabButtonElement() {
	  return document.querySelector('body > div:nth-child(10) > aside > div > div > form > article > div > ul.clearfix > span.visible > span > ul > li.switch-tab-item.sell') || document.querySelector('body > div:nth-child(9) > aside > div > div > form > article > div > ul.clearfix > span.visible > span > ul > li.switch-tab-item.sell');
	}

	function getSellButtonElement() {
	  return document.querySelector('body > div:nth-child(10) > aside > div > div > form > article > div > div > button.limit-order.market-order.balance-ok.sell') || document.querySelector('body > div:nth-child(9) > aside > div > div > form > article > div > div > button.limit-order.market-order.balance-ok.sell');
	}

	function getBuyTabButtonElement() {
	  return document.querySelector('body > div:nth-child(10) > aside > div > div > form > article > div > ul.clearfix > span.visible > span > ul > li.switch-tab-item.buy');
	}

	function getBuyButtonElement() {
	  return document.querySelector('body > div:nth-child(9) > aside > div > div > form > article > div > div > button.limit-order.market-order.balance-ok.buy') || document.querySelector('body > div:nth-child(10) > aside > div > div > form > article > div > div > button.limit-order.market-order.balance-ok.buy');
	}

	function getOffsetParentElement() {
	  return document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix') || document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div');
	}

	function getOffsetElement() {
	  return document.getElementById('CBEX_OFFSET_VALUE');
	}

	function getCancelAllButtonElement() {
	  return document.querySelector('body > div:nth-child(9) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a') || document.querySelector('body > div:nth-child(10) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a');
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = {};
	var buyOrderController = __webpack_require__(8);
	var sellOrderController = __webpack_require__(9);
	var utilsController = __webpack_require__(10);

	// add the interfaces to our array
	// TODO: as more dynamic method for this
	// so that as we add interfaces, we dont have
	// to add lines for each one here
	// the obvious solution of using requireDirectory is not
	// as easy at it might seem here (because of webpack)

	// export the array of utils
	// the active domInterface obect must be passed in
	module.exports = function (domInterface) {
	  // Assign each part of our utils package on to one object
	  Object.assign(utils, buyOrderController(domInterface));

	  Object.assign(utils, sellOrderController(domInterface));

	  Object.assign(utils, utilsController(domInterface));

	  // return that object
	  return utils;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(2);

	module.exports = function (domInterface) {
	  return {
	    placeBuyOrder: placeBuyOrder,
	    hitTheOffer: hitTheOffer,
	    bidBetter: bidBetter,
	    bidWithBest: bidWithBest,
	    bidBelowBest: bidBelowBest,
	    bidDoubleBelowBest: bidDoubleBelowBest
	  };

	  /** ***************************************
	   *              INTERFACE CALLS
	   ******************************************/
	  function formatPrice(p) {
	    // make sure the bid is in a string format
	    if (typeof p !== 'string') {
	      p = '' + p;
	    }
	    return p;
	  }

	  function placeBuyOrder(p) {
	    domInterface.placeBuyOrder(formatPrice(p));
	  }

	  /** **************************************
	   *             ACTIONS
	   ******************************************/

	  /*  HIT THE OFFER */
	  function hitTheOffer() {
	    // get offer price
	    // place limit buy at offer price
	    var price = domInterface.getBestOffer();
	    domInterface.placeBuyOrder(price);
	  }

	  /* Bid just above the best bid */
	  function bidBetter() {
	    var bestBid = domInterface.getBestBid();
	    var newBid = +bestBid + 0.01;
	    domInterface.placeBuyOrder(newBid.toFixed(2));
	  }

	  /* bid with the best current bid */
	  function bidWithBest() {
	    var bestBid = domInterface.getBestBid();
	    domInterface.placeBuyOrder(bestBid);
	  }

	  /* bid 1 offset level below the best bid */
	  function bidBelowBest() {
	    store.get(function (settings) {
	      var bestBid = domInterface.getBestBid();
	      var newBid = +bestBid - settings.offset;
	      domInterface.placeBuyOrder(newBid.toFixed(2));
	    });
	  }

	  /* bid 2 offset levels below best bid */
	  function bidDoubleBelowBest() {
	    store.get(function (settings) {
	      var bestBid = domInterface.getBestBid();
	      var newBid = +bestBid - settings.offset * 2;
	      domInterface.placeBuyOrder(newBid.toFixed(2));
	    });
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(2);

	module.exports = function (domInterface) {
	  return {
	    setSellPrice: setSellPrice,
	    placeSellOrder: placeSellOrder,
	    marketSell: marketSell,
	    hitTheBid: hitTheBid,
	    offerBetter: offerBetter,
	    offerWithBest: offerWithBest,
	    offerAboveBest: offerAboveBest,
	    offerDoubleAboveBest: offerDoubleAboveBest
	  };

	  /** **************************************
	   *        INTERFACE CALLS
	   ***************************************/
	  function setSellPrice(p) {
	    // make sure the bid is in a string format
	    if (typeof p !== 'string') {
	      p = '' + p;
	    }
	    domInterface.setSellPrice(p);
	  }

	  function placeSellOrder() {
	    domInterface.placeSellOrder();
	  }

	  function marketSell() {
	    domInterface.marketSell();
	  }

	  /** ************************************
	   *          ACTIONS
	   ***************************************/

	  /* HIT THE BID  */
	  function hitTheBid() {
	    // get bid price
	    // place limit sell order at bid
	    var price = domInterface.getBestBid();
	    domInterface.placeSellOrder(price);
	  }

	  /* Offer just below best offer */
	  function offerBetter() {
	    var bestOffer = domInterface.getBestOffer();
	    var newOffer = +bestOffer - 0.01;
	    domInterface.placeSellOrder(newOffer.toFixed(2));
	  }

	  /* Offer with the best current offer */
	  function offerWithBest() {
	    var bestOffer = domInterface.getBestOffer();
	    domInterface.placeSellOrder(bestOffer);
	  }

	  /* Offer 1 offset level above the best offer */
	  function offerAboveBest() {
	    var bestOffer = domInterface.getBestOffer();
	    store.get(function (settings) {
	      var newOffer = +bestOffer + settings.offset;
	      domInterface.placeSellOrder(newOffer.toFixed(2));
	    });
	  }

	  /* Offer 2 offset levels above the best offer */
	  function offerDoubleAboveBest() {
	    var bestOffer = domInterface.getBestOffer();
	    store.get(function (settings) {
	      var newOffer = +bestOffer + settings.offset * 2;
	      domInterface.placeSellOrder(newOffer.toFixed(2));
	    });
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(2);

	module.exports = function (domInterface) {
	  return {
	    displayOffset: displayOffset,
	    toggleOffset: toggleOffset,
	    setLotSize: setLotSize,
	    toggleLotSize: toggleLotSize,
	    cancelAll: cancelAll,
	    cancelBids: cancelBids,
	    cancelOffers: cancelOffers,
	    cancelLast: cancelLast
	  };

	  /** **************************************
	   *          OFFSET FUNCTIONS
	   ********************************************/

	  /**
	   * @param {Number} v - the new offset value
	   */
	  function displayOffset(v) {
	    domInterface.displayOffset(v);
	  }

	  /**
	   *      Toggle the offset value up or down
	   *
	   * @param {String} direction - can be 'up' or 'down'
	   * determines which way to toggle the offset
	   */
	  function toggleOffset(direction) {
	    store.get(function (settings) {
	      var idx = settings.OFFSETS.indexOf(settings.offset);
	      console.log(idx);
	      console.log(settings.OFFSETS.length);

	      if (direction === 'up') {
	        if (++idx >= settings.OFFSETS.length) {
	          idx = 0;
	        }
	      } else if (direction === 'down') {
	        if (--idx < 0) {
	          idx = settings.OFFSETS.length - 1;
	        }
	      } else {
	        console.error('Unknown toggle offset direction: ', direction);
	      }

	      store.set('offset', settings.OFFSETS[idx]);
	      domInterface.displayOffset(settings.OFFSETS[idx]);
	    });
	  }

	  /** ****************************************
	   *            LOT SIZE FUNCTIONS
	   ********************************************/

	  /**
	   *  SET LOT SIZE
	   *  @param {Number} v - the lotsize value
	   */
	  function setLotSize(v) {
	    store.get(function (settings) {
	      var amount = domInterface.getLotSizeInputElement();
	      v = v || settings.lotsize;
	      amount.value = v;
	      store.set('lotsize', v);
	      domInterface.displayLotsize(v);
	    });
	  }

	  /**
	   * TOGGLE LOT SIZE
	   * @param {String} direction - the direction to toggle our lotsize (up or down)
	   **/
	  function toggleLotSize(direction) {
	    store.get(function (settings) {
	      var idx = settings.LOTSIZES.indexOf(settings.lotsize);

	      if (direction === 'up') {
	        if (++idx >= settings.LOTSIZES.length) {
	          idx = 0;
	        }
	      } else if (direction === 'down') {
	        if (--idx < 0) {
	          idx = settings.LOTSIZES.length - 1;
	        }
	      } else {
	        console.error('Unknown lot size direction: ', direction);
	      }
	      var lotsize = settings.LOTSIZES[idx];
	      setLotSize(lotsize);
	    });
	  }

	  /** ************************************
	   *            CANCEL
	   ***************************************/
	  function cancelAll() {
	    domInterface.cancelAll();
	  }

	  function cancelLast() {
	    domInterface.cancelLast();
	  }

	  function cancelBids() {
	    domInterface.cancelBids();
	  }

	  function cancelOffers() {
	    domInterface.cancelOffers();
	  }
	};

/***/ }
/******/ ]);
var DEBUG = false;
var plugin = {};

/******************************************
 *          SETUP/CONFIG
 ****************************************/
plugin.LOTSIZES = [0.01, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 10];
plugin.INCREMENTS = [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.5, 0.75, 1, 2, 5, 10];

plugin.settings = {};
plugin.settings.INCR = 0.1;
plugin.settings.LOTSIZE = .1;

plugin.KEYS = {
  CANCEL_ALL: 89, // y
  CANCEL_LAST: 84, // t

  TOGGLE_LOTSIZE_UP: 220,
  TOGGLE_LOTSIZE_DOWN: 222,
  TOGGLE_INCR_UP: 189,
  TOGGLE_INCR_DOWN: 187,

  BID_BETTER: 70, // f
  BID_WITH_BEST_BID: 68, //d
  BID_BELOW_BEST: 83, //s
  BID_DOUBLE_BELOW_BEST: 65, // a

  OFFER_BETTER: 74, // j
  OFFER_WITH_BEST_ASK: 75, // k
  OFFER_ABOVE_BEST: 76, // l
  OFFER_DOUBLE_ABOVE_BEST: 186, // ;

  MARKET_BUY: 71, // g
  MARKET_SELL: 72 // h
};






/******************************************
 *          INIT
 ****************************************/
setTimeout(function(){
  window.addEventListener('keydown', onKeydown, false);
  window.addEventListener('keypress', onKeypress, false);
  window.addEventListener('keyup', onKeyup, false);

  setTimeout(function(){
    if (currentLocation() === 'coinbase'){
      var limitScreen = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)');
      eventFire(limitScreen, 'click');
    }
    setLotSize(plugin.settings.LOTSIZE);
    displayIncr(plugin.settings.INCR);
  }, 1000);

}, 2000);





/*****************************************
 *            KEYBOARD HANDLERS
 ****************************************/
function onKeydown(e){
  if(DEBUG){
    console.log('Keypress', e.keyCode);
  }
}

function onKeypress(e){
  //console.log('Keyup', e);
}

function onKeyup(e){
  switch(e.keyCode){
    /**************************************
     *            TOGGLE KEYS
     *************************************/

    // LOTSIZE UP
    case plugin.KEYS.TOGGLE_LOTSIZE_UP:
      var idx = plugin.LOTSIZES.indexOf(plugin.settings.LOTSIZE);
      if (++idx >= plugin.LOTSIZES.length){
        idx = 0;
      }
      var lotsize = plugin.LOTSIZES[idx];
      setLotSize(lotsize);
      break;

      // LOTSIZE DOWN
    case plugin.KEYS.TOGGLE_LOTSIZE_DOWN:
      var idx = plugin.LOTSIZES.indexOf(plugin.settings.LOTSIZE);
      if (--idx < 0){
        idx = plugin.LOTSIZES.length - 1;
      }
      var lotsize = plugin.LOTSIZES[idx];
      setLotSize(lotsize);
      break;

      // INCREMENT UP
    case plugin.KEYS.TOGGLE_INCR_UP:
      var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
      if (++idx >= plugin.INCREMENTS.length){
        idx = 0;
      }
      plugin.settings.INCR = plugin.INCREMENTS[idx];
      displayIncr(plugin.settings.INCR);
      break;

      // INCREMENT DOWN
    case plugin.KEYS.TOGGLE_INCR_DOWN:
      var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
      if (--idx < 0){
        idx = plugin.INCREMENTS.length - 1;
      }
      plugin.settings.INCR = plugin.INCREMENTS[idx];
      displayIncr(plugin.settings.INCR);
      break;



    /********************************
     *          BUY ORDER KEYS
     ********************************/
    // place best limit bid order on the market
    case plugin.KEYS.BID_BETTER:
      var bestBid = getBestBid();
      var newBid = +bestBid + 0.01;
      setPrice(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // place bid at current best bid
    case plugin.KEYS.BID_WITH_BEST_BID:
      var bestBid = getBestBid();
      setPrice(bestBid);
      placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_BELOW_BEST:
      var bestBid = getBestBid();
      var newBid = +bestBid - plugin.settings.INCR;
      setPrice(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_DOUBLE_BELOW_BEST:
      var bestBid = getBestBid();
      var newBid = +bestBid - (plugin.settings.INCR * 2);
      setPrice(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // place market buy
    case plugin.KEYS.MARKET_BUY:
      if (currentLocation() === 'coinbase'){

      } else {
        document.getElementById('buy_type').value = 'MARKET';
        placeBuyOrder();
        document.getElementById('buy_type').value = 'LIMIT';
      }
      break;



    /********************************
     *           SELL ORDER KEYS
     ********************************/
    // place the best limit sell on the market
    case plugin.KEYS.OFFER_BETTER:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer - 0.01;
      setPrice(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_WITH_BEST_ASK:
      var bestOffer = getBestOffer();
      setPrice(bestOffer);
      placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_ABOVE_BEST:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer + plugin.settings.INCR;
      setPrice(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_DOUBLE_ABOVE_BEST:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer + (plugin.settings.INCR * 2);
      setPrice(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place market sell
    case plugin.KEYS.MARKET_SELL:
      if (currentLocation() === 'coinbase'){

      } else {
        document.getElementById('sell_type').value = 'MARKET';
        placeSellOrder();
        document.getElementById('sell_type').value = 'LIMIT';
      }
      break;


    // cancel last order
    case plugin.KEYS.CANCEL_LAST:
      //do something
      break;

    // cancel all order
    case plugin.KEYS.CANCEL_ALL:
      if (currentLocation() === 'coinbase'){
        var cancelButton = document.querySelector('body > div:nth-child(10) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a');
        eventFire(cancelButton, 'click');
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI('/orders/cancel_all'));
        xhr.send();
      }
      break;

    default:
      console.log('Key: ', e.keyCode);
      break
  }
}



/**********************************
 *             HELPERS
 **********************************/
/**
 * @param {Number} v - the new lotsize value
 */
function setLotSize(v){
  var amount;
  if (window.location.hostname.indexOf('coinbase') !== -1){
    amount = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > span > li:nth-child(1) > div > input');
  } else if (window.location.hostname.indexOf('bitfinex') !== -1){
    amount = document.getElementById('amount');
  }
  v = v || plugin.settings.LOTSIZE;
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}

/**
 * @param {Number} v - the new increment value
 */
function displayIncr(v){
  if (currentLocation() === 'coinbase'){
    var homeDiv = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix');
    var target = document.getElementById('CB_INCRVAL');
    if(!target){
      var listItem = document.createElement('li');
      var newEl = document.createElement('span');
      newEl.id = 'CB_INCRVAL';
      newEl.innerHTML = 'Increment: ' + v;
      listItem.appendChild(newEl);
      homeDiv.appendChild(listItem);
    } else {
      target.innerHTML = 'Increment: ' + v;
    }

  } else {
    var homeDiv = document.querySelector('#trading-ticket-form > div:nth-child(5) > ul > li > div.collapsible-header');

    var target = document.getElementById('INCRVAL');
    if(!target){
      var span = document.createElement('span');
      span.id = 'INCRVAL';
      span.innerHTML = 'Increment: ' + v;
      homeDiv.appendChild(span);
    } else {
      target.innerHTML = 'Increment: ' + v;
    }
  }
}

function placeBuyOrder(){
  if(!DEBUG){
    if(currentLocation() === 'coinbase'){
      eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.buy.balance-ok'), 'click');
    } else {
      eventFire(document.getElementById('buy-button'), 'click');
    }
  }
}

function placeSellOrder(){
  if (!DEBUG){
    if(currentLocation() === 'coinbase'){
      eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.sell.balance-ok'), 'click');
    } else {
      eventFire(document.getElementById('sell-button'), 'click');
    }
  }
}

function setPrice(p){

  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }

  if(currentLocation() === 'coinbase'){
    document.getElementById('inputusd').value = p;
  } else {
    document.getElementById('buy_price').value = p;
  }
}

/**
 * find the current web location
 * @returns {String} - name of current website
 */
function currentLocation(){
  if (window.location.hostname.indexOf('coinbase') !== -1){
    return 'coinbase';
  } else if (window.location.hostname.indexOf('bitfinex') !== -1){
    return 'bitfinex'
  } else {
    return 'unknown';
  }
}

function getBestBid(){
  var bestBid;
  var location = currentLocation();
  var actionsByLocation = {
    'coinbase': function(){
      var wholeNum = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.whole');
      wholeNum = wholeNum.innerHTML;
      var decimal1 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.part');
      decimal1 = decimal1.innerHTML;

      var decimal2 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.part-2');
      decimal2 = decimal2.innerHTML;

      var bb = wholeNum + '.' + decimal1 + decimal2;
      return bb;
    },
    'bitfinex': function(){
      bestBid = document.querySelector('#bids > div > table > tbody > tr:nth-child(1) > td > div > div.col.price.col-currency');
      return bestBid.innerHTML;
    }
  };

  if (actionsByLocation[location]){
    return actionsByLocation[location]();
  } else {
    return null;
  }
}

function getBestOffer(){

  var bestOffer;
  if (window.location.hostname.indexOf('coinbase') !== -1){
    var wholeNum = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.whole');
    wholeNum = wholeNum.innerHTML;
    var decimal1 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.part');
    decimal1 = decimal1.innerHTML;

    var decimal2 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.part-2');
    decimal2 = decimal2.innerHTML;

    var bo = wholeNum + '.' + decimal1 + decimal2;
    return bo;

  } else if (window.location.hostname.indexOf('bitfinex') !== -1){
    var bestAsk = document.querySelector('#asks > div > table > tbody > tr:nth-child(1) > td > div > div.col.col-currency.price');
    return bestAsk.innerHTML;

  } else {
    throw new Error('Invalid location');
  }
}

/**
 * Simulate an event being fired.
 * Used for 'clicking' the buy/sell buttons.
 */
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}


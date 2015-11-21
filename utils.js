var plugin = plugin || {};
var utils = {};

/**********************************
 *             HELPERS
 **********************************/
/**
 * @param {Number} v - the new lotsize value
 */
utils.setLotSize = function(v){
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
utils.displayIncr = function(v){
  if (utils.currentLocation() === 'coinbase'){
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

utils.placeBuyOrder = function(){
  if(!DEBUG){
    if(utils.currentLocation() === 'coinbase'){
      utils.eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.buy.balance-ok'), 'click');
    } else {
      utils.eventFire(document.getElementById('buy-button'), 'click');
    }
  }
}

utils.placeSellOrder = function(){
  if (!DEBUG){
    if(utils.currentLocation() === 'coinbase'){
      utils.eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.sell.balance-ok'), 'click');
    } else {
      utils.eventFire(document.getElementById('sell-button'), 'click');
    }
  }
}

utils.setPrice = function(p){

  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }

  if(utils.currentLocation() === 'coinbase'){
    document.getElementById('inputusd').value = p;
  } else {
    document.getElementById('buy_price').value = p;
  }
}

/**
 * find the current web location
 * @returns {String} - name of current website
 */
utils.currentLocation = function(){
  if (window.location.hostname.indexOf('coinbase') !== -1){
    return 'coinbase';
  } else if (window.location.hostname.indexOf('bitfinex') !== -1){
    return 'bitfinex'
  } else {
    return 'unknown';
  }
}

utils.getBestBid = function(){
  var bestBid;
  var location = utils.currentLocation();
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

utils.getBestOffer = function(){

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
utils.eventFire = function(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

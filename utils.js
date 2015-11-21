/**********************************
 *          UTILITY FUNCTIONS
 **********************************/
var plugin = plugin || {};
var utils = {};



/**
 *     Set the desired lot size
 * @param {Number} v - the new lotsize value
 */
utils.setLotSize = function(v){
  var amount = plugin.strategy.getLotSizeInputElement(v);
  v = v || plugin.settings.LOTSIZE;
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}

/**
 * Display the increment value
 * @param {Number} v - the new increment value
 */
utils.displayIncr = function(v){
  plugin.strategy.displayIncr(v);
}




/********************************************
 *           PLACE ORDER
 *******************************************/
utils.placeBuyOrder = function(){
  plugin.strategy.placeBuyOrder();
}

utils.placeSellOrder = function(){
  plugin.strategy.placeSellOrder();
}




/********************************************
 *          SET ORDER PRICE
 *******************************************/
utils.setBuyPrice = function(p){
  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }
  plugin.strategy.setBuyPrice(p);
}

utils.setSellPrice = function(p){
  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }
  plugin.strategy.setSellPrice(p);
}




/****************************************
 * Get Best Bid/ Best Offer data
 ***************************************/
utils.getBestBid = function(){
  return plugin.strategy.getBestBid();
}

utils.getBestOffer = function(){
  return plugin.strategy.getBestOffer();
}


/****************************************
 *            TOGGLES
 ***************************************/
/**
 *        Toggle lot size up or down
 * @param {String} direction - can be 'up' or 'down'
 * determines which way to toggle the lot size
 */
utils.toggleLotSize = function(direction){
    var idx = plugin.LOTSIZES.indexOf(plugin.settings.LOTSIZE);

    if (direction === 'up'){
      if (++idx >= plugin.LOTSIZES.length){
        idx = 0;
      }
    } else if (direction === 'down'){
      if (--idx < 0){
        idx = plugin.LOTSIZES.length - 1;
      }
    } else {
      console.error('Unknown lot size direction: ', direction);
    }

    var lotsize = plugin.LOTSIZES[idx];
    utils.setLotSize(lotsize);
}

/**
 *      Toggle the increment value up or down
 * @param {String} direction - can be 'up' or 'down'
 * determines which way to toggle the increment
 */
utils.toggleIncrement = function(direction){
  var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
  if (direction === 'up'){
    if (++idx >= plugin.INCREMENTS.length){
      idx = 0;
    }
  } else if (direction === 'down'){
    if (--idx < 0){
      idx = plugin.INCREMENTS.length - 1;
    }
  } else {
    console.error('Unknown toggle increment direction: ', direction);
  }
  plugin.settings.INCR = plugin.INCREMENTS[idx];
  utils.displayIncr(plugin.settings.INCR);
}

/*******************************************
 *          BUY ORDERS
 ******************************************/

/* Bid just above the best bid */
utils.bidBetter = function() {
  var bestBid = utils.getBestBid();
  var newBid = +bestBid + 0.01;
  utils.setBuyPrice(newBid.toFixed(2));
  utils.placeBuyOrder();
}

/* bid with the best current bid */
utils.bidWithBest = function() {
  var bestBid = utils.getBestBid();
  utils.setBuyPrice(bestBid);
  utils.placeBuyOrder();
}

/* bid 1 increment level below the best bid */
utils.bidBelowBest = function(){
  var bestBid = utils.getBestBid();
  var newBid = +bestBid - plugin.settings.INCR;
  utils.setBuyPrice(newBid.toFixed(2));
  utils.placeBuyOrder();
}

/* bid 2 increment levels below best bid */
utils.bidDoubleBelowBest = function(){
  var bestBid = utils.getBestBid();
  var newBid = +bestBid - (plugin.settings.INCR * 2);
  utils.setBuyPrice(newBid.toFixed(2));
  utils.placeBuyOrder();
}



/********************************
 *           SELL ORDER KEYS
 ********************************/

/* Offer just below best offer */
utils.offerBetter = function(){
  var bestOffer = utils.getBestOffer();
  var newOffer = +bestOffer - 0.01;
  utils.setSellPrice(newOffer.toFixed(2));
  utils.placeSellOrder();
}

/* Offer with the best current offer */
utils.offerWithBest = function(){
  var bestOffer = utils.getBestOffer();
  utils.setSellPrice(bestOffer);
  utils.placeSellOrder();
}

/* Offer 1 increment level above the best offer */
utils.offerAboveBest = function(){
  var bestOffer = utils.getBestOffer();
  var newOffer = +bestOffer + plugin.settings.INCR;
  utils.setSellPrice(newOffer.toFixed(2));
  utils.placeSellOrder();
}

/* Offer 2 increment levels above the best offer */
utils.offerDoubleAboveBest = function() {
  var bestOffer = utils.getBestOffer();
  var newOffer = +bestOffer + (plugin.settings.INCR * 2);
  utils.setSellPrice(newOffer.toFixed(2));
  utils.placeSellOrder();
}
/**
 * Simulate an event being fired.
 * Used for 'clicking' the buy/sell buttons.
 * @param {Element} el - the html element we will fire the event on
 * @param {String} - eType - the event type
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

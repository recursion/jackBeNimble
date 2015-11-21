/**********************************
 *          UTILITY FUNCTIONS
 **********************************/
var plugin = plugin || {};



/**
 *     Set the desired lot size
 * @param {Number} v - the new lotsize value
 */
plugin.setLotSize = function(v){
  var amount = plugin.strategy.getLotSizeInputElement(v);
  v = v || plugin.settings.LOTSIZE;
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}

/**
 * Display the increment value
 * @param {Number} v - the new increment value
 */
plugin.displayIncr = function(v){
  plugin.strategy.displayIncr(v);
}




/********************************************
 *           PLACE ORDER
 *******************************************/
plugin.placeBuyOrder = function(){
  plugin.strategy.placeBuyOrder();
}

plugin.placeSellOrder = function(){
  plugin.strategy.placeSellOrder();
}




/********************************************
 *          SET ORDER PRICE
 *******************************************/
plugin.setBuyPrice = function(p){
  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }
  plugin.strategy.setBuyPrice(p);
}

plugin.setSellPrice = function(p){
  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }
  plugin.strategy.setSellPrice(p);
}




/****************************************
 * Get Best Bid/ Best Offer data
 ***************************************/
plugin.getBestBid = function(){
  return plugin.strategy.getBestBid();
}

plugin.getBestOffer = function(){
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
plugin.toggleLotSize = function(direction){
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
    plugin.setLotSize(lotsize);
}

/**
 *      Toggle the increment value up or down
 * @param {String} direction - can be 'up' or 'down'
 * determines which way to toggle the increment
 */
plugin.toggleIncrement = function(direction){
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
  plugin.displayIncr(plugin.settings.INCR);
}

/*******************************************
 *          BUY ORDERS
 ******************************************/

/* Bid just above the best bid */
plugin.bidBetter = function() {
  var bestBid = plugin.getBestBid();
  var newBid = +bestBid + 0.01;
  plugin.setBuyPrice(newBid.toFixed(2));
  plugin.placeBuyOrder();
}

/* bid with the best current bid */
plugin.bidWithBest = function() {
  var bestBid = plugin.getBestBid();
  plugin.setBuyPrice(bestBid);
  plugin.placeBuyOrder();
}

/* bid 1 increment level below the best bid */
plugin.bidBelowBest = function(){
  var bestBid = plugin.getBestBid();
  var newBid = +bestBid - plugin.settings.INCR;
  plugin.setBuyPrice(newBid.toFixed(2));
  plugin.placeBuyOrder();
}

/* bid 2 increment levels below best bid */
plugin.bidDoubleBelowBest = function(){
  var bestBid = plugin.getBestBid();
  var newBid = +bestBid - (plugin.settings.INCR * 2);
  plugin.setBuyPrice(newBid.toFixed(2));
  plugin.placeBuyOrder();
}



/********************************
 *           SELL ORDER KEYS
 ********************************/

/* Offer just below best offer */
plugin.offerBetter = function(){
  var bestOffer = plugin.getBestOffer();
  var newOffer = +bestOffer - 0.01;
  plugin.setSellPrice(newOffer.toFixed(2));
  plugin.placeSellOrder();
}

/* Offer with the best current offer */
plugin.offerWithBest = function(){
  var bestOffer = plugin.getBestOffer();
  plugin.setSellPrice(bestOffer);
  plugin.placeSellOrder();
}

/* Offer 1 increment level above the best offer */
plugin.offerAboveBest = function(){
  var bestOffer = plugin.getBestOffer();
  var newOffer = +bestOffer + plugin.settings.INCR;
  plugin.setSellPrice(newOffer.toFixed(2));
  plugin.placeSellOrder();
}

/* Offer 2 increment levels above the best offer */
plugin.offerDoubleAboveBest = function() {
  var bestOffer = plugin.getBestOffer();
  var newOffer = +bestOffer + (plugin.settings.INCR * 2);
  plugin.setSellPrice(newOffer.toFixed(2));
  plugin.placeSellOrder();
}
/**
 * Simulate an event being fired.
 * Used for 'clicking' the buy/sell buttons.
 * @param {Element} el - the html element we will fire the event on
 * @param {String} - eType - the event type
 */
plugin.eventFire = function(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

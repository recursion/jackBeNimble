var plugin = plugin || {};
var utils = {};

/**********************************
 *             HELPERS
 **********************************/
/**
 * @param {Number} v - the new lotsize value
 */
utils.setLotSize = function(v){
  var amount = plugin.strategy.getLotSizeInputElement(v);
  v = v || plugin.settings.LOTSIZE;
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}

/**
 * @param {Number} v - the new increment value
 */
utils.displayIncr = function(v){
  plugin.strategy.displayIncr(v);
}

utils.placeBuyOrder = function(){
  plugin.strategy.placeBuyOrder();
}

utils.placeSellOrder = function(){
  plugin.strategy.placeSellOrder();
}

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

utils.getBestBid = function(){
  return plugin.strategy.getBestBid();
}

utils.getBestOffer = function(){
  return plugin.strategy.getBestOffer();
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

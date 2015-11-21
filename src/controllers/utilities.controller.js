/**********************************
 *          Controller Functions
 **********************************/
var plugin = plugin || {};


/********************************************
 *      DISPLAY INCREMENT VALUE
 ********************************************/
/**
 * @param {Number} v - the new increment value
 */
plugin.displayIncr = function(v){
  plugin.strategy.displayIncr(v);
}


/**********************************************
 *            SET LOT SIZE
**********************************************/
/**
 * @param {Number} v - the new lotsize value
 **********************************************/
plugin.setLotSize = function(v){
  var amount = plugin.strategy.getLotSizeInputElement(v);
  v = v || plugin.settings.LOTSIZE;
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}



/****************************************
 *      GET BEST BID / BEST OFFER
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

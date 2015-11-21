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
plugin.displayOffset = function(v){
  plugin.strategy.displayOffset(v);
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
 *      Toggle the offset value up or down
 * @param {String} direction - can be 'up' or 'down'
 * determines which way to toggle the offset
 */
plugin.toggleOffset = function(direction){
  var idx = plugin.OFFSETS.indexOf(plugin.settings.OFFSET);
  if (direction === 'up'){
    if (++idx >= plugin.OFFSETS.length){
      idx = 0;
    }
  } else if (direction === 'down'){
    if (--idx < 0){
      idx = plugin.OFFSETS.length - 1;
    }
  } else {
    console.error('Unknown toggle offset direction: ', direction);
  }
  plugin.settings.OFFSET = plugin.OFFSETS[idx];
  plugin.displayOffset(plugin.settings.OFFSET);
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

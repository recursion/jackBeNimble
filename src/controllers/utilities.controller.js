/**********************************
 *          Controller Functions
 **********************************/
var plugin = plugin || {};
var interfaces = interfaces || {};


/********************************************
 *      SET PLUGIN LOCATION STRATEGY
 ********************************************/
/**
 * find and set the current web location
 *
 * determines the interface module we use for interfacing
 * with the webpage DOM.
 *
 * - this is where new exchange 'interfaces' can be used.
 */
plugin.setInterface = function(){
  if (window.location.hostname.indexOf('coinbase') !== -1){
    plugin.interface = interfaces.cbex;
  } else if (window.location.hostname.indexOf('bitfinex') !== -1){
    plugin.interface = interfaces.bfx;
  } else {
    plugin.interface = 'unknown';
  }
}


/********************************************
 *      DISPLAY INCREMENT VALUE
 ********************************************/
/**
 * @param {Number} v - the new offset value
 */
plugin.displayOffset = function(v){
  plugin.interface.displayOffset(v);
}


/**********************************************
 *            SET LOT SIZE
**********************************************/
/**
 * @param {Number} v - the new lotsize value
 **********************************************/
plugin.setLotSize = function(v){
  var amount = plugin.interface.getLotSizeInputElement(v);
  v = v || plugin.settings.LOTSIZE;
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}



/****************************************
 *      GET BEST BID / BEST OFFER
 ***************************************/
plugin.getBestBid = function(){
  return plugin.interface.getBestBid();
}

plugin.getBestOffer = function(){
  return plugin.interface.getBestOffer();
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

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
  plugin.config.getSettings(function(settings){
    var amount = plugin.interface.getLotSizeInputElement(v);
    v = v || settings.lotsize;
    amount.value = v;
    plugin.config.set({'lotsize': v});
  });
}


/****************************************
 *            CANCEL
 ***************************************/
plugin.cancel_all = function(){
  plugin.interface.cancel_all();
}

plugin.cancel_last = function(){
  plugin.interface.cancel_last();
}

plugin.cancel_bids = function(){
  plugin.interface.cancel_bids();
}

plugin.cancel_offers = function(){
  plugin.interface.cancel_offers();
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
  plugin.config.getSettings(function(settings){
    var idx = plugin.config.LOTSIZES.indexOf(settings.lotsize);

    if (direction === 'up'){
      if (++idx >= plugin.config.LOTSIZES.length){
        idx = 0;
      }
    } else if (direction === 'down'){
      if (--idx < 0){
        idx = plugin.config.LOTSIZES.length - 1;
      }
    } else {
      console.error('Unknown lot size direction: ', direction);
    }
    var lotsize = plugin.config.LOTSIZES[idx];
    plugin.setLotSize(lotsize);
  });
}

/**
 *      Toggle the offset value up or down
 *
 * @param {String} direction - can be 'up' or 'down'
 * determines which way to toggle the offset
 */
plugin.toggleOffset = function(direction){
  plugin.config.getSettings(function(settings){
    var idx = plugin.config.OFFSETS.indexOf(settings.offset);

    if (direction === 'up'){
      if (++idx >= plugin.config.OFFSETS.length){
        idx = 0;
      }
    } else if (direction === 'down'){
      if (--idx < 0){
        idx = plugin.config.OFFSETS.length - 1;
      }
    } else {
      console.error('Unknown toggle offset direction: ', direction);
    }

    plugin.config.set({'offset': plugin.config.OFFSETS[idx]});
    plugin.displayOffset(plugin.config.OFFSETS[idx]);

  });
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
    evObj.initEvent(etype, true, true);
    evObj.preventDefault();
    el.dispatchEvent(evObj);
  }
}

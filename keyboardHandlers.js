var plugin = plugin || {};
var utils = utils || {};

/*****************************************
 *            KEYBOARD HANDLERS
 ****************************************/
var keyboardHandlers = {};

keyboardHandlers.onKeydown = function(e){
  if(DEBUG){
    console.log('Keypress', e.keyCode);
  }
}

keyboardHandlers.onKeypress = function(e){
  //console.log('Keyup', e);
}

keyboardHandlers.onKeyup = function(e){
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
      utils.setLotSize(lotsize);
      break;

      // LOTSIZE DOWN
    case plugin.KEYS.TOGGLE_LOTSIZE_DOWN:
      var idx = plugin.LOTSIZES.indexOf(plugin.settings.LOTSIZE);
      if (--idx < 0){
        idx = plugin.LOTSIZES.length - 1;
      }
      var lotsize = plugin.LOTSIZES[idx];
      utils.setLotSize(lotsize);
      break;

      // INCREMENT UP
    case plugin.KEYS.TOGGLE_INCR_UP:
      var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
      if (++idx >= plugin.INCREMENTS.length){
        idx = 0;
      }
      plugin.settings.INCR = plugin.INCREMENTS[idx];
      utils.displayIncr(plugin.settings.INCR);
      break;

      // INCREMENT DOWN
    case plugin.KEYS.TOGGLE_INCR_DOWN:
      var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
      if (--idx < 0){
        idx = plugin.INCREMENTS.length - 1;
      }
      plugin.settings.INCR = plugin.INCREMENTS[idx];
      utils.displayIncr(plugin.settings.INCR);
      break;



    /********************************
     *          BUY ORDER KEYS
     ********************************/
    // place best limit bid order on the market
    case plugin.KEYS.BID_BETTER:
      var bestBid = utils.getBestBid();
      var newBid = +bestBid + 0.01;
      utils.setPrice(newBid.toFixed(2));
      utils.placeBuyOrder();
      break;

    // place bid at current best bid
    case plugin.KEYS.BID_WITH_BEST_BID:
      var bestBid = utils.getBestBid();
      utils.setPrice(bestBid);
      utils.placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_BELOW_BEST:
      var bestBid = utils.getBestBid();
      var newBid = +bestBid - plugin.settings.INCR;
      utils.setPrice(newBid.toFixed(2));
      utils.placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_DOUBLE_BELOW_BEST:
      var bestBid = utils.getBestBid();
      var newBid = +bestBid - (plugin.settings.INCR * 2);
      utils.setPrice(newBid.toFixed(2));
      utils.placeBuyOrder();
      break;

    // place market buy
    case plugin.KEYS.MARKET_BUY:
      if (utils.currentLocation() === 'coinbase'){

      } else {
        document.getElementById('buy_type').value = 'MARKET';
        utils.placeBuyOrder();
        document.getElementById('buy_type').value = 'LIMIT';
      }
      break;



    /********************************
     *           SELL ORDER KEYS
     ********************************/
    // place the best limit sell on the market
    case plugin.KEYS.OFFER_BETTER:
      var bestOffer = utils.getBestOffer();
      var newOffer = +bestOffer - 0.01;
      utils.setPrice(newOffer.toFixed(2));
      utils.placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_WITH_BEST_ASK:
      var bestOffer = utils.getBestOffer();
      utils.setPrice(bestOffer);
      utils.placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_ABOVE_BEST:
      var bestOffer = utils.getBestOffer();
      var newOffer = +bestOffer + plugin.settings.INCR;
      utils.setPrice(newOffer.toFixed(2));
      utils.placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_DOUBLE_ABOVE_BEST:
      var bestOffer = utils.getBestOffer();
      var newOffer = +bestOffer + (plugin.settings.INCR * 2);
      utils.setPrice(newOffer.toFixed(2));
      utils.placeSellOrder();
      break;

    // place market sell
    case plugin.KEYS.MARKET_SELL:
      if (utils.currentLocation() === 'coinbase'){

      } else {
        document.getElementById('sell_type').value = 'MARKET';
        utils.placeSellOrder();
        document.getElementById('sell_type').value = 'LIMIT';
      }
      break;


    // cancel last order
    case plugin.KEYS.CANCEL_LAST:
      //do something
      break;

    // cancel all order
    case plugin.KEYS.CANCEL_ALL:
      if (utils.currentLocation() === 'coinbase'){
        var cancelButton = document.querySelector('body > div:nth-child(10) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a');
        utils.eventFire(cancelButton, 'click');
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

var plugin = plugin || {};
var plugin = plugin || {};
var keyboardHandlers = {};


/*****************************************
 *            KEYBOARD HANDLERS
 ****************************************/
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
      plugin.toggleLotSize('up');
      break;

    // LOTSIZE DOWN
    case plugin.KEYS.TOGGLE_LOTSIZE_DOWN:
      plugin.toggleLotSize('down');
      break;

      // OFFSET UP
    case plugin.KEYS.TOGGLE_OFFSET_UP:
      plugin.toggleOffset('up');
      break;

      // OFFSET DOWN
    case plugin.KEYS.TOGGLE_OFFSET_DOWN:
      plugin.toggleOffset('down');
      break;



    /********************************
     *          BUY ORDER KEYS
     ********************************/
    // place best limit bid order on the market
    case plugin.KEYS.BID_BETTER:
      plugin.bidBetter();
      break;

    // place bid at current best bid
    case plugin.KEYS.BID_WITH_BEST_BID:
      plugin.bidWithBest();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_BELOW_BEST:
      plugin.bidBelowBest();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_DOUBLE_BELOW_BEST:
      plugin.bidDoubleBelowBest();
      break;

    // place market buy
    case plugin.KEYS.MARKET_BUY:
      plugin.interface.market_buy();
      break;



    /********************************
     *           SELL ORDER KEYS
     ********************************/
    // place the best limit sell on the market
    case plugin.KEYS.OFFER_BETTER:
      plugin.offerBetter();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_WITH_BEST_ASK:
      plugin.offerWithBest();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_ABOVE_BEST:
      plugin.offerAboveBest();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_DOUBLE_ABOVE_BEST:
      plugin.offerDoubleAboveBest();
      break;

    // place market sell
    case plugin.KEYS.MARKET_SELL:
      plugin.interface.market_sell();
      break;


    // cancel last order
    case plugin.KEYS.CANCEL_LAST:
      //do something
      break;

    // cancel all order
    case plugin.KEYS.CANCEL_ALL:
      plugin.interface.cancel_all();
      break;

    default:
      console.log('Key: ', e.keyCode);
      break
  }
}

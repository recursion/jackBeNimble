var plugin = plugin || {};
var utils = utils || {};
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
      utils.toggleLotSize('up');
      break;

    // LOTSIZE DOWN
    case plugin.KEYS.TOGGLE_LOTSIZE_DOWN:
      utils.toggleLotSize('down');
      break;

      // INCREMENT UP
    case plugin.KEYS.TOGGLE_INCR_UP:
      utils.toggleIncrement('up');
      break;

      // INCREMENT DOWN
    case plugin.KEYS.TOGGLE_INCR_DOWN:
      utils.toggleIncrement('down');
      break;



    /********************************
     *          BUY ORDER KEYS
     ********************************/
    // place best limit bid order on the market
    case plugin.KEYS.BID_BETTER:
      utils.bidBetter();
      break;

    // place bid at current best bid
    case plugin.KEYS.BID_WITH_BEST_BID:
      utils.bidWithBest();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_BELOW_BEST:
      utils.bidBelowBest();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_DOUBLE_BELOW_BEST:
      utils.bidDoubleBelowBest();
      break;

    // place market buy
    case plugin.KEYS.MARKET_BUY:
      plugin.strategy.market_buy();
      break;



    /********************************
     *           SELL ORDER KEYS
     ********************************/
    // place the best limit sell on the market
    case plugin.KEYS.OFFER_BETTER:
      utils.offerBetter();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_WITH_BEST_ASK:
      utils.offerWithBest();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_ABOVE_BEST:
      utils.offerAboveBest();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_DOUBLE_ABOVE_BEST:
      utils.offerDoubleAboveBest();
      break;

    // place market sell
    case plugin.KEYS.MARKET_SELL:
      plugin.strategy.market_sell();
      break;


    // cancel last order
    case plugin.KEYS.CANCEL_LAST:
      //do something
      break;

    // cancel all order
    case plugin.KEYS.CANCEL_ALL:
      plugin.strategy.cancel_all();
      break;

    default:
      console.log('Key: ', e.keyCode);
      break
  }
}

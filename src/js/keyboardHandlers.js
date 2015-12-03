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
  chrome.storage.sync.get('KEYS', function(settings){
    switch(e.keyCode){
      /**************************************
       *            TOGGLE KEYS
       *************************************/

      // LOTSIZE UP
      case settings.KEYS.TOGGLE_LOTSIZE_UP:
        plugin.toggleLotSize('up');
        break;

      // LOTSIZE DOWN
      case settings.KEYS.TOGGLE_LOTSIZE_DOWN:
        plugin.toggleLotSize('down');
        break;

        // OFFSET UP
      case settings.KEYS.TOGGLE_OFFSET_UP:
        plugin.toggleOffset('up');
        break;

        // OFFSET DOWN
      case settings.KEYS.TOGGLE_OFFSET_DOWN:
        plugin.toggleOffset('down');
        break;



      /********************************
       *          BUY ORDER KEYS
       ********************************/
      // place best limit bid order on the market
      case settings.KEYS.BID_BETTER:
        plugin.bidBetter();
        break;

      // place bid at current best bid
      case settings.KEYS.BID_WITH_BEST_BID:
        plugin.bidWithBest();
        break;

      // Place bid at (INCR) below the current best bid
      case settings.KEYS.BID_BELOW_BEST:
        plugin.bidBelowBest();
        break;

      // Place bid at (INCR) below the current best bid
      case settings.KEYS.BID_DOUBLE_BELOW_BEST:
        plugin.bidDoubleBelowBest();
        break;

      // place limit order at the current ask price
      case settings.KEYS.HIT_THE_OFFER:
        plugin.interface.hit_the_offer();
        break;


      // place market buy
      case settings.KEYS.MARKET_BUY:
        plugin.interface.market_buy();
        break;



      /********************************
       *           SELL ORDER KEYS
       ********************************/
      // place the best limit sell on the market
      case settings.KEYS.OFFER_BETTER:
        plugin.offerBetter();
        break;

      // place offer at current best ask
      case settings.KEYS.OFFER_WITH_BEST_ASK:
        plugin.offerWithBest();
        break;

      // place offer at current best ask
      case settings.KEYS.OFFER_ABOVE_BEST:
        plugin.offerAboveBest();
        break;

      // place offer at current best ask
      case settings.KEYS.OFFER_DOUBLE_ABOVE_BEST:
        plugin.offerDoubleAboveBest();
        break;

      // place limit order at the current bid price
      case settings.KEYS.HIT_THE_BID:
        plugin.interface.hit_the_bid();
        break;

      // place market sell
      case settings.KEYS.MARKET_SELL:
        plugin.interface.market_sell();
        break;


      /********************************
       *      CANCEL ORDER KEYS
       ********************************/
      // cancel all bids
      case settings.KEYS.CANCEL_BIDS:
        plugin.cancel_bids();
        break;

      // cancel all order
      case settings.KEYS.CANCEL_OFFERS:
        plugin.cancel_offers();
        break;

      // cancel last order
      case settings.KEYS.CANCEL_LAST:
        plugin.cancel_last();
        break;

      // cancel all order
      case settings.KEYS.CANCEL_ALL:
        plugin.cancel_all();
        break;

      default:
        console.log('Key: ', e.keyCode);
        break
    }
  });
}

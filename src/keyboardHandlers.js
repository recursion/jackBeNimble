const config = require('./config')

module.exports = function (actionsObject) {

  var public_api = {
    onKeydown: onKeydown,
    onKeypress: onKeypress,
    onKeyup: onKeyup
  }

  return public_api

  /* **************************************
   *            KEYBOARD HANDLERS
   * @TODO convert to an engine that can handle more than one key
   ****************************************/
  function onKeydown (e) {
    config.getSettings((settings) => {
      switch(e.keyCode){
        /**************************************
         *            TOGGLE KEYS
         *************************************/

        // LOTSIZE UP
        case settings.KEYS.TOGGLE_LOTSIZE_UP:
          actionsObject.toggleLotSize('up');
          break;

        // LOTSIZE DOWN
        case settings.KEYS.TOGGLE_LOTSIZE_DOWN:
          actionsObject.toggleLotSize('down');
          break;

          // OFFSET UP
        case settings.KEYS.TOGGLE_OFFSET_UP:
          actionsObject.toggleOffset('up');
          break;

          // OFFSET DOWN
        case settings.KEYS.TOGGLE_OFFSET_DOWN:
          actionsObject.toggleOffset('down');
          break;



        /********************************
         *          BUY ORDER KEYS
         ********************************/
        // place best limit bid order on the market
        case settings.KEYS.BID_BETTER:
          actionsObject.bidBetter();
          break;

        // place bid at current best bid
        case settings.KEYS.BID_WITH_BEST_BID:
          actionsObject.bidWithBest();
          break;

        // Place bid at (INCR) below the current best bid
        case settings.KEYS.BID_BELOW_BEST:
          actionsObject.bidBelowBest();
          break;

        // Place bid at (INCR) below the current best bid
        case settings.KEYS.BID_DOUBLE_BELOW_BEST:
          actionsObject.bidDoubleBelowBest();
          break;

        // place limit order at the current ask price
        case settings.KEYS.HIT_THE_OFFER:
          actionsObject.hitTheOffer();
          break;


        // place market buy
        case settings.KEYS.MARKET_BUY:
          actionsObject.marketBuy();
          break;



        /********************************
         *           SELL ORDER KEYS
         ********************************/
        // place the best limit sell on the market
        case settings.KEYS.OFFER_BETTER:
          actionsObject.offerBetter();
          break;

        // place offer at current best ask
        case settings.KEYS.OFFER_WITH_BEST_ASK:
          actionsObject.offerWithBest();
          break;

        // place offer at current best ask
        case settings.KEYS.OFFER_ABOVE_BEST:
          actionsObject.offerAboveBest();
          break;

        // place offer at current best ask
        case settings.KEYS.OFFER_DOUBLE_ABOVE_BEST:
          actionsObject.offerDoubleAboveBest();
          break;

        // place limit order at the current bid price
        case settings.KEYS.HIT_THE_BID:
          actionsObject.hitTheBid();
          break;

        // place market sell
        case settings.KEYS.MARKET_SELL:
          actionsObject.marketSell();
          break;


        /********************************
         *      CANCEL ORDER KEYS
         ********************************/
        // cancel all bids
        case settings.KEYS.CANCEL_BIDS:
          actionsObject.cancelBids();
          break;

        // cancel all order
        case settings.KEYS.CANCEL_OFFERS:
          actionsObject.cancelOffers();
          break;

        // cancel last order
        case settings.KEYS.CANCEL_LAST:
          actionsObject.cancelLast();
          break;

        // cancel all order
        case settings.KEYS.CANCEL_ALL:
          actionsObject.cancelAll();
          break;

        default:
          console.log('Key: ', e.keyCode);
          break
      }
    });
  }

  function onKeypress(e){
    //console.log('Keyup', e);
  }

  function onKeyup(e){

  }
}

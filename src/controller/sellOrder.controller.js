const store = require('../utils/store')

module.exports = (domInterface) => {
  return {
    setSellPrice,
    placeSellOrder,
    marketSell,
    hitTheBid,
    offerBetter,
    offerWithBest,
    offerAboveBest,
    offerDoubleAboveBest
  }

  /** **************************************
   *        INTERFACE CALLS
   ***************************************/
  function setSellPrice (p) {
    // make sure the bid is in a string format
    if (typeof p !== 'string') {
      p = '' + p
    }
    domInterface.setSellPrice(p)
  }

  function placeSellOrder () {
    domInterface.placeSellOrder()
  }

  function marketSell () {
    domInterface.marketSell()
  }

  /** ************************************
   *          ACTIONS
   ***************************************/

  /* HIT THE BID  */
  function hitTheBid () {
    // get bid price
    // place limit sell order at bid
    domInterface.getBestBid()
      .then((price) => {
        domInterface.placeSellOrder(price)
      })
  }

  /* Offer just below best offer */
  function offerBetter () {
    domInterface.getBestOffer()
      .then((bestOffer) => {
        var newOffer = +bestOffer - 0.01
        domInterface.placeSellOrder(fixDecimals(newOffer))
      })
  }

  /* Offer with the best current offer */
  function offerWithBest () {
    domInterface.getBestOffer()
      .then((bestOffer) => {
        domInterface.placeSellOrder(bestOffer)
      })
  }

  /* Offer 1 offset level above the best offer */
  function offerAboveBest () {
    store.get((settings) => {
      domInterface.getBestOffer()
        .then((bestOffer) => {
          var newOffer = +bestOffer + settings.offset
          domInterface.placeSellOrder(fixDecimals(newOffer))
        })
    })
  }

  /* Offer 2 offset levels above the best offer */
  function offerDoubleAboveBest () {
    store.get((settings) => {
      domInterface.getBestOffer()
        .then((bestOffer) => {
          var newOffer = +bestOffer + (settings.offset * 2)
          domInterface.placeSellOrder(fixDecimals(newOffer))
        })
    })
  }

  function fixDecimals(p) {
    // if we are using USD - then format to two decimals
    // add support for other fiats
    if (window.location.pathname.toLowerCase().indexOf('usd') !== -1) {
      return p.toFixed(2)
    } else {
      // otherwise its coin-coin and we want more decimals
      return p.toFixed(5)
    }
  }
}

const store = require('../utils/store')

module.exports = (domInterface) => {
  return {
    placeBuyOrder,
    hitTheOffer,
    bidBetter,
    bidWithBest,
    bidBelowBest,
    bidDoubleBelowBest,
    marketBuy: domInterface.marketBuy
  }

  /** ***************************************
   *              INTERFACE CALLS
   ******************************************/
  function formatPrice (p) {
    // make sure the bid is in a string format
    if (typeof p !== 'string') {
      p = '' + p
    }
    return p
  }

  function placeBuyOrder (p) {
    domInterface.placeBuyOrder(formatPrice(p))
  }

  /** **************************************
   *             ACTIONS
   ******************************************/

  /*  HIT THE OFFER */
  function hitTheOffer () {
    // get offer price
    // place limit buy at offer price
    domInterface.getBestOffer()
      .then((price) => {
        domInterface.placeBuyOrder(price)
      })
  }

  /* Bid just above the best bid */
  function bidBetter () {
    domInterface.getBestBid()
      .then((bestBid) => {
        const newBid = +bestBid + 0.01
        domInterface.placeBuyOrder(fixDecimals(newBid))
      })
  }

  /* bid with the best current bid */
  function bidWithBest () {
    domInterface.getBestBid()
      .then((bestBid) => {
        domInterface.placeBuyOrder(bestBid)
      })
  }

  /* bid 1 offset level below the best bid */
  function bidBelowBest () {
    store.get((settings) => {
      domInterface.getBestBid()
        .then((bestBid) => {
          var newBid = +bestBid - settings.offset
          domInterface.placeBuyOrder(fixDecimals(newBid))
        })
    })
  }

  /* bid 2 offset levels below best bid */
  function bidDoubleBelowBest () {
    store.get((settings) => {
      domInterface.getBestBid()
        .then((bestBid) => {
          const newBid = +bestBid - (settings.offset * 2)
          domInterface.placeBuyOrder(fixDecimals(newBid))
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

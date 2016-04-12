const store = require('../utils/store')

module.exports = (domInterface) => {
  return {
    placeBuyOrder,
    hitTheOffer,
    bidBetter,
    bidWithBest,
    bidBelowBest,
    bidDoubleBelowBest
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
        domInterface.placeBuyOrder(newBid.toFixed(2))
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
          domInterface.placeBuyOrder(newBid.toFixed(2))
        })
    })
  }

  /* bid 2 offset levels below best bid */
  function bidDoubleBelowBest () {
    store.get((settings) => {
      domInterface.getBestBid()
        .then((bestBid) => {
          const newBid = +bestBid - (settings.offset * 2)
          domInterface.placeBuyOrder(newBid.toFixed(2))
        })
    })
  }
}

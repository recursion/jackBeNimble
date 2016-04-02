const store = require('../store')

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
    var price = domInterface.getBestBid()
    domInterface.placeSellOrder(price)
  }

  /* Offer just below best offer */
  function offerBetter () {
    var bestOffer = domInterface.getBestOffer()
    var newOffer = +bestOffer - 0.01
    domInterface.placeSellOrder(newOffer.toFixed(2))
  }

  /* Offer with the best current offer */
  function offerWithBest () {
    var bestOffer = domInterface.getBestOffer()
    domInterface.placeSellOrder(bestOffer)
  }

  /* Offer 1 offset level above the best offer */
  function offerAboveBest () {
    var bestOffer = domInterface.getBestOffer()
    store.get((settings) => {
      var newOffer = +bestOffer + settings.offset
      domInterface.placeSellOrder(newOffer.toFixed(2))
    })
  }

  /* Offer 2 offset levels above the best offer */
  function offerDoubleAboveBest () {
    var bestOffer = domInterface.getBestOffer()
    store.get((settings) => {
      var newOffer = +bestOffer + (settings.offset * 2)
      domInterface.placeSellOrder(newOffer.toFixed(2))
    })
  }
}

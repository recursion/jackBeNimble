/* **************************************
 *            KEYBOARD HANDLERS
 ****************************************/
module.exports = function (emitter, actionsObject) {
/**
 *            TOGGLE KEYS
 */

  // LOTSIZE UP
  emitter.on('TOGGLE_LOTSIZE_UP', () => {
    actionsObject.toggleLotSize('up')
  })

  emitter.on('TOGGLE_LOTSIZE_DOWN', () => {
    actionsObject.toggleLotSize('down')
  })

  emitter.on('TOGGLE_OFFSET_DOWN', () => {
    actionsObject.toggleOffset('down')
  })

  emitter.on('TOGGLE_OFFSET_UP', () => {
    actionsObject.toggleOffset('up')
  })

/**
 *          BUY ORDER KEYS
 */

  emitter.on('BID_BETTER', () => {
    actionsObject.bidBetter()
  })

  emitter.on('BID_WITH_BEST_BID', () => {
    actionsObject.bidWithBest()
  })

  emitter.on('BID_BELOW_BEST', () => {
    actionsObject.bidBelowBest()
  })

  emitter.on('BID_DOUBLE_BELOW_BEST', () => {
    actionsObject.bidDoubleBelowBest()
  })

  emitter.on('HIT_THE_OFFER', () => {
    actionsObject.hitTheOffer()
  })

  emitter.on('MARKET_BUY', () => {
    actionsObject.marketBuy()
  })

/**
 *           SELL ORDER KEYS
 */
  emitter.on('OFFER_BETTER', () => {
    actionsObject.offerBetter()
  })

  emitter.on('OFFER_WITH_BEST_ASK', () => {
    actionsObject.offerWithBest()
  })

  emitter.on('OFFER_ABOVE_BEST', () => {
    actionsObject.offerAboveBest()
  })

  emitter.on('OFFER_DOUBLE_ABOVE_BEST', () => {
    actionsObject.offerDoubleAboveBest()
  })

  emitter.on('HIT_THE_BID', () => {
    actionsObject.hitTheBid()
  })

  emitter.on('MARKET_SELL', () => {
    actionsObject.marketSell()
  })

/**
 *      CANCEL ORDER KEYS
 */

  emitter.on('CANCEL_BIDS', () => {
    actionsObject.cancelBids()
  })

  emitter.on('CANCEL_OFFERS', () => {
    actionsObject.cancelOffers()
  })

  emitter.on('CANCEL_LAST', () => {
    actionsObject.cancelLast()
  })

  emitter.on('CANCEL_ALL', () => {
    actionsObject.cancelAll()
  })
}

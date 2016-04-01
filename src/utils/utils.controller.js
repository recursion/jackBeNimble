const config = require('../config')

module.exports = function (domInterface) {
  return {
    displayOffset,
    toggleOffset,
    setLotSize,
    toggleLotSize,
    cancelAll,
    cancelBids,
    cancelOffers,
    cancelLast
  }

  /** **************************************
   *          OFFSET FUNCTIONS
   ********************************************/

  /**
   * @param {Number} v - the new offset value
   */
  function displayOffset (v) {
    domInterface.displayOffset(v)
  }

  /**
   *      Toggle the offset value up or down
   *
   * @param {String} direction - can be 'up' or 'down'
   * determines which way to toggle the offset
   */
  function toggleOffset (direction) {
    config.getSettings((settings) => {
      let idx = config.OFFSETS.indexOf(settings.offset)

      if (direction === 'up') {
        if (++idx >= config.OFFSETS.length) {
          idx = 0
        }
      } else if (direction === 'down') {
        if (--idx < 0) {
          idx = config.OFFSETS.length - 1
        }
      } else {
        console.error('Unknown toggle offset direction: ', direction)
      }

      config.set({'offset': config.OFFSETS[idx]})
      domInterface.displayOffset(config.OFFSETS[idx])
    })
  }

  /** ****************************************
   *            LOT SIZE FUNCTIONS
   ********************************************/

  /**
   *  SET LOT SIZE
   *  @param {Number} v - the lotsize value
   */
  function setLotSize (v) {
    config.getSettings((settings) => {
      const amount = domInterface.getLotSizeInputElement()
      v = v || settings.lotsize
      amount.value = v
      config.set({'lotsize': v})
      domInterface.displayLotsize(v)
    })
  }

  /**
   * TOGGLE LOT SIZE
   * @param {String} direction - the direction to toggle our lotsize (up or down)
   **/
  function toggleLotSize (direction) {
    config.getSettings(function (settings) {
      let idx = config.LOTSIZES.indexOf(settings.lotsize)

      if (direction === 'up') {
        if (++idx >= config.LOTSIZES.length) {
          idx = 0
        }
      } else if (direction === 'down') {
        if (--idx < 0) {
          idx = config.LOTSIZES.length - 1
        }
      } else {
        console.error('Unknown lot size direction: ', direction)
      }
      var lotsize = config.LOTSIZES[idx]
      setLotSize(lotsize)
    })
  }

  /** ************************************
   *            CANCEL
   ***************************************/
  function cancelAll () {
    domInterface.cancelAll()
  }

  function cancelLast () {
    domInterface.cancelLast()
  }

  function cancelBids () {
    domInterface.cancelBids()
  }

  function cancelOffers () {
    domInterface.cancelOffers()
  }

  /** ************************************
   *      GET BEST BID / BEST OFFER
   ***************************************/
  function getBestBid (){
    return domInterface.getBestBid()
  }

  function getBestOffer (){
    return domInterface.getBestOffer()
  }
}

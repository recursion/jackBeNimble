const store = require('../utils/store')

module.exports = function (domInterface) {
  // setup listeners for offset / lotsize changes
  // this allows us to update changes from other accounts
  // a better idea is going to be to store these by site - rather than globally
  chrome.storage.onChanged.addListener((changes, areaName) => {
    let value
    if (Object.keys(changes).indexOf('offset') !== -1) {
      value = changes['offset']
      domInterface.displayOffset(value.newValue)
    } else if (Object.keys(changes).indexOf('lotsize') !== -1) {
      value = changes['lotsize']
      domInterface.displayLotsize(value.newValue)
    }
  })

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
    store.get((settings) => {
      let idx = settings.OFFSETS.indexOf(settings.offset)

      if (direction === 'up') {
        if (++idx >= settings.OFFSETS.length) {
          idx = 0
        }
      } else if (direction === 'down') {
        if (--idx < 0) {
          idx = settings.OFFSETS.length - 1
        }
      } else {
        console.error('Unknown toggle offset direction: ', direction)
      }

      store.set('offset', settings.OFFSETS[idx])
      domInterface.displayOffset(settings.OFFSETS[idx])
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
    store.get((settings) => {
      const amount = domInterface.getLotSizeInputElement()
      v = v || settings.lotsize
      amount.value = v
      store.set('lotsize', v)
      domInterface.displayLotsize(v)
    })
  }

  /**
   * TOGGLE LOT SIZE
   * @param {String} direction - the direction to toggle our lotsize (up or down)
   **/
  function toggleLotSize (direction) {
    store.get(function (settings) {
      let idx = settings.LOTSIZES.indexOf(settings.lotsize)

      if (direction === 'up') {
        if (++idx >= settings.LOTSIZES.length) {
          idx = 0
        }
      } else if (direction === 'down') {
        if (--idx < 0) {
          idx = settings.LOTSIZES.length - 1
        }
      } else {
        console.error('Unknown lot size direction: ', direction)
      }
      var lotsize = settings.LOTSIZES[idx]
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
}

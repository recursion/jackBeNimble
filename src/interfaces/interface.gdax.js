const store = require('../utils/store')
const {log, logError} = require('../utils/logger')

// against my best efforts, we now have to get best bid/ask from the api
// because coinbase has pulled the final FU move against jackBeNimble - they moved all of their bid/ask data into a canvas element. :(
const API_URL = 'https://api.gdax.com'

module.exports = () => {
  const public_api = {

    name: 'gdax',

    init: init,

    getLotSizeInputElement: getLotSizeInputElement,
    displayLotsize,

    marketBuy: marketBuy,
    marketSell: marketSell,

    cancelBids: cancelBids,
    cancelOffers: cancelOffers,
    cancelAll: cancelAll,
    cancelLast: cancelLast,

    displayOffset: displayOffset,

    placeBuyOrder: placeBuyOrder,
    placeSellOrder: placeSellOrder,

    setBuyPrice: setBuyPrice,

    getBestBid: getBestBid,
    getBestOffer: getBestOffer
  }

  return public_api
}

/**
 *              INIT
 *
 * Try to get the dom object we need,
 * if it exists, init, otherwise try again later.
 * Keep trying until we get our dom object!
 *
 * once we get our element:
 *    - set lot size
 *    - display offset
 */
function init () {
  if (switchToLimitOrder()) {
    setTimeout(() => {
      initialize()
    }, 500)
  } else {
    setTimeout(() => {
      init()
    }, 500)
  }
}

/*  MARKET BUY  */
function marketBuy () {
  switchToMarketOrder()
  setTimeout(() => {
    setMarketOrderLotSize()
    placeBuyOrder()
  }, 100)
  setTimeout(() => {
    switchToLimitOrder()
  }, 200)
}

/*  MARKET SELL */
function marketSell () {
  switchToMarketOrder()
  setTimeout(() => {
    setMarketOrderLotSize()
    placeSellOrder()
  }, 100)
  setTimeout(() => {
    switchToLimitOrder()
  }, 200)
}

/* CANCEL ALL BIDS */
function cancelBids () {
  var orders = getOrders()
  orders.forEach((order) => {
    if (order.side === 'buy') {
      setTimeout(() => {
        order.cancelButton.click()
      }, 100)
    }
  })
}

/* CANCEL ALL OFFERS */
function cancelOffers () {
  var orders = getOrders()
  orders.forEach((order) => {
    if (order.side === 'sell') {
      setTimeout(() => {
        order.cancelButton.click()
      }, 100)
    }
  })
}

/*  CANCEL LAST ORDER */
function cancelLast () {
  var orders = getOrders()
  var button = getLastValidCancelButton(orders)
  if (button) {
    button.click()
  }
}

/*  CANCEL ALL ORDERS */
function cancelAll () {
  var cancelButton = getCancelAllButtonElement()
  cancelButton.click()
}

/**
 *     DISPLAY THE OFFSET VALUE ON THE PAGE
 *
 *     @param {Number} v - the offset value to display
 */
function displayOffset (v) {
  var homeDiv = getOffsetParentElement()
  var target = getOffsetElement()
  if (!target) {
    var listItem = document.createElement('li')
    listItem.style.textAlign = 'center'
    var newEl = document.createElement('span')
    newEl.id = 'CBEX_OFFSET_VALUE'
    newEl.innerHTML = 'Offset: ' + v
    newEl.style.fontSize = '15px'
    newEl.style.fontWeight = 'bold'
    listItem.appendChild(newEl)
    homeDiv.appendChild(listItem)
  } else {
    target.innerHTML = 'Offset: ' + v
  }
}

/**    PLACE A BUY ORDER   */
function placeBuyOrder (p) {
  log(p)
  var switchTarget = getBuyTabButtonElement()
  if (switchTarget) {
    switchTarget.click()
    setTimeout(() => {
      var target = getBuyButtonElement()
      if (target) {
        setBuyPrice(p)
        setTimeout(() => {
          target.click()
          setTimeout(() => {
            store.get((settings) => {
              displayLotsize(settings.lotsize)
            })
          }, 100)
        }, 100)
      } else {
        logError('Unable to locate buy button')
      }
    }, 10)
  } else {
    logError('Cannot locate buy button')
  }
}

/**   PLACE A SELL ORDER    */
function placeSellOrder (p) {
  // switch to sell window
  var switchTarget = getSellTabButtonElement()
  if (switchTarget) {
    switchTarget.click()
    setTimeout(() => {
      var target = getSellButtonElement()
      if (target) {
        setSellPrice(p)
        setTimeout(() => {
          target.click()
          setTimeout(() => {
            store.get((settings) => {
              displayLotsize(settings.lotsize)
            })
          }, 100)
        }, 250)
      } else {
        logError('Unable to locate sell button')
      }
    }, 10)
  } else {
    logError('No sell tab button found')
  }
}

/**
 *        SET THE BUY PRICE
 * @param {Number} p - the price to set
 */
function setBuyPrice (p) {
  getPriceInputElement().value = p
}

/**
 *        SET THE SELL PRICE
 * @param {Number} p - the price to set
 */
function setSellPrice (p) {
  getPriceInputElement().value = p
}

/**
 * GET BEST BID
 * @returns {String} - the current best bid
 * no longer able to use the DOM for bid info since
 * coinbase has moved it all into a canvas element
 */
function getBestBid () {
  return new Promise((resolve, reject) => {
    fetch(API_URL + '/products/BTC-USD/ticker')
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      resolve(res.bid)
    })
  })
}

/**
 * GET BEST Offer
 * @returns {String} - the current best offer
 * no longer able to use the DOM for offer info since
 * coinbase has moved it all into a canvas element
 */
function getBestOffer () {
  return new Promise((resolve, reject) => {
    fetch(API_URL + '/products/BTC-USD/ticker')
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      resolve(res.ask)
    })
  })
}

/** ********************************************************/
/** ***************   Private Functions *******************/
/** *******************************************************/

/**
*        INITIALIZE
* @param {PluginObject} - plugin - the plugin object
*/
function initialize (plugin) {
  store.get((settings) => {
    displayLotsize(settings.lotsize)
    displayOffset(settings.offset)
  })
}

function displayLotsize (value) {
  getLotSizeInputElement().value = value
}

/**
* switches the site page to the market order screen.
*/
function switchToMarketOrder () {
  var marketButtonElement = getMarketButtonElement()
  if (marketButtonElement) {
    marketButtonElement.click()
    return true
  } else {
    return false
  }
}

/**
* switches the site page to the limit order screen.
*/
function switchToLimitOrder () {
  var limitButtonElement = getLimitButtonElement()
  if (limitButtonElement) {
    limitButtonElement.click()
    return true
  } else {
    return false
  }
}

/* set the lot size on the market order screen */
function setMarketOrderLotSize () {
  var lotSize = getLotSizeElement()
  store.get((settings) => {
    lotSize.value = settings.lotsize
  })
}

/**
* gets the list of orders
* @return {Array} - an array of order objects
*/
function getOrders () {
  var orders = getOrderElements()
  return filterOrders(orders)
}

/**
* takes a list of order elements and
* extracts the needed order info from it
* @returns {Array} - an array of order objects
*/
function filterOrders (orders) {
  var orderList = []
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i].childNodes

    var size = order[0].innerText
    var filled = order[1].innerText
    var price = order[2].innerText
    var side = (order[0].className.split(' ').indexOf('order-buy') !== -1) ? 'buy' : 'sell'

    /**
     * @TODO The actual numbering here can change depenging on the size of the display
     * so we need to do some work to make this smarter and detect the proper field
     * based on something other than numbers....
     */
    var cancelButton = order[7].childNodes[1].childNodes[0]

    var thisOrderData = [size, side, filled, price, cancelButton]
    orderList.push(new Order(thisOrderData))
  }
  return orderList
}

/**
* take an array of order data, and create an order object with it
* @param {Array} orderDataArray
*      - an array of strings, containing order data
*      - and an HTMLElement
*
*    [size, side, filled, price, cancelButton]
*
* @returns {Object} - an object with all of the order data in it
*
*/
function Order (orderData) {
  this.size = orderData[0]
  this.side = orderData[1]
  this.filled = orderData[2]
  this.price = orderData[3]
  this.cancelButton = orderData[4]
}

/**
* cbex cancel buttons will still show even if cancelled
* so we must get a valid cancel button when needed
* @param {Array} orders - an array of order object
* @returns a usable cancel button or null
*/
function getLastValidCancelButton (orders) {
  var index = 0
  var button
  var classes

  while (index < orders.length) {
    button = orders[index].cancelButton
    classes = button.className.split(' ')

    if (classes.indexOf('visible') !== -1) {
      return button
    } else {
      index++
    }
  }

  return null
}

/** *******************************************************
 *     ELEMENT ACCESSORS
 *     these functions are used to get html elements
 *     any changes to a sites css/html can be addressed here
 **********************************************************/

function getLotSizeInputElement () {
  return document.querySelector('aside > div > div > form > article > div > ul.clearfix > span.visible > span > li:nth-child(2) > div > input')
}

function getOrderElements () {
  return document.querySelector('#orders-list > ul').children
}

function getLotSizeElement () {
  return document.querySelector('aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > li > div > input')
}

function getLimitButtonElement () {
  return document.querySelector('aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)')
}

function getMarketButtonElement () {
  return document.querySelector('aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(1)')
}

function getPriceInputElement () {
  return document.querySelector('aside > div > div > form > article > div > ul.clearfix > span.visible > span > li:nth-child(3) > div > input')
}

function getSellTabButtonElement () {
  return document.querySelector('aside > div > div > form > article > div > ul.clearfix > span.visible > span > ul > li.switch-tab-item.sell')
}

function getSellButtonElement () {
  return document.querySelector('aside > div > div > form > article > div > div > button.limit-order.market-order.balance-ok.sell')
}

function getBuyTabButtonElement () {
  return document.querySelector('aside > div > div > form > article > div > ul.clearfix > span.visible > span > ul > li.switch-tab-item.buy')
}

function getBuyButtonElement () {
  return document.querySelector('aside > div > div > form > article > div > div > button.limit-order.market-order.balance-ok.buy')
}

function getOffsetParentElement () {
  return document.querySelector('aside > div > div.article-wrap.visible > form > article > div > ul.clearfix')
}

function getOffsetElement () {
  return document.getElementById('CBEX_OFFSET_VALUE')
}

function getCancelAllButtonElement () {
  return document.querySelector('section > div:nth-child(3) > header > div > ul.cancel-all > li > a')
}

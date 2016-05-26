const {logError} = require('../utils/logger')
const store = require('../utils/store')

module.exports = () => {
  const public_api = {

    name: 'bitfinex',

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

// track the URL location and reload the plugin
// when the local URL changes
let currentLocation
function reRenderOnLocationChanges () {
  let previousLocation = currentLocation
  currentLocation = window.location.pathname

  // if the location changed - lets re-initialize
  if (previousLocation !== currentLocation) {
    setTimeout(() => {
      init()
    }, 500)
  }

  // unfortunatly we have to poll here
  // because of the single-page-app nature of bitfinex
  // when a user changes tabs/pages - we need to re-display the offset
  setTimeout(() => {
    // check for location changes
    reRenderOnLocationChanges()
  }, 250)
}

/**
 *              INIT
 *
 *  get existing settings and apply them
 */
function init () {
  reRenderOnLocationChanges()

  // try to get the correct element
  if (canGetRootElement()) {
    // if we get it, intialize
    store.get((settings) => {
      displayLotsize(settings.lotsize)
      displayOffset(settings.offset)
    })
  } else {
    setTimeout(() => {
      init()
    }, 250)
  }
  // otherwise keep trying until we can
}

/*  MARKET BUY  */
function marketBuy () {
  getBuyOrderTypeElement().value = 'MARKET'
  placeBuyOrder()
  getBuyOrderTypeElement().value = 'LIMIT'
}

/*  MARKET SELL */
function marketSell () {
  getSellOrderTypeElement().value = 'MARKET'
  placeSellOrder()
  getSellOrderTypeElement().value = 'LIMIT'
}

/* CANCEL BIDS */
function cancelBids () {
  var orders = getOrders()
  orders.forEach((order) => {
    console.log(order)
    if (order.side === 'buy') {
      setTimeout(() => {
        order.cancelButton.click()
      }, 100)
    }
  })
}

/* CANCEL OFFERS */
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
  orders[orders.length - 1].cancelButton.click()
}

/*  CANCEL ALL ORDERS */
// this uses xhr because the sites 'cancel all button' causes
// a popup which is not desirable here
function cancelAll () {
  /* global XMLHttpRequest */
  // TODO: change this to fetch
  var xhr = new XMLHttpRequest()
  xhr.open('GET', encodeURI('/orders/cancel_all'))
  xhr.send()
}

/**
 *     DISPLAY THE OFFSET VALUE ON THE PAGE
 *
 * @param {Number} v - the offset value to display
 */
function displayOffset (v) {
  console.log('DP called with: ', v, typeof v)
  var homeDiv = getOffsetParentElement()
  var target = getOffsetElement()
  if (!homeDiv) {
    logError(`Could not access offset's parent element. Got: ${homeDiv}`)
  }
  if (!target) {
    var container = document.createElement('div')

    // setup some styling on the lotsize element
    var lotsizeInputElement = getLotSizeInputElement()
    lotsizeInputElement.style.width = "30%"
    lotsizeInputElement.style.marginLeft = "10px"

    var label = document.createElement('label')
    label.className = 'active'
    label.innerHTML = 'Offset'

    var input = document.createElement('input')
    input.style.width = "30%"
    input.style.marginLeft = "44px"
    input.readOnly = true
    input.id = 'BFX_OFFSET_VALUE'
    input.value = '' + v

    container.appendChild(label)
    container.appendChild(input)

    homeDiv.insertBefore(container, homeDiv.childNodes[1])
  } else {
    target.value = '' + v
  }
}

function displayLotsize (v) {
  getLotSizeInputElement().value = v
}

/**    PLACE A BUY ORDER   */
function placeBuyOrder (p) {
  setBuyPrice(p)
  getBuyButtonElement().click()
}

/**    PLACE A SELL ORDER   */
function placeSellOrder (p) {
  setSellPrice(p)
  getSellButtonElement().click()
}

/**
 *        SET THE BUY PRICE
 * @param {Number} p - the price to set
 */
function setBuyPrice (p) {
  getBuyPriceElement().value = p
}

/**
 *        SET THE SELL PRICE
 * @param {Number} p - the price to set
 */
function setSellPrice (p) {
  getSellPriceElement().value = p
}

/**
 * GET BEST BID
 * @returns {String} - the current best bid
 */
function getBestBid () {
  return new Promise((resolve, reject) => {
    var bestBid = getBestBidElement()
    resolve(bestBid.innerHTML)
  })
}

/**
 * GET BEST Offer
 * @returns {String} - the current best offer
 */
function getBestOffer () {
  return new Promise((resolve, reject) => {
    var bestAsk = getBestOfferElement()
    resolve(bestAsk.innerHTML)
  })
}

/** *******************************/
/*        Private functions       */
/** *******************************/

function canGetRootElement () {
  // check for the element we mount offset data to
  const test = getOffsetParentElement()
  // if it exists, return true
  if (test) {
    return true
  } else {
    return false
  }
  // otherwise return false
}

/**
*  Gets all orders currently on the page
*  @returns {Array} - an array of the html tr elements containing the order data.
*  @TODO strip only the critical order data from the orders.
*/
function getOrders () {
  var orderEls = getOrderElements()
  return filterOrders(orderEls)
}

/**
* Filter an array of order elements down to the most important data only
* @param {nodeList} - nodeList - the HTML nodelist of orders
* @returns {Array} - an array of order objects
*
    0: "505434297"         // id
    1: "BTCUSD"            // pair
    2: "Limit"             // type
    3: "-1.00000000"       // size
    4: "324.50"            // price
    5: "Active"            // status
    6: "22-11-15"          // date
    7: "11:19:28"          // time

*/
function filterOrders (nodeList) {
  var orders = []

  // 0th element of this list is text - so we dont use it
  for (var i = 1; i < nodeList.length; i++) {
    // the string is full of whitespace - so strip it
    var thisOrderElement = nodeList[i]
    var orderData = thisOrderElement.textContent.split(' ')
    var cancelButton = thisOrderElement.childNodes[16].childNodes[0]

    // create a new array with the order data we want
    var newOrderData = []
    for (var idx = 0; idx < orderData.length; idx++) {
      if (orderData[idx] !== '') {
        newOrderData.push(orderData[idx])
      }
    }

    newOrderData.push(cancelButton)

    // Use that order data array to create an order object and push
    // it onto our array of orders.
    orders.push(new Order(newOrderData))
  }
  return orders
}

/**
* take an array of order data, and create an order object with it
* @param {Array} orderDataArray
*      - an array of strings, containing order data
*      - and an HTMLElement
*
*    [id, pair, orderType, size, price, status, date, time, cancelButton]
*
* @returns {Object} - an object with all of the order data in it
*
*/
function Order (orderData) {
  this.id = orderData[0]
  this.pair = orderData[1]
  this.orderType = orderData[2]
  this.side = (isSellOrder(orderData[3])) ? 'sell' : 'buy'
  this.size = orderData[3]
  this.price = orderData[4]
  this.status = orderData[5]
  this.date = orderData[6]
  this.time = orderData[7]
  this.cancelButton = orderData[8]
}

function isSellOrder (order) {
  return order < 0
}

/** ******************************************************
 *     ELEMENT ACCESSORS
 *     these functions are used to get html elements
 *     any changes to a sites css/html can be addressed here
 **********************************************************/

function getOffsetParentElement () {
  return document.querySelector('#order-form > div.col.options > div > div')
}

function getLotsizeLabelElement() {
  return document.querySelector('#order-form > div.col.options > div > div > label:nth-child(3)')
}

function getOffsetElement () {
  return document.getElementById('BFX_OFFSET_VALUE')
}

function getBuyButtonElement () {
  return document.getElementById('buy-button')
}

function getSellButtonElement () {
  return document.getElementById('sell-button')
}

function getBestBidElement () {
  return document.querySelector('#bids > div > table > tbody > tr:nth-child(1) > td > div > div.col.price.col-currency')
}

function getBestOfferElement () {
  return document.querySelector('#asks > div > table > tbody > tr:nth-child(1) > td > div > div.col.col-currency.price')
}

function getOrderElements () {
  return document.getElementById('orderstable').children[1].childNodes
}

function getSellPriceElement () {
  return document.getElementById('sell_price')
}

function getBuyPriceElement () {
  return document.getElementById('buy_price')
}

function getLotSizeInputElement () {
  return document.getElementById('amount')
}

function getBuyOrderTypeElement () {
  return document.getElementById('buy_type')
}

function getSellOrderTypeElement () {
  return document.getElementById('sell_type')
}

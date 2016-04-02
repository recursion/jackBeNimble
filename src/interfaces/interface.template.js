// const store = require('../store')

// this should be the exchange name in lower case letters
// like coinbase, bitfinex, btcc, kraken - etc
const EXCHANGE_NAME = 'NAME_OF_EXCHANGE_HERE'

module.exports = () => {
  // the module MUST expose these functions
  // using their described function signatures
  const public_api = {

    name: EXCHANGE_NAME,

    init: init,

    marketBuy: marketBuy,
    marketSell: marketSell,

    cancelBids: cancelBids,
    cancelOffers: cancelOffers,
    cancelAll: cancelAll,
    cancelLast: cancelLast,

    getLotSizeInputElement: getLotSizeInputElement,
    displayOffset,
    displayLotsize,

    placeBuyOrder: placeBuyOrder,
    placeSellOrder: placeSellOrder,

    setBuyPrice: setBuyPrice,
    setSellPrice: setSellPrice,

    getBestBid: getBestBid,
    getBestOffer: getBestOffer
  }

  return public_api
}

/**
 *              INIT
 *
 * make sure there is a proper element to render to
 * and:
 *    - display lot size
 *    - display offset
 */
function init () {

}

/*  MARKET BUY
  manipulate the DOM
  so as to perform a market buy
  might look like:
    -> switch to market buy tab
    -> get marketBuy button
    -> maarketBuyButton.click()
*/
function marketBuy () {

}

/*  MARKET SELL
  manipulate the DOM
  so as to perform a market sell
  - same idea as market buy
*/
function marketSell () {
}

/* CANCEL ALL BIDS
  perform a cancel all bids action
  - this could be by simulating
    a click action on a DOM element
    OR by making an ajax call
    if the exchange allows it
*/
function cancelBids () {
}

/* CANCEL ALL OFFERS
  getting the idea?
*/
function cancelOffers () {
}

/*  CANCEL LAST ORDER */
function cancelLast () {
}

/*  CANCEL ALL ORDERS */
function cancelAll () {
}

/**
 *     DISPLAY THE OFFSET VALUE ON THE PAGE
 *
 *     @param {Number} v - the offset value to display
 */
function displayOffset (v) {
}

function displayLotsize () {

}

/**    PLACE A BUY ORDER   */
function placeBuyOrder (p) {

}

/**   PLACE A SELL ORDER    */
function placeSellOrder (p) {

}

/**
 *        SET THE BUY PRICE
 * @param {Number} p - the price to set
 */
function setBuyPrice (p) {
}

/**
 *        SET THE SELL PRICE
 * @param {Number} p - the price to set
 */
function setSellPrice (p) {
}

/**
 * GET BEST BID
 * @returns {String} - the current best bid
 * in a nicely formatted string:
 * ex: '19.94'
 */
function getBestBid () {

}

/**
 * GET BEST Offer
 * @returns {String} - the current best offer
 * ex: '19.94'
 */
function getBestOffer () {
}

/** ********************************************************/
/** ***************   HELPER Functions *******************/
/*
 *   Any helper / private functions can go here

/** *******************************************************/

/** *******************************************************
 *     ELEMENT ACCESSORS
 *
 *     these functions are used to get html elements
 *     any changes to a sites css/html must be addressed here
 *
 *    should look something like this:
 *
 *    function getWhateverSelectorName() {
 *      return document.querySelector('#whatever') || document.querySelectory('div.whateverClassName') || null
 *    }
 */
 // this is the element that contains the lotsize input
 // returns an Input Element
function getLotSizeInputElement () {
  // implement me
}

/*
YOU CAN USE THESE, BUT BY NO MEANS HAVE TO

function getLotSizeInputElement () {
}

function getOrderElements () {
}

function getLotSizeElement () {
}

function getLimitButtonElement () {
}

function getMarketButtonElement () {
}

function getBestOfferElement () {
}

function getBestBidElement () {
}

function getPriceInputElement () {
}

function getSellTabButtonElement () {
}

function getSellButtonElement () {
}

function getBuyTabButtonElement () {
}

function getBuyButtonElement () {
}

function getOffsetParentElement () {
}

function getOffsetElement () {
}

function getCancelAllButtonElement () {
}
*/

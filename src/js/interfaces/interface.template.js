var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.cbex = (function(){

  var public_api = {

    init: init,

    getLotSizeInputElement: getLotSizeInputElement,

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
    setSellPrice: setSellPrice,

    getBestBid: getBestBid,
    getBestOffer: getBestOffer

  };

  return public_api;

  /**
   *              INIT
   *    Any site specific setup goes here
   */
  function init(){

  }

  /*  MARKET BUY  */
  function marketBuy(){

  }


  /*  MARKET SELL */
  function marketSell(){


  }


  /*  CANCEL ALL ORDERS */
  function cancelAll(){

  }


  /**
   * display the offset value
   *
   * @param {Number} v - the offset value to display
   */
  function displayOffset (v){

  }


  /**
   * click the buy order button
   */
  function placeBuyOrder(){

  }

  /**
   * click the sell order button
   */
  function placeSellOrder(){
    if (!DEBUG){

    }
  }

  /**
   *        SET THE BUY PRICE
   *
   * @param {Number} p - the price to set
   */
  function setBuyPrice(p){

  }


  /**
   *        SET THE SELL PRICE
   *
   * @param {Number} p - the price to set
   */
  function setSellPrice(p){

  }


  /**
   * @returns {String} bestBid in 123.80 format
   */
  function getBestBid(){

  }

  /**
   *     GET BEST OFFER
   *
   * @returns {String} bestOffer in 123.80 format
   */
  function getBestOffer(){

  }

  /***************************************************
   *                PRIVATE FUNCTIONS
   **************************************************/


})();



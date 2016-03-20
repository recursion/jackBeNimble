var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.cbex = (function(){

  var public_api = {

    init: init,

    setLotSize: setLotSize,
    toggleLotSize: toggleLotSize,

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
   *
   * set lot size and display offset
   */
  function init(){
    // Any site specific setup goes here
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


  /* return the lot size input element */
  function getLotSizeInputElement (){

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

};



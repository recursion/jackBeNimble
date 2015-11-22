var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.EXCHANGE = {


  /**
   *              INIT
   *
   * set lot size and display offset
   */
  init: function(){
    // Any site specific setup goes here
  },


  /*  MARKET BUY  */
  market_buy: function(){

  },


  /*  MARKET SELL */
  market_sell: function(){


  },


  /*  CANCEL ALL ORDERS */
  cancel_all: function(){
  },


  /* return the lot size input element */
  getLotSizeInputElement: function(){
  },


  /**
   * display the offset value
   *
   * @param {Number} v - the offset value to display
   */
  displayOffset: function(v){
  },


  /**
   * click the buy order button
   */
  placeBuyOrder: function(){
  },


  /**
   * click the sell order button
   */
  placeSellOrder: function(){
    if (!DEBUG){
    }
  },


  /**
   *        SET THE BUY PRICE
   *
   * @param {Number} p - the price to set
   */
  setBuyPrice: function(p){
  },


  /**
   *        SET THE SELL PRICE
   *
   * @param {Number} p - the price to set
   */
  setSellPrice: function(p){
  },


  /**
   * @returns {String} bestBid in 123.80 format
   */
  getBestBid: function(){
  },

  /**
   *     GET BEST OFFER
   *
   * @returns {String} bestOffer in 123.80 format
   */
  getBestOffer: function(){

  }

};



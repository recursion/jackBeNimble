var strategies = strategies || {};
var utils = utils || {};

strategies.EXCHANGE = {

  init: function(){
    // Any site specific setup goes here
  },

  /**
   * buy at market
   */
  market_buy: function(){

  },

  /**
   * sell at market
   */
  market_sell: function(){


  },

  /**
   * cancel all orders
   */
  cancel_all: function(){
  },

  /* return the lot size input element */
  getLotSizeInputElement: function(v){
  },

  /**
   * display the increment value
   */
  displayIncr: function(v){
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
   * set the price field on the exchange order form
   */
  setPrice: function(p){
  },

  /**
   * @returns {String} bestBid in 123.80 format
   */
  getBestBid: function(){
  },

  /**
   * @returns {String} bestOffer in 123.80 format
   */
  getBestOffer: function(){

  }

};



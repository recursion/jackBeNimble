var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.bfx = (function(){

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
   *
   *  get existing settings and apply them
   */
  function init (){
    plugin.config.getSettings(function(settings){
      plugin.setLotSize(settings.lotsize);
      displayOffset(settings.offset);
    });
  }


  /*  MARKET BUY  */
  function marketBuy(){
    getBuyOrderTypeElement().value = 'MARKET';
    plugin.placeBuyOrder();
    getBuyOrderTypeElement().value = 'LIMIT';
  }


  /*  MARKET SELL */
  function marketSell(){
    getSellOrderTypeElement().value = 'MARKET';
    plugin.placeSellOrder();
    getSellOrderTypeElement().value = 'LIMIT';
  }


  /* CANCEL BIDS */
  function cancelBids (){
    var orders = getOrders();
    orders.forEach(function(order){
      if (order.side === 'buy'){
        setTimeout(function(){
          order.cancelButton.click();
        }, 100);
      }
    });
  }

  /* CANCEL OFFERS */
  function cancelOffers(){
    var orders = getOrders();
    orders.forEach(function(order){
      if (order.side === 'sell'){
        setTimeout(function(){
          order.cancelButton.click();
        }, 100);
      }
    });
  }

  /*  CANCEL LAST ORDER */
  function cancelLast(){
    var orders = getOrders();
    orders[orders.length - 1].cancelButton.click();
  }

  /*  CANCEL ALL ORDERS */
  // this uses xhr because the sites 'cancel all button' causes
  // a popup which is not desirable here
  function cancelAll(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI('/orders/cancel_all'));
    xhr.send();
  }

  /**
   *     DISPLAY THE OFFSET VALUE ON THE PAGE
   *
   * @param {Number} v - the offset value to display
   */
  function displayOffset(v){
    var homeDiv = getOffsetParentElement();
    var target = getOffsetElement();
    if(!target){
      var span = document.createElement('span');
      span.id = 'BFX_OFFSET_VALUE';
      span.innerHTML = 'Offset: ' + v;
      homeDiv.appendChild(span);
    } else {
      target.innerHTML = 'Offset: ' + v;
    }
  }

  /**    PLACE A BUY ORDER   */
  function placeBuyOrder(){
    if(!DEBUG){
      getBuyButtonElement().click();
    }
  };


  /**    PLACE A SELL ORDER   */
  function placeSellOrder(){
    if (!DEBUG){
      getSellButtonElement().click();
    }
  }

  /**
   *        SET THE BUY PRICE
   * @param {Number} p - the price to set
   */
  function setBuyPrice (p){
    getBuyPriceElement().value = p;
  }


  /**
   *        SET THE SELL PRICE
   * @param {Number} p - the price to set
   */
  function setSellPrice(p){
    getSellPriceElement().value = p;
  }


  /**
   * GET BEST BID
   * @returns {String} - the current best bid
   */
  function getBestBid (){
    var bestBid = getBestBidElement();
    return bestBid.innerHTML;
  }


  /**
   * GET BEST Offer
   * @returns {String} - the current best offer
   */
  function getBestOffer(){
    var bestAsk = getBestOfferElement();
    return bestAsk.innerHTML;
  }

  /**********************************/
  /*        Private functions       */
  /**********************************/

  /**
  *  Gets all orders currently on the page
  *  @returns {Array} - an array of the html tr elements containing the order data.
  *  @TODO strip only the critical order data from the orders.
  */
  function getOrders(){
    var orderEls = getOrderElements();
    return filterOrders(orderEls);
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
  function filterOrders(nodeList){

    var orders = [];

    for (var i = 0; i < nodeList.length; i++){
      // 0th element of this list is text - so we dont use it
      if (i != 0){

        // the string is full of whitespace - so strip it
        var thisOrderElement = nodeList[i]
        var orderData = thisOrderElement.textContent.split(' ');
        var cancelButton = thisOrderElement.childNodes[18].childNodes[0];

        // create a new array with the order data we want
        var newOrderData = [];
        for (var idx = 0; idx < orderData.length; idx++){
          if (orderData[idx] != ''){
            newOrderData.push(orderData[idx]);
          }
        }

        newOrderData.push(cancelButton);

        // Use that order data array to create an order object and push
        // it onto our array of orders.
        orders.push(new Order(newOrderData));
      }
    }
    return orders;
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
  function Order(orderData){
    this.id = orderData[0];
    this.pair = orderData[1];
    this.orderType = orderData[2];
    this.side = (isSellOrder(orderData[3])) ? 'sell' : 'buy';
    this.size = orderData[3];
    this.price = orderData[4];
    this.status = orderData[5];
    this.date = orderData[6];
    this.time = orderData[7];
    this.cancelButton = orderData[8];
  }

  function isSellOrder(order){
    return order < 0;
  }

  /**********************************************************
   *     ELEMENT ACCESSORS
   *     these functions are used to get html elements
   *     any changes to a sites css/html can be addressed here
   **********************************************************/

  function getOffsetParentElement() {
    return document.querySelector('#orders > div > ul > li > div.collapsible-header') || document.querySelector('#positions > div > ul > li > div.collapsible-header');
  }

  function getOffsetElement() {
    return document.getElementById('BFX_OFFSET_VALUE');
  }

  function getBuyButtonElement() {
    return document.getElementById('buy-button');
  }

  function getSellButtonElement() {
    return document.getElementById('sell-button');
  }

  function getBestBidElement(){
    return document.querySelector('#bids > div > table > tbody > tr:nth-child(1) > td > div > div.col.price.col-currency');
  }

  function getBestOfferElement() {
    return document.querySelector('#asks > div > table > tbody > tr:nth-child(1) > td > div > div.col.col-currency.price');
  }

  function getOrderElements() {
    return document.getElementById('orderstable').children[1].childNodes;
  }

  function getSellPriceElement() {
    return document.getElementById('sell_price');
  }

  function getBuyPriceElement() {
    return document.getElementById('buy_price');
  }

  function getLotSizeInputElement() {
    return document.getElementById('amount');
  }

  function getBuyOrderTypeElement() {
    return document.getElementById('buy_type');
  }

  function getSellOrderTypeElement() {
    return document.getElementById('sell_type');
  }
})();

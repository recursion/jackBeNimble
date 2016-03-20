var interfaces = interfaces || {};
var plugin = plugin || {};

(function(){
  interfaces.bfx = {};

  /**
   *              INIT
   *
   * set lot size and display offset
   */
  interfaces.bfx.init = function(){
    plugin.config.getSettings(function(settings){
      plugin.setLotSize(settings.lotsize);
      plugin.displayOffset(settings.offset);
    });
  };


  /*  SET LOT SIZE*/
  interfaces.bfx.setLotSize = function(v){
    plugin.config.getSettings(function(settings){
      var amount = plugin.interface.getLotSizeInputElement();
      v = v || settings.lotsize;
      amount.value = v;
      plugin.config.set({'lotsize': v});
    });
  };

  /* TOGGLE LOT SIZE */
  interfaces.bfx.toggleLotSize = function(direction){
    plugin.config.getSettings(function(settings){
      var idx = plugin.config.LOTSIZES.indexOf(settings.lotsize);

      if (direction === 'up'){
        if (++idx >= plugin.config.LOTSIZES.length){
          idx = 0;
        }
      } else if (direction === 'down'){
        if (--idx < 0){
          idx = plugin.config.LOTSIZES.length - 1;
        }
      } else {
        console.error('Unknown lot size direction: ', direction);
      }
      var lotsize = plugin.config.LOTSIZES[idx];
      plugin.setLotSize(lotsize);
    });
  };

  /*  MARKET BUY  */
  interfaces.bfx.market_buy = function(){
    getBuyOrderTypeElement().value = 'MARKET';
    plugin.placeBuyOrder();
    getBuyOrderTypeElement().value = 'LIMIT';
  };


  /*  MARKET SELL */
  interfaces.bfx.market_sell = function(){
    getSellOrderTypeElement().value = 'MARKET';
    plugin.placeSellOrder();
    getSellOrderTypeElement().value = 'LIMIT';
  };


  /* CANCEL BIDS */
  interfaces.bfx.cancel_bids = function(){
    var orders = getOrders();
    orders.forEach(function(order){
      if (order.side === 'buy'){
        setTimeout(function(){
          order.cancelButton.click();
        }, 100);
      }
    });
  };


  /* CANCEL OFFERS */
  interfaces.bfx.cancel_offers = function(){
    var orders = getOrders();
    orders.forEach(function(order){
      if (order.side === 'sell'){
        setTimeout(function(){
          order.cancelButton.click();
        }, 100);
      }
    });
  };


  /*  CANCEL LAST ORDER */
  interfaces.bfx.cancel_last = function(){
    var orders = getOrders();
    orders[orders.length - 1].cancelButton.click();
  };

  /*  CANCEL ALL ORDERS */
  // this uses xhr because the sites 'cancel all button' causes
  // a popup which is not desirable here
  interfaces.bfx.cancel_all = function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI('/orders/cancel_all'));
    xhr.send();
  };

  /**
   * return the lot size input element
   */
  interfaces.bfx.getLotSizeInputElement = getLotSizeInputElement;


  /**
   *     DISPLAY THE OFFSET VALUE ON THE PAGE
   *
   * @param {Number} v - the offset value to display
   */
  interfaces.bfx.displayOffset = function(v){
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
  };


  /**    PLACE A BUY ORDER   */
  interfaces.bfx.placeBuyOrder = function(){
    if(!DEBUG){
      //plugin.eventFire(getBuyButtonElement(), 'click');
      getBuyButtonElement().click();
    }
  };


  /**    PLACE A SELL ORDER   */
  interfaces.bfx.placeSellOrder = function(){
    if (!DEBUG){
      //plugin.eventFire(getSellButtonElement(), 'click');
      getSellButtonElement().click();
    }
  };


  /**
   *        SET THE BUY PRICE
   *
   * @param {Number} p - the price to set
   */
  interfaces.bfx.setBuyPrice = function(p){
    getBuyPriceElement().value = p;
  };


  /**
   *        SET THE SELL PRICE
   *
   * @param {Number} p - the price to set
   */
  interfaces.bfx.setSellPrice = function(p){
    getSellPriceElement().value = p;
  };


  /**     GET BEST BID    */
  interfaces.bfx.getBestBid = function(){
    var bestBid = getBestBidElement();
    return bestBid.innerHTML;
  };


  /**     GET BEST OFFER  */
  interfaces.bfx.getBestOffer = function(){
    var bestAsk = getBestOfferElement();
    return bestAsk.innerHTML;
  };


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

  /**
   *     ELEMENT ACCESSORS
   */

  // get the element where we want to attach the offset value
  // returns an html element
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

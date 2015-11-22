var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.bfx = {

  /**
   *              INIT
   *
   * set lot size and display offset
   */
  init: function(){
    plugin.setLotSize(plugin.settings.LOTSIZE);
    plugin.displayOffset(plugin.settings.OFFSET);
  },


  /*  MARKET BUY  */
  market_buy: function(){
    document.getElementById('buy_type').value = 'MARKET';
    plugin.placeBuyOrder();
    document.getElementById('buy_type').value = 'LIMIT';
  },


  /*  MARKET SELL */
  market_sell: function(){
    document.getElementById('sell_type').value = 'MARKET';
    plugin.placeSellOrder();
    document.getElementById('sell_type').value = 'LIMIT';
  },

  /*  CANCEL LAST ORDER */
  cancel_last: function(){
    console.log(getOrders());
  },

  /*  CANCEL ALL ORDERS */
  cancel_all: function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI('/orders/cancel_all'));
    xhr.send();
  },

  /**
   * return the lot size input element
   */
  getLotSizeInputElement: function(){
    return document.getElementById('amount');
  },


  /**
   *     DISPLAY THE OFFSET VALUE ON THE PAGE
   *
   * @param {Number} v - the offset value to display
   */
  displayOffset: function(v){
    var homeDiv = document.querySelector('#trading-ticket-form > div:nth-child(5) > ul > li > div.collapsible-header');

    var target = document.getElementById('BFX_OFFSET_VALUE');
    if(!target){
      var span = document.createElement('span');
      span.id = 'BFX_OFFSET_VALUE';
      span.innerHTML = 'Offset: ' + v;
      homeDiv.appendChild(span);
    } else {
      target.innerHTML = 'Offset: ' + v;
    }
  },


  /**    PLACE A BUY ORDER   */
  placeBuyOrder: function(){
    if(!DEBUG){
      plugin.eventFire(document.getElementById('buy-button'), 'click');
    }
  },


  /**    PLACE A SELL ORDER   */
  placeSellOrder: function(){
    if (!DEBUG){
      plugin.eventFire(document.getElementById('sell-button'), 'click');
    }
  },


  /**
   *        SET THE BUY PRICE
   *
   * @param {Number} p - the price to set
   */
  setBuyPrice: function(p){
    document.getElementById('buy_price').value = p;
  },


  /**
   *        SET THE SELL PRICE
   *
   * @param {Number} p - the price to set
   */
  setSellPrice: function(p){
    document.getElementById('sell_price').value = p;
  },


  /**     GET BEST BID    */
  getBestBid: function(){
    var bestBid = document.querySelector('#bids > div > table > tbody > tr:nth-child(1) > td > div > div.col.price.col-currency');
    return bestBid.innerHTML;
  },


  /**     GET BEST OFFER  */
  getBestOffer: function(){
    var bestAsk = document.querySelector('#asks > div > table > tbody > tr:nth-child(1) > td > div > div.col.col-currency.price');
    return bestAsk.innerHTML;
  }

};


/**
 *  Gets all orders currently on the page
 *  @returns {Array} - an array of the html tr elements containing the order data.
 *  @TODO strip only the critical order data from the orders.
 */
function getOrders(){
  var orderEls = document.getElementById('orderstable').children[1].childNodes;
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
      var thisOrderElement = nodeList[i].textContent.split(' ');

      // create a new array with the order data we want
      var newOrderData = [];
      for (var idx = 0; idx < thisOrderElement.length; idx++){
        if (thisOrderElement[idx] != ''){
          newOrderData.push(thisOrderElement[idx]);
        }
      }

      // Use that order data array to create an order object and push
      // it onto our array of orders.
      orders.push(new Order(newOrderData));
    }
  }
  return orders;
}




/**
 * take an array of order data, and create an order object with it
 * @param {Array} orderDataArray - an array of strings containing order data
 *    [id, pair, orderType, size, price, status, date, time]
 * @returns {Object} - an object with all of the order data in it
 *
 */
function Order(orderData){

  this.id = orderData[0];
  this.pair = orderData[1];
  this.orderType = orderData[2];
  this.size = orderData[3];
  this.price = orderData[4];
  this.status = orderData[5];
  this.date = orderData[6];
  this.time = orderData[7];
  this.side = (isSellOrder(orderData[3])) ? 'sell' : 'buy';
}

function isSellOrder(order){
  return order < 0;
}

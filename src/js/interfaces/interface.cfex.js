// Cryptofacilities
//
var interfaces = interfaces || {};
var plugin = plugin || {};

(function(){

  interfaces.cfex = {};

  /**
   *              INIT
   *
   * set lot size and display offset
   */
  interfaces.cfex.init = function(){
    plugin.config.getSettings(function(settings){
      plugin.setLotSize(settings.lotsize);
      plugin.displayOffset(settings.offset);
    });
  };

  /*  SET LOT SIZE*/
  interfaces.cfex.setLotSize = function(v){
    plugin.config.getSettings(function(settings){
      var amount = plugin.interface.getLotSizeInputElement(v);
      v = v || settings.lotsize;

      // set proper lotsize
      plugin.config.set({'lotsize': v});

      // pad with 0's
      var numLength = v.toString().length;
      switch(numLength){
        case 1:
          v = '0' + '0' + v;
          break;
        case 2:
          v = '0' + v;
          break;
        case 3:
          break;
        default:
          console.error('Lot value should only have a max of 3 characters.');
          break;
      };
      amount.value = v;
    });
  };

  /* TOGGLE LOT SIZE */
  interfaces.cfex.toggleLotSize = function(direction){
    plugin.config.getSettings(function(settings){
      var lotsize;
      if (direction === 'up'){
        lotsize = ++settings.lotsize;
      } else if (direction === 'down'){
        lotsize = --settings.lotsize;
      } else {
        console.error('Unknown lot size direction: ', direction);
      }
      plugin.setLotSize(lotsize);
    });
  };

  /*  MARKET BUY  */
  interfaces.cfex.market_buy = function(){
    document.getElementById('buy_type').value = 'MARKET';
    plugin.placeBuyOrder();
    document.getElementById('buy_type').value = 'LIMIT';
  };


  /*  MARKET SELL */
  interfaces.cfex.market_sell = function(){
    document.getElementById('sell_type').value = 'MARKET';
    plugin.placeSellOrder();
    document.getElementById('sell_type').value = 'LIMIT';
  };


  /* CANCEL BIDS */
  interfaces.cfex.cancel_bids = function(){
    var orders = getOrders();
    orders.forEach(function(order){
      if (order.side === 'buy'){
        setTimeout(function(){
          plugin.eventFire(order.cancelButton, 'click');
        }, 100);
      }
    });
  };


  /* CANCEL OFFERS */
  interfaces.cfex.cancel_offers = function(){
    var orders = getOrders();
    orders.forEach(function(order){
      if (order.side === 'sell'){
        setTimeout(function(){
          plugin.eventFire(order.cancelButton, 'click');
        }, 100);
      }
    });
  };


  /*  CANCEL LAST ORDER */
  interfaces.cfex.cancel_last = function(){
    var orders = getOrders();
    console.log(orders);
    plugin.eventFire(orders[orders.length - 1].cancelButton, 'click');

    /*
    var xhr = new XMLHttpRequest();
    var url = encodeURI('/orders/' + orders[orders.length -1].id);

    // function to fire each time `onreadystatechange` fires
    xhr.onreadystatechange = function () {
      console.log(xhr);
      console.log(xhr.readyState);
      console.log(xhr.status);
    };

    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('X-CSRF-Token', TOKEN);
    xhr.send();
    */

  };

  /*  CANCEL ALL ORDERS */
  interfaces.cfex.cancel_all = function(){
    /* For now this works, where as canceling individual orders requires the token
     * It may be wise to change this back to a button click instead of using xhr.
     */
  };

  /**
   * return the lot size input element
   */
  interfaces.cfex.getLotSizeInputElement = function(){
    return document.getElementById('qty');
  };


  /**
   *     DISPLAY THE OFFSET VALUE ON THE PAGE
   *
   * @param {Number} v - the offset value to display
   */
  interfaces.cfex.displayOffset = function(v){
    var target = document.getElementById('CFEX_OFFSET_VALUE');
    if(!target){
      var homeDiv = document.querySelector('#buySellForm > div.buy_sell.clearfix > div.col-xs-8');
      var span = document.createElement('span');
      span.id = 'CFEX_OFFSET_VALUE';
      span.innerHTML = 'Offset: ' + v;
      homeDiv.appendChild(span);
    } else {
      target.innerHTML = 'Offset: ' + v;
    }
  };


  /**    PLACE A BUY ORDER   */
  interfaces.cfex.placeBuyOrder = function(){
    if(!DEBUG){
      plugin.eventFire(document.getElementById('buy'), 'click');
    }
  };


  /**    PLACE A SELL ORDER   */
  interfaces.cfex.placeSellOrder = function(){
    if (!DEBUG){
      plugin.eventFire(document.getElementById('sell'), 'click');
    }
  };


  /**
   *        SET THE BUY PRICE
   *
   * @param {Number} p - the price to set
   */
  interfaces.cfex.setBuyPrice = function(p){
    document.getElementById('price').value = p;
  };


  /**
   *        SET THE SELL PRICE
   *
   * @param {Number} p - the price to set
   */
  interfaces.cfex.setSellPrice = function(p){
    document.getElementById('price').value = p;
  };


  /**     GET BEST BID    */
  interfaces.cfex.getBestBid = function(){
    var spreadEl = document.querySelector('#orderBookZone > div > div > table > tbody > tr.spread_cl');
    var bestBid = spreadEl.nextSibling.children[0];
    return bestBid.innerHTML;
  };


  /**     GET BEST OFFER  */
  interfaces.cfex.getBestOffer = function(){
    var spreadEl = document.querySelector('#orderBookZone > div > div > table > tbody > tr.spread_cl');
    var bestAsk = spreadEl.previousSibling.children[0];
    return bestAsk.innerHTML;
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
})();

var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.cbex = (function() {
  return {

    /**
     *              INIT
     *
     * Try to get the dom object we need,
     * if it exists, init, otherwise try again later.
     * Keep trying until we get our dom object!
     *
     * once we get our element:
     *    - set lot size
     *    - display offset
     */
    init: function(){

      if (switchToLimitOrder()){
        setTimeout(function(){
          initialize(plugin);
        }, 500);
      } else {
        setTimeout(function(){
          interfaces.cbex.init();
        }, 500);
      }

    },


    /*  MARKET BUY  */
    market_buy: function(){
      switchToMarketOrder();
      setTimeout(function(){
        setMarketOrderLotSize();
        plugin.placeBuyOrder();
      }, 100);
      setTimeout(function(){
        switchToLimitOrder();
      }, 200);
    },


    /*  MARKET SELL */
    market_sell: function(){
      switchToMarketOrder();
      setTimeout(function(){
        setMarketOrderLotSize();
        plugin.placeSellOrder();
      }, 100);
      setTimeout(function(){
        switchToLimitOrder();
      }, 200);
    },

    /* CANCEL ALL BIDS */
    cancel_bids: function(){
      var orders = getOrders();
      orders.forEach(function(order){
        if (order.side === 'buy'){
          setTimeout(function(){
            plugin.eventFire(order.cancelButton, 'click');
          }, 100);
        }
      });
    },

    /* CANCEL ALL OFFERS */
    cancel_offers: function(){
      var orders = getOrders();
      orders.forEach(function(order){
        if (order.side === 'sell'){
          setTimeout(function(){
            plugin.eventFire(order.cancelButton, 'click');
          }, 100);
        }
      });
    },

    /*  CANCEL LAST ORDER */
    cancel_last: function(){
      var orders = getOrders();
      //plugin.eventFire(getLastValidCancelButton(), 'click');
      var button = getLastValidCancelButton(orders);
      if (button){
        plugin.eventFire(button, 'click');
      }
    },


    /*  CANCEL ALL ORDERS */
    cancel_all: function(){
      var cancelButton = document.querySelector('body > div:nth-child(9) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a');
      plugin.eventFire(cancelButton, 'click');
    },


    /* return the lot size input element */
    getLotSizeInputElement: function(v){
      return document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > span > li:nth-child(1) > div > input');
    },


    /**
     *     DISPLAY THE OFFSET VALUE ON THE PAGE
     *
     *     @param {Number} v - the offset value to display
     */
    displayOffset: function(v){
      var homeDiv = document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix');
      var target = document.getElementById('CBEX_OFFSET_VALUE');
      if(!target){
        var listItem = document.createElement('li');
        listItem.style.textAlign = 'center';
        var newEl = document.createElement('span');
        newEl.id = 'CBEX_OFFSET_VALUE';
        newEl.innerHTML = 'Offset: ' + v;
        listItem.appendChild(newEl);
        homeDiv.appendChild(listItem);
      } else {
        target.innerHTML = 'Offset: ' + v;
      }

    },


    /**    PLACE A BUY ORDER   */
    placeBuyOrder: function(){
      if (!DEBUG){
        plugin.eventFire(document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > div > button.buy.balance-ok'), 'click');
        setTimeout(function(){
          plugin.setLotSize(plugin.settings.LOTSIZE);
        }, 250);
      }
    },


    /**   PLACE A SELL ORDER    */
    placeSellOrder: function(){
      if (!DEBUG){
        plugin.eventFire(document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > div > button.sell.balance-ok'), 'click');
        setTimeout(function(){
          plugin.setLotSize(plugin.settings.LOTSIZE);
        }, 250);
      }
    },


    /**
     *        SET THE BUY PRICE
     *
     * @param {Number} p - the price to set
     */
    setBuyPrice: function(p){
      document.getElementById('inputusd').value = p;
    },


    /**
     *        SET THE SELL PRICE
     *
     * @param {Number} p - the price to set
     */
    setSellPrice: function(p){
      document.getElementById('inputusd').value = p;
    },


    /**     GET BEST BID    */
    getBestBid: function(){
        var wholeNum = document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.whole');
        wholeNum = wholeNum.innerHTML;
        var decimal1 = document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.part');
        decimal1 = decimal1.innerHTML;

        var decimal2 = document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.part-2');
        decimal2 = decimal2.innerHTML;

        var bb = wholeNum + '.' + decimal1 + decimal2;
        return bb;
    },


    /**     GET BEST OFFER       */
    getBestOffer: function(){
      var wholeNum = document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.whole');
      wholeNum = wholeNum.innerHTML;
      var decimal1 = document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.part');
      decimal1 = decimal1.innerHTML;

      var decimal2 = document.querySelector('body > div:nth-child(9) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.part-2');
      decimal2 = decimal2.innerHTML;

      var bo = wholeNum + '.' + decimal1 + decimal2;
      return bo;
    }

  };

  /******************   HELPERS   ***************************/

  /**
   *        INITIALIZE
   * @param {Element} - limitButtonElement - the pages limit button
   * @param {PluginObject} - plugin - the plugin object
   */

  function initialize(plugin){
    plugin.setLotSize(plugin.settings.LOTSIZE);
    plugin.displayOffset(plugin.settings.OFFSET);
  }


  /**
   * switches the site page to the market order screen.
   */
  function switchToMarketOrder(){
      var marketButtonElement = document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(1)');
      if (marketButtonElement){
        plugin.eventFire(marketButtonElement, 'click');
        return true;
      } else {
        return false;
      }
  }

  /**
   * switches the site page to the limit order screen.
   */
  function switchToLimitOrder(){
      var limitButtonElement = document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)');
      if (limitButtonElement){
        plugin.eventFire(limitButtonElement, 'click');
        return true;
      } else {
        return false;
      }
  }

  /* set the lot size on the market order screen */
  function setMarketOrderLotSize(){
      var lotSize = document.querySelector('body > div:nth-child(9) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > li > div > input');
      lotSize.value = plugin.settings.LOTSIZE;
  };


  /**
   * gets the list of orders
   * @return {Array} - an array of order objects
   */
  function getOrders(){
    var orders = document.querySelector('#orders-list > ul').children;
    return filterOrders(orders);
  }


  /**
   * takes a list of order elements and
   * extracts the needed order info from it
   * @returns {Array} - an array of order objects
   */
  function filterOrders(orders){
    var orderList = [];
    for (var i = 0; i < orders.length; i++){
      var order = orders[i].childNodes;

      var size = order[0].innerText;
      var filled = order[1].innerText;
      var price = order[2].innerText;
      var side = (order[0].className.split(' ').indexOf('order-buy') != -1) ? 'buy' : 'sell';

      /**
       * @TODO The actual numbering here can change depenging on the size of the display
       * so we need to do some work to make this smarter and detect the proper field
       * based on something other than numbers....
       */
      var cancelButton = order[7].childNodes[1].childNodes[0];

      var thisOrderData = [size, side, filled, price, cancelButton];
      orderList.push(new Order(thisOrderData));
    }
    return orderList;
  }


  /**
   * take an array of order data, and create an order object with it
   * @param {Array} orderDataArray
   *      - an array of strings, containing order data
   *      - and an HTMLElement
   *
   *    [size, side, filled, price, cancelButton]
   *
   * @returns {Object} - an object with all of the order data in it
   *
   */
  function Order(orderData){
    this.size = orderData[0];
    this.side = orderData[1];
    this.filled = orderData[2]
    this.price = orderData[3];
    this.cancelButton = orderData[4];
  }


  /**
   * cbex cancel buttons will still show even if cancelled
   * so we must get a valid cancel button when needed
   * @param {Array} orders - an array of order object
   * @returns a usable cancel button or null;
   */
  function getLastValidCancelButton(orders){

    var index = orders.length - 1;
    var button;
    var classes;

    while (index >= 0){

      button = orders[index].cancelButton;
      classes = button.className.split(' ');

      if (classes.indexOf('visible') != -1){
        return button;
      } else {
        index--;
      }

    }
    return null;
  }
})();

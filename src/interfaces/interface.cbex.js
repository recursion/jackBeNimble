var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.cbex = {


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
    var limitButtonElement = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)');

    if (limitButtonElement){
      initialize(limitButtonElement, plugin);
    } else {
      setTimeout(function(){
        interfaces.cbex.init();
      }, 250);
    }

  },


  /*  MARKET BUY  */
  market_buy: function(){

  },


  /*  MARKET SELL */
  market_sell: function(){


  },


  /*  CANCEL ALL ORDERS */
  cancel_all: function(){
    var cancelButton = document.querySelector('body > div:nth-child(10) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a');
    plugin.eventFire(cancelButton, 'click');
  },


  /* return the lot size input element */
  getLotSizeInputElement: function(v){
    return document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > span > li:nth-child(1) > div > input');
  },


  /**
   *     DISPLAY THE OFFSET VALUE ON THE PAGE
   *
   *     @param {Number} v - the offset value to display
   */
  displayOffset: function(v){
    var homeDiv = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix');
    var target = document.getElementById('CBEX_OFFSET_VALUE');
    if(!target){
      var listItem = document.createElement('li');
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
      plugin.eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.buy.balance-ok'), 'click');
      setTimeout(function(){
        plugin.setLotSize(plugin.settings.LOTSIZE);
      }, 250);
    }
  },


  /**   PLACE A SELL ORDER    */
  placeSellOrder: function(){
    if (!DEBUG){
      plugin.eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.sell.balance-ok'), 'click');
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
      var wholeNum = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.whole');
      wholeNum = wholeNum.innerHTML;
      var decimal1 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.part');
      decimal1 = decimal1.innerHTML;

      var decimal2 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > ul.table-buy > li:nth-child(1) > div.market-price.clickable > span.part-2');
      decimal2 = decimal2.innerHTML;

      var bb = wholeNum + '.' + decimal1 + decimal2;
      return bb;
  },


  /**     GET BEST OFFER       */
  getBestOffer: function(){
    var wholeNum = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.whole');
    wholeNum = wholeNum.innerHTML;
    var decimal1 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.part');
    decimal1 = decimal1.innerHTML;

    var decimal2 = document.querySelector('body > div:nth-child(10) > section > div.ledder-view.clearfix > div.order-view.visible > div.order-view-container > div > div > div.order-view-content.visible > div > ul > li:nth-child(50) > div.market-price.clickable > span.part-2');
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

function initialize(limitButtonElement, plugin){
  plugin.eventFire(limitButtonElement, 'click');
  plugin.setLotSize(plugin.settings.LOTSIZE);
  plugin.displayOffset(plugin.settings.OFFSET);
}

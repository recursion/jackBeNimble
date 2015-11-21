var interfaces = interfaces || {};
var plugin = plugin || {};

interfaces.cbex = {

  /**
   * Try to get the dom object we need,
   * if it exists, init, otherwise try later.
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

  market_buy: function(){

  },

  market_sell: function(){


  },

  cancel_all: function(){
    var cancelButton = document.querySelector('body > div:nth-child(10) > section > div:nth-child(3) > header > div > ul.cancel-all > li > a');
    plugin.eventFire(cancelButton, 'click');
  },

  /* return the lot size input element */
  getLotSizeInputElement: function(v){
    return document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix > span.visible > span > li:nth-child(1) > div > input');
  },

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

  placeBuyOrder: function(){
    if (!DEBUG){
      plugin.eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.buy.balance-ok'), 'click');
      setTimeout(function(){
        plugin.setLotSize(plugin.settings.LOTSIZE);
      }, 250);
    }
  },

  placeSellOrder: function(){
    if (!DEBUG){
      plugin.eventFire(document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > div > button.sell.balance-ok'), 'click');
      setTimeout(function(){
        plugin.setLotSize(plugin.settings.LOTSIZE);
      }, 250);
    }
  },

  setBuyPrice: function(p){
    document.getElementById('inputusd').value = p;
  },

  setSellPrice: function(p){
    document.getElementById('inputusd').value = p;
  },

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

function initialize(limitButtonElement, plugin){
  plugin.eventFire(limitButtonElement, 'click');
  plugin.setLotSize(plugin.settings.LOTSIZE);
  plugin.displayOffset(plugin.settings.OFFSET);
}

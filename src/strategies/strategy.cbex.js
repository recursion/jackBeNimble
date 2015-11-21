var strategies = strategies || {};
var plugin = plugin || {};

strategies.cbex = {

  init: function(){
    var limitScreen = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)');

    setTimeout(function(){
      plugin.eventFire(limitScreen, 'click');
      plugin.setLotSize(plugin.settings.LOTSIZE);
      plugin.displayIncr(plugin.settings.INCR);
    }, 2000);

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

  displayIncr: function(v){
    var homeDiv = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.clearfix');
    var target = document.getElementById('CB_INCRVAL');
    if(!target){
      var listItem = document.createElement('li');
      var newEl = document.createElement('span');
      newEl.id = 'CB_INCRVAL';
      newEl.innerHTML = 'Increment: ' + v;
      listItem.appendChild(newEl);
      homeDiv.appendChild(listItem);
    } else {
      target.innerHTML = 'Increment: ' + v;
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


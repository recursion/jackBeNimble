
var LOTSIZE = .5;
var INCR = 0.1;
var smallINCR = 0.01;
var largeINCR = 1;

var KEYS = {
  INCR_BID: 68,
  INCR_OFFER: 75,
  OFFER_WITH_BEST_ASK: 76,
  BID_WITH_BEST_BID: 83,
  OFFER_ABOVE_BEST: 186,
  BID_BELOW_BEST: 65
  MARKET_BUY: 71,
  MARKET_SELL: 72
};

$( document ).ready(function(){
  window.addEventListener('keydown', onKeydown, false);
  window.addEventListener('keypress', onKeypress, false);
  window.addEventListener('keyup', onKeyup, false);
  var amount = document.getElementById('amount');
  amount.value = LOTSIZE;
});

function onKeydown(e){
  //console.log('Keypress', e);
}

function onKeypress(e){
  //console.log('Keyup', e);
}

function onKeyup(e){
  switch(e.keyCode){

    // place best limit bid order on the market
    case KEYS.INCR_BID:
      var bestBid = getBestBid();
      var newBid = +bestBid + pINCR;
      setBid(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // place bid at current best bid
    case KEYS.BID_WITH_BEST_BID:
      var bestBid = getBestBid();
      setBid(bestBid);
      placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case KEYS.BID_BELOW_BEST:
      var bestBid = getBestBid();
      var newBid = +bestBid - pINCR;
      setBid(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // place market buy
    case KEYS.MARKET_BUY:
      $('#buy_type').val('MARKET');
      placeBuyOrder();
      $('#buy_type').val('LIMIT');
      break;

    /****************************
     *   SELL ORDERS
     ********************************/

    // place the best limit sell on the market
    case KEYS.INCR_OFFER:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer - pINCR;
      setAsk(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place offer at current best ask
    case KEYS.OFFER_WITH_BEST_ASK:
      var bestOffer = getBestOffer();
      setAsk(bestOffer);
      placeSellOrder();
      break;

    // place offer at current best ask
    case KEYS.OFFER_ABOVE_BEST:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer + pINCR;
      setAsk(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place market sell
    case KEYS.MARKET_SELL:
      $('#sell_type').val('MARKET');
      placeSellOrder();
      $('#sell_type').val('LIMIT');
      break;

    // increase lot size

    // decrease lot size

    // cancel last order

    // cancel all order

    default:
      console.log('Keyup', e);
      break
  }
}

function setOrderType(){
}
/**
 * Simulate an event being fired.
 * Used for 'clicking' the buy/sell buttons.
 */
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function placeBuyOrder(){
  eventFire(document.getElementById('buy-button'), 'click');
  //$('#buy_button').click();
}
function placeSellOrder(){
  eventFire(document.getElementById('sell-button'), 'click');
  //$('#sell_button').click();
}
function setBid(p){
  if(typeof p !== 'string'){
    p = '' + p;
  }
  $('#buy_price').val(p);
}

function setAsk(p){
  if(typeof p !== 'string'){
    p = '' + p;
  }
  $('#sell_price').val(p);
}

function getBestBid(){
  var bestBid = $('#bids > div > table > tbody > tr:nth-child(1) > td > div > div.col.price.col-currency');
  return bestBid.text();
}

function getBestOffer(){
  var bestAsk = $('#asks > div > table > tbody > tr:nth-child(1) > td > div > div.col.col-currency.price');

  return bestAsk.text();
}


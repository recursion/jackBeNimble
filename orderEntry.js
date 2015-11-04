var LOTSIZES = [0.1, 0.25, 0.5, 0.75, 1];
var INCREMENTS = [0.01, 0.1, 0.25, 0.5, 0.75, 1];

var INCR = 0.1;
var LOTSIZE = .5;

var KEYS = {
  TOGGLE_LOTSIZE_UP: 220,
  TOGGLE_LOTSIZE_DOWN: 222,
  TOGGLE_INCR_UP: 189,
  TOGGLE_INCR_DOWN: 187,
  INCR_BID: 68,
  INCR_OFFER: 75,
  OFFER_WITH_BEST_ASK: 76,
  BID_WITH_BEST_BID: 83,
  OFFER_ABOVE_BEST: 186,
  BID_BELOW_BEST: 65,
  MARKET_BUY: 71,
  MARKET_SELL: 72
};

$( document ).ready(function(){
  window.addEventListener('keydown', onKeydown, false);
  window.addEventListener('keypress', onKeypress, false);
  window.addEventListener('keyup', onKeyup, false);
  setLotSize(LOTSIZE);
  displayIncr(INCR);
});

function onKeydown(e){
  //console.log('Keypress', e);
}

function onKeypress(e){
  //console.log('Keyup', e);
}

function setLotSize(v){
  v = v || LOTSIZE;
  console.log('Setting lot size to:', v);
  var amount = document.getElementById('amount');
  LOTSIZE = v;
  amount.value = v;
}

function displayIncr(v){
  var homeDiv = $('#trading-ticket-form > div:nth-child(5) > ul > li > div.collapsible-header');

  var target = $('#INCRVAL');
  if(!target.length){
    homeDiv.append('<span id="INCRVAL">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Increment: '+ v +'</span>');
  } else {
    target[0].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Increment: ' + v;
  }
}

function onKeyup(e){
  switch(e.keyCode){
    case KEYS.TOGGLE_LOTSIZE_UP:
      console.log('bing')
      var idx = LOTSIZES.indexOf(LOTSIZE);
      if (++idx >= LOTSIZES.length){
        idx = 0;
      }
      var lotsize = LOTSIZES[idx];
      setLotSize(lotsize);
      break;

    case KEYS.TOGGLE_LOTSIZE_DOWN:
      var idx = LOTSIZES.indexOf(LOTSIZE);
      if (--idx < 0){
        idx = LOTSIZES.length - 1;
      }
      var lotsize = LOTSIZES[idx];
      setLotSize(lotsize);
      break;

    case KEYS.TOGGLE_INCR_UP:
      var idx = INCREMENTS.indexOf(INCR);
      if (++idx >= INCREMENTS.length){
        idx = 0;
      }
      INCR = INCREMENTS[idx];
      displayIncr(INCR);
      console.log('Setting increment to: ', INCR);
      break;

    case KEYS.TOGGLE_INCR_DOWN:
      var idx = INCREMENTS.indexOf(INCR);
      if (--idx < 0){
        idx = INCREMENTS.length - 1;
      }
      INCR = INCREMENTS[idx];
      displayIncr(INCR);
      console.log('Setting increment to: ', INCR);
      break;

    // place best limit bid order on the market
    case KEYS.INCR_BID:
      var bestBid = getBestBid();
      var newBid = +bestBid + INCR;
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
      var newBid = +bestBid - INCR;
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
      var newOffer = +bestOffer - INCR;
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
      var newOffer = +bestOffer + INCR;
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


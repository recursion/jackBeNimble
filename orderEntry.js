var DEBUG = false;
var plugin = {};

plugin.LOTSIZES = [0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 10];
plugin.INCREMENTS = [0.01, 0.1, 0.25, 0.5, 0.75, 1, 2, 5, 10];

plugin.settings = {};
plugin.settings.INCR = 0.1;
plugin.settings.LOTSIZE = .5;

plugin.KEYS = {
  CANCEL_ALL: 89, // y
  CANCEL_LAST: 84, // t

  TOGGLE_LOTSIZE_UP: 220,
  TOGGLE_LOTSIZE_DOWN: 222,
  TOGGLE_INCR_UP: 189,
  TOGGLE_INCR_DOWN: 187,

  BID_BETTER: 70, // f
  BID_WITH_BEST_BID: 68, //d
  BID_BELOW_BEST: 83, //s
  BID_DOUBLE_BELOW_BEST: 65, // a

  OFFER_BETTER: 74, // j
  OFFER_WITH_BEST_ASK: 75, // k
  OFFER_ABOVE_BEST: 76, // l
  OFFER_DOUBLE_ABOVE_BEST: 186, // ;

  MARKET_BUY: 71, // g
  MARKET_SELL: 72 // h
};

$( document ).ready(function(){
  window.addEventListener('keydown', onKeydown, false);
  window.addEventListener('keypress', onKeypress, false);
  window.addEventListener('keyup', onKeyup, false);
  setLotSize(plugin.settings.LOTSIZE);
  displayIncr(plugin.settings.INCR);
});

/*****************************************
 *            KEYBOARD HANDLERS
 ****************************************/
function onKeydown(e){
  if(DEBUG){
    console.log('Keypress', e.keyCode);
  }
}

function onKeypress(e){
  //console.log('Keyup', e);
}

function onKeyup(e){
  switch(e.keyCode){
    /**************************************
     *            TOGGLE KEYS
     *************************************/

    // LOTSIZE UP
    case plugin.KEYS.TOGGLE_LOTSIZE_UP:
      var idx = plugin.LOTSIZES.indexOf(plugin.settings.LOTSIZE);
      if (++idx >= plugin.LOTSIZES.length){
        idx = 0;
      }
      var lotsize = plugin.LOTSIZES[idx];
      setLotSize(lotsize);
      break;

      // LOTSIZE DOWN
    case plugin.KEYS.TOGGLE_LOTSIZE_DOWN:
      var idx = plugin.LOTSIZES.indexOf(plugin.settings.LOTSIZE);
      if (--idx < 0){
        idx = plugin.LOTSIZES.length - 1;
      }
      var lotsize = plugin.LOTSIZES[idx];
      setLotSize(lotsize);
      break;

      // INCREMENT UP
    case plugin.KEYS.TOGGLE_INCR_UP:
      var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
      if (++idx >= plugin.INCREMENTS.length){
        idx = 0;
      }
      plugin.settings.INCR = plugin.INCREMENTS[idx];
      displayIncr(plugin.settings.INCR);
      break;

      // INCREMENT DOWN
    case plugin.KEYS.TOGGLE_INCR_DOWN:
      var idx = plugin.INCREMENTS.indexOf(plugin.settings.INCR);
      if (--idx < 0){
        idx = plugin.INCREMENTS.length - 1;
      }
      plugin.settings.INCR = plugin.INCREMENTS[idx];
      displayIncr(plugin.settings.INCR);
      break;



    /********************************
     *          BUY ORDER KEYS
     ********************************/
    // place best limit bid order on the market
    case plugin.KEYS.BID_BETTER:
      var bestBid = getBestBid();
      var newBid = +bestBid + 0.01;
      setBid(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // place bid at current best bid
    case plugin.KEYS.BID_WITH_BEST_BID:
      var bestBid = getBestBid();
      setBid(bestBid);
      placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_BELOW_BEST:
      var bestBid = getBestBid();
      var newBid = +bestBid - plugin.settings.INCR;
      setBid(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // Place bid at (INCR) below the current best bid
    case plugin.KEYS.BID_DOUBLE_BELOW_BEST:
      var bestBid = getBestBid();
      var newBid = +bestBid - (plugin.settings.INCR * 2);
      setBid(newBid.toFixed(2));
      placeBuyOrder();
      break;

    // place market buy
    case plugin.KEYS.MARKET_BUY:
      $('#buy_type').val('MARKET');
      placeBuyOrder();
      $('#buy_type').val('LIMIT');
      break;



    /********************************
     *           SELL ORDER KEYS
     ********************************/
    // place the best limit sell on the market
    case plugin.KEYS.OFFER_BETTER:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer - 0.01;
      setAsk(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_WITH_BEST_ASK:
      var bestOffer = getBestOffer();
      setAsk(bestOffer);
      placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_ABOVE_BEST:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer + plugin.settings.INCR;
      setAsk(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place offer at current best ask
    case plugin.KEYS.OFFER_DOUBLE_ABOVE_BEST:
      var bestOffer = getBestOffer();
      var newOffer = +bestOffer + (plugin.settings.INCR * 2);
      setAsk(newOffer.toFixed(2));
      placeSellOrder();
      break;

    // place market sell
    case plugin.KEYS.MARKET_SELL:
      $('#sell_type').val('MARKET');
      placeSellOrder();
      $('#sell_type').val('LIMIT');
      break;


    // cancel last order
    case plugin.KEYS.CANCEL_LAST:
      $('');
      break;

    // cancel all order
    case plugin.KEYS.CANCEL_ALL:
      $.ajax({
        url: '/orders/cancel_all',
        done: function(){
          console.log('Done');
        }
      });
      //eventFire(document.querySelector('#orderstable > thead > tr > th.col-info.hide-on-small-and-down.sortable.tablesorter-header.sorter-false.tablesorter-headerUnSorted > div > a'), 'click');
      //eventFire(document.getElementById('submit'), 'click');
      break;

    default:
      console.log('Key: ', e.keyCode);
      break
  }
}



/**********************************
 *             HELPERS
 **********************************/
/**
 * @param {Number} v - the new lotsize value
 */
function setLotSize(v){
  v = v || plugin.settings.LOTSIZE;
  var amount = document.getElementById('amount');
  amount.value = v;
  plugin.settings.LOTSIZE = v;
}

/**
 * @param {Number} v - the new increment value
 */
function displayIncr(v){
  var homeDiv = $('#trading-ticket-form > div:nth-child(5) > ul > li > div.collapsible-header');

  var target = $('#INCRVAL');
  if(!target.length){
    homeDiv.append('<span id="INCRVAL">Increment: '+ v +'</span>');
  } else {
    target[0].innerHTML = 'Increment: ' + v;
  }
}

function placeBuyOrder(){
  if(!DEBUG){
    eventFire(document.getElementById('buy-button'), 'click');
  }
}

function placeSellOrder(){
  if (!DEBUG){
    eventFire(document.getElementById('sell-button'), 'click');
  }
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


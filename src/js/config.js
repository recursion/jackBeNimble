/******************************************
 *          SETUP/CONFIG
 ****************************************/
var DEBUG = false;

var plugin = plugin || {};
plugin.config = {};



/************************************************/
/*                    DEFAULT VALUES            */
/************************************************/
// LOT SIZE VALUES
var LOTSIZES = plugin.config.LOTSIZES = [0.01, 0.05, 0.1, 0.2, 0.25, 0.5, 0.75, 1, 2, 2.5, 5, 10];


// OFFSET VALUES
var OFFSETS = plugin.config.OFFSETS = [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.6, 0.75, 1, 1.5,  2, 2.5,  3, 5, 10];

// Set default OFFSET
var DEFAULT_OFFSET = 0.1;

// Set default lotsize
var DEFAULT_LOTSIZE = 0.1;

var DEFAULT_KEYS = {
  CANCEL_ALL: 89, // y
  CANCEL_LAST: 84, // t
  CANCEL_BIDS: 82, // r
  CANCEL_OFFERS: 85, // u

  TOGGLE_LOTSIZE_UP: 220,
  TOGGLE_LOTSIZE_DOWN: 222,
  TOGGLE_OFFSET_UP: 189,
  TOGGLE_OFFSET_DOWN: 187,

  BID_BETTER: 70, // f
  BID_WITH_BEST_BID: 68, //d
  BID_BELOW_BEST: 83, //s
  BID_DOUBLE_BELOW_BEST: 65, // a

  OFFER_BETTER: 74, // j
  OFFER_WITH_BEST_ASK: 75, // k
  OFFER_ABOVE_BEST: 76, // l
  OFFER_DOUBLE_ABOVE_BEST: 186, // ;

  HIT_THE_BID: 72, // h
  HIT_THE_OFFER: 71, // g

  MARKET_BUY: 444, // ctrl + g
  MARKET_SELL:  555// ctrl + h
};


/************************************************/
/*           ADD DEFAULTS TO CHROME STORAGE     */
/************************************************/

chrome.storage.sync.get(['offset', 'lotsize', 'KEYS'], function(settings){
  if (!settings.offset || Object.keys(settings.offset).length === 0){
    // Default key bindings
    chrome.storage.sync.set({'offset': DEFAULT_OFFSET});
  }

  if (!settings.lotsize || Object.keys(settings.lotsize).length === 0){
    // Default key bindings
    chrome.storage.sync.set({'lotsize': DEFAULT_LOTSIZE});
  }

  if (!settings.KEYS || Object.keys(settings.KEYS).length === 0){
    // Default key bindings
    chrome.storage.sync.set({'KEYS': DEFAULT_KEYS});
  }
});

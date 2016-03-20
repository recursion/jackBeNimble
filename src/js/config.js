
/******************************************
 *          SETUP/CONFIG
 ****************************************/
var DEBUG = false;
var plugin = plugin || {};

plugin.config = (function() {


  // LOT SIZE VALUES
  var LOTSIZES = [0.01, 0.05, 0.1, 0.2, 0.25, 0.5, 0.75, 1, 2, 2.5, 5, 10];


  // OFFSET VALUES
  var OFFSETS = [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.6, 0.75, 1, 1.5,  2, 2.5,  3, 5, 10];

  /**
   * Set a config value
   * @param {value} value - An object with the key/value pair to set
   * @TODO error checking
   */
  var set = function(value){
    chrome.storage.sync.set(value);
  };

  // Handle all requests to settings storage
  // incase the way we do it changes in the future.
  var getSettings = function(cb){
    chrome.storage.sync.get(['offset', 'lotsize', 'KEYS', 'KEY_REQS'], cb);
  }

  var public_api = {
    LOTSIZES: LOTSIZES,
    OFFSETS: OFFSETS,
    set: set,
    getSettings: getSettings
  };

  loadDefaults();
  return public_api;
})();


/************************************************
*              Load Defaults                    *
*   creates default values and loads them into
*   google extention storage (if none yet exist)
************************************************/
function loadDefaults() {

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

  // The alt keys required to activate a hotkey
  // [altKeyBOOL, ctrlKeyBool, shiftKeyBool]
  var DEFAULT_KEY_REQS = {
    CANCEL_ALL: [],
    CANCEL_LAST: [],
    CANCEL_BIDS: [],
    CANCEL_OFFERS: [],

    TOGGLE_LOTSIZE_UP: [],
    TOGGLE_LOTSIZE_DOWN: [],
    TOGGLE_OFFSET_UP: [],
    TOGGLE_OFFSET_DOWN: [],

    BID_BETTER: [],
    BID_WITH_BEST_BID: [],
    BID_BELOW_BEST: [],
    BID_DOUBLE_BELOW_BEST: [],

    OFFER_BETTER: [],
    OFFER_WITH_BEST_ASK: [],
    OFFER_ABOVE_BEST: [],
    OFFER_DOUBLE_ABOVE_BEST: [],

    HIT_THE_BID: [],
    HIT_THE_OFFER: [],

    MARKET_BUY: [],
    MARKET_SELL:  []
  };

  /************************************************/
  /*           ADD DEFAULTS TO CHROME STORAGE     */
  /************************************************/
  chrome.storage.sync.get(['offset', 'lotsize', 'KEYS', 'KEY_REQS'], function(settings){

    if (!settings.offset){
      // Default key bindings
      chrome.storage.sync.set({'offset': DEFAULT_OFFSET});
    }

    if (!settings.lotsize){
      // Default key bindings
      chrome.storage.sync.set({'lotsize': DEFAULT_LOTSIZE});
    }

    if (!settings.KEYS || Object.keys(settings.KEYS).length === 0){
      // Default key bindings
      chrome.storage.sync.set({'KEYS': DEFAULT_KEYS});
    }

    if (!settings.KEY_REQS || Object.keys(settings.KEY_REQS).length === 0){
      // Default key bindings
      chrome.storage.sync.set({'KEY_REQS': DEFAULT_KEY_REQS});
    }

  });
}

/******************************************
 *          SETUP/CONFIG
 ****************************************/
var DEBUG = false;

var plugin = plugin || {};
plugin.settings = {};

// LOT SIZE VALUES
plugin.LOTSIZES = [0.01, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 10];

// INCREMENT VALUES
plugin.INCREMENTS = [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.5, 0.75, 1, 2, 5, 10];


// Set default increment
plugin.settings.INCR = 0.1;

// Set default lotsize
plugin.settings.LOTSIZE = 0.1;

// Default key bindings
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


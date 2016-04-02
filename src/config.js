const store = require('./store')

// set to true to turn off live orders
// and get a console.log message instead of an order
module.exports = {
  DEBUG: false
}

// SETUP SOME SANE DEFAULTS

// LOT SIZE VALUES
const LOTSIZES = [0.01, 0.05, 0.1, 0.2, 0.25, 0.5, 0.75, 1, 2, 2.5, 5, 10]

// OFFSET VALUES
const OFFSETS = [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.6, 0.75, 1, 1.5, 2, 2.5, 3, 5, 10]

// Set default OFFSET
const DEFAULT_OFFSET = 0.1

// Set default lotsize
const DEFAULT_LOTSIZE = 0.1

const DEFAULT_KEYS = {
  CANCEL_ALL: 89, // y
  CANCEL_LAST: 84, // t
  CANCEL_BIDS: 82, // r
  CANCEL_OFFERS: 85, // u

  TOGGLE_LOTSIZE_UP: 220,
  TOGGLE_LOTSIZE_DOWN: 222,
  TOGGLE_OFFSET_UP: 189,
  TOGGLE_OFFSET_DOWN: 187,

  BID_BETTER: 70, // f
  BID_WITH_BEST_BID: 68, // d
  BID_BELOW_BEST: 83, // s
  BID_DOUBLE_BELOW_BEST: 65, // a

  OFFER_BETTER: 74, // j
  OFFER_WITH_BEST_ASK: 75, // k
  OFFER_ABOVE_BEST: 76, // l
  OFFER_DOUBLE_ABOVE_BEST: 186,

  HIT_THE_BID: 72, // h
  HIT_THE_OFFER: 71, // g

  MARKET_BUY: 444, // ctrl + g
  MARKET_SELL: 555 // ctrl + h
}
const startingProps = [
  {LOTSIZES: LOTSIZES},
  {OFFSETS: OFFSETS},
  {offset: DEFAULT_OFFSET},
  {lotsize: DEFAULT_LOTSIZE},
  {KEYS: DEFAULT_KEYS}
]

// do some version checking here
// clean out the storage area when requested

startingProps.forEach((prop) => {
  const target = Object.keys(prop)[0]
  initSetting(target, prop[target])
})

// checks to see if a key already exists
// and adds the default value if it doesnt
function initSetting (key, value) {
  store.get((settings) => {
    // only load when the key does not already exist
    if (!settings[key]) {
      store.set(key, value)
    }
  })
}

const store = require('./store')

// SETUP SOME SANE DEFAULTS
module.exports = () => {
  // LOT SIZE VALUES
  const LOTSIZES = [0.01, 0.05, 0.1, 0.2, 0.25, 0.5, 0.75, 1, 2, 2.5, 5, 10]

  // OFFSET VALUES
  const OFFSETS = [0.0001, 0.0002, 0.00025, 0.0005, 0.001, 0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.6, 0.75, 1, 1.5, 2, 2.5, 3, 5, 10]

  // Set default OFFSET
  const DEFAULT_OFFSET = 0.1

  // Set default lotsize
  const DEFAULT_LOTSIZE = 0.1

  // ceate an object with our default settings
  const startingProps = [
    {LOTSIZES},
    {OFFSETS},
    {offset: DEFAULT_OFFSET},
    {lotsize: DEFAULT_LOTSIZE}
  ]

  // TODO: do some version checking here
  // could check the chrome.storage settings for a version# ?

  // check storage to see if these props exist
  // otherwise load em
  store.get((settings) => {
    // load our settings into the store.
    startingProps.forEach((property) => {
      const key = Object.keys(property)[0]

      if (!settings[key]) {
        store.set(key, property[key])
      }
    })
  })
}

const {logError} = require('./logger')
/* globals chrome */

/**
 * Set a config value
 * @param {string} key - a name representing the object
 * @param {any?} value - An object with the key/value pair to set
 * @param {cb} optional callback
 * -- the callback returns an object with a message and the created data object
 * @TODO error checking
 */
function set (key, value) {
  const obj = {}
  obj[key] = value

  if (chrome) {
    // check for existing value
    chrome.storage.sync.set(obj)
  }
}

function get (keyValue, cb) {
  if (typeof keyValue === 'string') {
    chrome.storage.sync.get(keyValue, cb)
  } else if (typeof keyValue === 'function') {
    chrome.storage.sync.get(null, keyValue)
  } else {
    logError('Invalid keyValue type: ', typeof keyValue)
  }
}

module.exports = {
  set,
  get
}

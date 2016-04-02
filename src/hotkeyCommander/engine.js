/** Hotkey Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('./utils')
const Store = require('./store')

let listenerEl

// public api
module.exports = {
  init: init,
  start: start,
  set: set
}

// if no listener element is provided
// then use the window object
// if no keydownHandler is provided, user our own
// keydownhandler can be a function that handles and event...
function init (listenerEl, keydownHandler) {
  set(listenerEl)
  start(keydownHandler || onKeydown)
}

function start (keydownHandler) {
  if (!listenerEl) {
    const msg = 'Must have a listener set!'
    console.error(msg)
    throw new Error(msg)
  }
  utils.addListener(listenerEl, 'keydown', keydownHandler || onKeydown)
}

function set (el) {
  if (!utils.validateEl(el)) {
    console.error('Must be initialized with the window or a DOM element')
    throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element')
  } else {
    listenerEl = el
  }
}

// this is where the magic happens
function onKeydown (evt) {
  const keymap = Store.getKeymap()
  if (keymap[evt.keyCode]) {
    console.log(keymap[evt.keyCode])
    // call the function related to this object here
  } else {
    console.log('No key mapped to ', evt.keyCode)
  }
}


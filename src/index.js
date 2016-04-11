// const keyboardHandlers = require('./keyboardHandlers')
const {log} = require('./logger')
const interfaces = require('./interfaces')
const defaultHotkeys = require('../hotkey.defaults.js')
const hotkeyCommander = require('hotkey-commander')

let domInterface = null

log('Starting jackBeNimble...')

/** ****************************************
 *      SET PLUGIN LOCATION STRATEGY
 ********************************************/
/**
 * find and set the current web location
 *
 * determines the interface module we use for interfacing
 * with the webpage DOM.
 */

// iterate through our interfaces list
for (let DInterface in interfaces) {
  if (interfaces.hasOwnProperty(DInterface)) {
    // if the current window locations contains the string of the interface objects name property
    if (window.location.hostname.indexOf(interfaces[DInterface].name) !== -1) {
      domInterface = interfaces[DInterface]
    }
  }
}

// make sure we got an interface
if (!domInterface) {
  throw new Error('Unable to set domInterface')
}

// load up the plugins methods
const actions = require('./utils')(domInterface)

// create a keyboard handler
// TODO:
// change to keyboard commander

// const kbc = keyboardHandlers(utils)
hotkeyCommander.Commander({hotkeys: defaultHotkeys, listenerEl: window})
  .then((emitter) => {
    require('./keyboardHandlers')(emitter, actions)
    // hand the emitter off to our keyboard event handlers
    // so it can setup the event handlers
  })

 /**
 * Initialize the interface
 * - sets default lotsize
 * - add the default offset value to the display
 */
domInterface.init()

log('jackBeNimble started.')

const keyboardHandlers = require('./keyboardHandlers')
const {log} = require('./logger')
const interfaces = require('./interfaces')

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
const utils = require('./utils')(domInterface)

// create a keyboard handler
// TODO:
// change to keyboard commander
const kbc = keyboardHandlers(utils)

 /**
 * Initialize the interface
 * - sets default lotsize
 * - add the default offset value to the display
 */
domInterface.init()

/** ****************************************
 * - setup keyboard event listeners
 ****************************************/
window.addEventListener('keydown', kbc.onKeydown, false)
window.addEventListener('keypress', kbc.onKeypress, false)
window.addEventListener('keyup', kbc.onKeyup, false)

log('jackBeNimble started.')

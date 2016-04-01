const config = require('./config')
const keyboardHandlers = require('./keyboardHandlers')

const interfaces = require('./interfaces')

let domInterface = null

/** ****************************************
 * - setup keyboard event listeners
 ****************************************/
/*
    HOTKEY SETUP HERE

*/

/** ****************************************
 *      SET PLUGIN LOCATION STRATEGY
 ********************************************/
/**
 * find and set the current web location
 *
 * determines the interface module we use for interfacing
 * with the webpage DOM.
 */

// iterate through our interfaces
for (let DInterface in interfaces) {
  if (interfaces.hasOwnProperty(DInterface)) {
    // if the current window locations contains the string of the interface objects name property
    if (window.location.hostname.indexOf(interfaces[DInterface].name) !== -1) {
      domInterface = interfaces[DInterface]
      console.log('Set interface to: ', domInterface)
    }
  }
}

// make sure we got an interface
if (!domInterface) {
  const msg = 'Unable to set domInterface'
  console.error(msg)
  throw new Error(msg)
}

 /**
 * Initialize the interface
 * - sets default lotsize
 * - add the default offset value to the display
 */

const utils = require('./utils')(domInterface)
const kbc = keyboardHandlers(utils)
console.log(utils, domInterface)
domInterface.init()

window.addEventListener('keydown', kbc.onKeydown, false);
window.addEventListener('keypress', kbc.onKeypress, false);
window.addEventListener('keyup', kbc.onKeyup, false);

const config = require('./config')
const keyboardHandlers = require('./keyboardHandlers')

const interfaces = require('./interfaces')

let domInterface = null

/** ****************************************
 * - setup keyboard event listeners
 ****************************************/
/*
    HOTKEY SETUP HERE

window.addEventListener('keydown', plugin.keyboardHandlers.onKeydown, false);
window.addEventListener('keypress', plugin.keyboardHandlers.onKeypress, false);
window.addEventListener('keyup', plugin.keyboardHandlers.onKeyup, false);
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
console.log(utils, domInterface)
domInterface.init()


// const keyboardHandlers = require('./keyboardHandlers')
const hotkeyCommander = require('hotkey-commander')
const {log} = require('./utils/logger')
const interfaces = require('./interfaces')
const defaultHotkeys = require('../hotkey.defaults.js')

let domInterface = null

log('Starting jackBeNimble...')

require('./utils/loadSettings')()

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

// the controller holds all the methods that can be called on an interface (which is what iteracts with an exchanges trading page)
const controller = require('./controller')(domInterface)

// hotkey commander maps all of our hotkey actions to the users hotkey settings
// and allows the user to change those settings
hotkeyCommander.Commander({hotkeys: defaultHotkeys, listenerEl: window})
  .then((emitter) => {
    // pass commanders emitter and the controller objects to our keyboardHandlers
    require('./utils/keyboardHandlers')(emitter, controller)
  })

domInterface.init()

log('jackBeNimble started.')

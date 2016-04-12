const hotkeys = require('../hotkey.defaults.js')
const hotkeyCommander = require('hotkey-commander')

hotkeyCommander.Configurator({hotkeys: hotkeys, targetEl: document.getElementById('hotkeyCommander')})

setTimeout(() => {
  window.scrollTo(0, 0)
}, 250)

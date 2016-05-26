const hotkeys = require('../hotkey.defaults.js')
const hotkeyCommander = require('hotkey-commander')

hotkeyCommander.Configurator({hotkeys: hotkeys, displayToggle: true, targetEl: document.getElementById('hotkeyCommander')})

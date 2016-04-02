const configurator = require('./configurator')
const engine = require('./engine')

// two ways to start the module:
//   1) call init with the proper parameters (this assumes 1 context)
//   2) initialized engine and configurator seperately

module.exports = {
  init: init,
  startEngine: startEngine,
  startConfigurator: startConfigurator
}

// if only 1 element is passed in,
// we can assume that its ok to
// do everything in one context?
function init (configContainerEl, configListener, engineListener) {
  configurator.init(configContainerEl, configListener || window)
  engine.init(engineListener || window)
}

function startEngine (listenerEl) {
  engine.init(listenerEl)
}

function startConfigurator (containerEl, listenerEl) {
  configurator.init(containerEl, listenerEl)
}

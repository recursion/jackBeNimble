var plugin = plugin || {};
var keyboardHandlers = keyboardHandlers || {};
var strategies = strategies || {};

/******************************************
 *          INIT
 *
 * - gives the page time to load data
 * - adds our keyboard event listeners
 * - sets a default lotsize
 * - adds the increment value to the display
 *
 ****************************************/
setTimeout(function(){
  window.addEventListener('keydown', keyboardHandlers.onKeydown, false);
  window.addEventListener('keypress', keyboardHandlers.onKeypress, false);
  window.addEventListener('keyup', keyboardHandlers.onKeyup, false);

  setTimeout(function(){
    setStrategy();
    plugin.strategy.init();
  }, 1000);

}, 2000);

/**
 *          HELPERS
 */

/**
 * find and set the current web location
 * @returns {String} - name of current website
 */
function setStrategy(){
  if (window.location.hostname.indexOf('coinbase') !== -1){
    plugin.strategy = strategies.cbex;
  } else if (window.location.hostname.indexOf('bitfinex') !== -1){
    plugin.strategy = strategies.bfx;
  } else {
    plugin.strategy = 'unknown';
  }
}

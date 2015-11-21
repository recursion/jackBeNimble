var plugin = plugin || {};
var keyboardHandlers = keyboardHandlers || {};
var utils = utils || {};

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
    if (utils.currentLocation() === 'coinbase'){
      var limitScreen = document.querySelector('body > div:nth-child(10) > aside > div > div.article-wrap.visible > form > article > div > ul.trade-type-tab-list > li:nth-child(2)');
      utils.eventFire(limitScreen, 'click');
    }
    utils.setLotSize(plugin.settings.LOTSIZE);
    utils.displayIncr(plugin.settings.INCR);
  }, 1000);

}, 2000);

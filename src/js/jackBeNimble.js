var plugin = plugin || {};
var keyboardHandlers = keyboardHandlers || {};

/******************************************
 *          INIT
 *
 * - setup keyboard event listeners
 * - sets default lotsize
 * - add the default offset value to the display
 *
 ****************************************/
window.addEventListener('keydown', keyboardHandlers.onKeydown, false);
window.addEventListener('keypress', keyboardHandlers.onKeypress, false);
window.addEventListener('keyup', keyboardHandlers.onKeyup, false);

/**
 * Determine the exchange interface module to use and initialize it
 */
plugin.setInterface();
plugin.interface.init();

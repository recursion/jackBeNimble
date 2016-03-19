var plugin = plugin || {};

(function() {
  /******************************************
   *          INIT
   *
   * - setup keyboard event listeners
   * - sets default lotsize
   * - add the default offset value to the display
   *
   ****************************************/
    window.addEventListener('keydown', plugin.keyboardHandlers.onKeydown, false);
    window.addEventListener('keypress', plugin.keyboardHandlers.onKeypress, false);
    window.addEventListener('keyup', plugin.keyboardHandlers.onKeyup, false);

    /**
     * Determine the exchange interface module to use and initialize it
     */
    plugin.setInterface();
    plugin.interface.init();

})();

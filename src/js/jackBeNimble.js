var plugin = plugin || {};

(function() {

    /******************************************
     * - setup keyboard event listeners
     ****************************************/
    window.addEventListener('keydown', plugin.keyboardHandlers.onKeydown, false);
    window.addEventListener('keypress', plugin.keyboardHandlers.onKeypress, false);
    window.addEventListener('keyup', plugin.keyboardHandlers.onKeyup, false);

    /**
     * Determine the exchange interface module to use
     */
    plugin.setInterface();

    /**
     * Initialize the interface
     * - sets default lotsize
     * - add the default offset value to the display
     */
    plugin.interface.init();

})();

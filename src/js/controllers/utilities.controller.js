var plugin = plugin || {};
var interfaces = interfaces || {};

(function() {
  /********************************************
   *      SET PLUGIN LOCATION STRATEGY
   ********************************************/
  /**
   * find and set the current web location
   *
   * determines the interface module we use for interfacing
   * with the webpage DOM.
   */
  plugin.setInterface = function(){
    if (window.location.hostname.indexOf('coinbase') !== -1){
      plugin.interface = interfaces.cbex;
    } else if (window.location.hostname.indexOf('bitfinex') !== -1){
      plugin.interface = interfaces.bfx;
    } else if (window.location.hostname.indexOf('cryptofacilities') !== -1){
      plugin.interface = interfaces.cfex;
    } else {
      plugin.interface = 'unknown';
    }
  }


  /********************************************
   *          OFFSET FUNCTIONS
   ********************************************/

  /**
   * @param {Number} v - the new offset value
   */
  plugin.displayOffset = function(v){
    plugin.interface.displayOffset(v);
  }

  /**
   *      Toggle the offset value up or down
   *
   * @param {String} direction - can be 'up' or 'down'
   * determines which way to toggle the offset
   */
  plugin.toggleOffset = function(direction){
    plugin.config.getSettings(function(settings){
      var idx = plugin.config.OFFSETS.indexOf(settings.offset);

      if (direction === 'up'){
        if (++idx >= plugin.config.OFFSETS.length){
          idx = 0;
        }
      } else if (direction === 'down'){
        if (--idx < 0){
          idx = plugin.config.OFFSETS.length - 1;
        }
      } else {
        console.error('Unknown toggle offset direction: ', direction);
      }

      plugin.config.set({'offset': plugin.config.OFFSETS[idx]});
      plugin.displayOffset(plugin.config.OFFSETS[idx]);

    });
  }

  /********************************************
   *            LOT SIZE FUNCTIONS
   ********************************************/

  /**
   *  SET LOT SIZE
   *  @param {Number} v - the lotsize value
   */
  plugin.setLotSize = function(v){
    plugin.config.getSettings(function(settings){
      var amount = plugin.interface.getLotSizeInputElement();
      v = v || settings.lotsize;
      amount.value = v;
      plugin.config.set({'lotsize': v});
    });
  }

  /**
   * TOGGLE LOT SIZE
   * @param {String} direction - the direction to toggle our lotsize (up or down)
   **/
  plugin.toggleLotSize = function (direction){
    plugin.config.getSettings(function(settings){
      var idx = plugin.config.LOTSIZES.indexOf(settings.lotsize);

      if (direction === 'up'){
        if (++idx >= plugin.config.LOTSIZES.length){
          idx = 0;
        }
      } else if (direction === 'down'){
        if (--idx < 0){
          idx = plugin.config.LOTSIZES.length - 1;
        }
      } else {
        console.error('Unknown lot size direction: ', direction);
      }
      var lotsize = plugin.config.LOTSIZES[idx];
      plugin.setLotSize(lotsize);
    });
  }

  /****************************************
   *            CANCEL
   ***************************************/
  plugin.cancelAll = function(){
    plugin.interface.cancelAll();
  };

  plugin.cancelLast = function(){
    plugin.interface.cancelLast();
  };

  plugin.cancelBids = function(){
    plugin.interface.cancelBids();
  };

  plugin.cancelOffers = function(){
    plugin.interface.cancelOffers();
  };


  /****************************************
   *      GET BEST BID / BEST OFFER
   ***************************************/
  plugin.getBestBid = function(){
    return plugin.interface.getBestBid();
  };

  plugin.getBestOffer = function(){
    return plugin.interface.getBestOffer();
  };



})();

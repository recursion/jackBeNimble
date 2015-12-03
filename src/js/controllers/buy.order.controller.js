var plugin = plugin || {};

/*******************************************
 *              INTERFACE CALLS
 ******************************************/
plugin.setBuyPrice = function(p){
  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }
  plugin.interface.setBuyPrice(p);
}

plugin.placeBuyOrder = function(){
  plugin.interface.placeBuyOrder();
}



/*******************************************
 *             ACTIONS
 ******************************************/
/* Bid just above the best bid */
plugin.bidBetter = function() {
  var bestBid = plugin.getBestBid();
  var newBid = +bestBid + 0.01;
  plugin.setBuyPrice(newBid.toFixed(2));
  plugin.placeBuyOrder();
}

/* bid with the best current bid */
plugin.bidWithBest = function() {
  var bestBid = plugin.getBestBid();
  plugin.setBuyPrice(bestBid);
  plugin.placeBuyOrder();
}

/* bid 1 offset level below the best bid */
plugin.bidBelowBest = function(){
  plugin.config.getSettings(function(settings){
    var bestBid = plugin.getBestBid();
    var newBid = +bestBid - settings.offset;
    plugin.setBuyPrice(newBid.toFixed(2));
    plugin.placeBuyOrder();
  });
}

/* bid 2 offset levels below best bid */
plugin.bidDoubleBelowBest = function(){
  plugin.config.getSettings(function(settings){
    var bestBid = plugin.getBestBid();
    var newBid = +bestBid - (settings.offset * 2);
    plugin.setBuyPrice(newBid.toFixed(2));
    plugin.placeBuyOrder();
  });
}


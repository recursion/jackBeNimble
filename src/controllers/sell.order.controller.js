var plugin = plugin || {};

plugin.placeSellOrder = function(){
  plugin.strategy.placeSellOrder();
}
/* Offer just below best offer */
plugin.offerBetter = function(){
  var bestOffer = plugin.getBestOffer();
  var newOffer = +bestOffer - 0.01;
  plugin.setSellPrice(newOffer.toFixed(2));
  plugin.placeSellOrder();
}

/* Offer with the best current offer */
plugin.offerWithBest = function(){
  var bestOffer = plugin.getBestOffer();
  plugin.setSellPrice(bestOffer);
  plugin.placeSellOrder();
}

/* Offer 1 offset level above the best offer */
plugin.offerAboveBest = function(){
  var bestOffer = plugin.getBestOffer();
  var newOffer = +bestOffer + plugin.settings.OFFSET;
  plugin.setSellPrice(newOffer.toFixed(2));
  plugin.placeSellOrder();
}

/* Offer 2 offset levels above the best offer */
plugin.offerDoubleAboveBest = function() {
  var bestOffer = plugin.getBestOffer();
  var newOffer = +bestOffer + (plugin.settings.OFFSET * 2);
  plugin.setSellPrice(newOffer.toFixed(2));
  plugin.placeSellOrder();
}

plugin.setSellPrice = function(p){
  // make sure the bid is in a string format
  if(typeof p !== 'string'){
    p = '' + p;
  }
  plugin.strategy.setSellPrice(p);
}

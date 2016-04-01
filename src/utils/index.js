const utils = {}
const buyOrderController = require('./buyOrder.controller.js')
const sellOrderController = require('./sellOrder.controller.js')
const utilsController = require('./utils.controller.js')

// add the interfaces to our array
// TODO: as more dynamic method for this
// so that as we add interfaces, we dont have
// to add lines for each one here
// the obvious solution of using requireDirectory is not
// as easy at it might seem here (because of webpack)

// export the array of utils
// the active domInterface obect must be passed in
module.exports = (domInterface) => {
  // Assign each part of our utils package on to one object
  Object.assign(utils, buyOrderController(domInterface))

  Object.assign(utils, sellOrderController(domInterface))

  Object.assign(utils, utilsController(domInterface))

  // return that object
  return utils
}

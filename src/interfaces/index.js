const interfaces = []

// add the interfaces to our array
// TODO: as more dynamic method for this
// so that as we add interfaces, we dont have
// to add lines for each one here
// the obvious solution of using requireDirectory is not
// as easy at it might seem here (because of webpack)
interfaces.push(require('./interface.bfx.js')())
interfaces.push(require('./interface.gdax.js')())

// export the array of interfaces
module.exports = interfaces

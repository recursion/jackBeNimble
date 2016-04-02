module.exports = {
  log,
  logError,
  toJSON
}

function log (...args) {
  const dateString = `[${new Date(Date.now())}] - `
  args.unshift(dateString)
  console.log.apply(console, args)
}

function toJSON (obj, formattingON = true) {
  if (formattingON) {
    return JSON.stringify(obj, null, 4)
  } else {
    return JSON.stringify(obj)
  }
}

function logError (...args) {
  console.error.apply(console, args)
}

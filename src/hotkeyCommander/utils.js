// Common modules

const utils = exports

utils.addListener = (listenerEl, listenerType, cb) => {
  listenerEl = listenerEl || window
  listenerEl.addEventListener(listenerType, cb)
}

utils.stripUnderscores = (string) => {
  if (!string || typeof string !== 'string') {
    console.error('stripUnderscores requires a string')
    return ''
  }
  return string.replace('_', ' ')
}

// turn a snake case string into a camelCase string
utils.snakeCaseToCamelCase = (string) => {
  string = utils.stripUnderscores(string)
  string = string.split(' ')
  const result = string.map(function (word, index) {
    // uppercase the first character of each word
    // except the first word
    if (index !== 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    } else {
      return word.toLowerCase()
    }
  })
  return result.join('')
}

/* globals Window Element */
// validate that a object is an Element or Window
utils.validateEl = (el) => {
  if (!el instanceof Window || !el instanceof Element) {
    return false
  } else {
    return true
  }
}

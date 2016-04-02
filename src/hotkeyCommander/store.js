const defaultHotkeys = require('./defaultHotkeys')

// module level  variables
// this is where we keeps the important stuff in memory...
const keyDictionary = loadHotkeys()
let keymap = generateKeymap(keyDictionary)

// export the hotkeyStore object
const hotkeyStore = module.exports = {}

hotkeyStore.getKeymap = () => {
  return keymap
}

hotkeyStore.getAll = () => {
  return keyDictionary
}

hotkeyStore.findKeyByKeycode = findKeyByKeycode

hotkeyStore.set = (key, value) => {
  // validations?
  // TODO: find out if another key is using this code
  const dictKey = findKeyByKeycode(key)
  if (!dictKey) {
    console.error('Could not find keycode with key: ', key)
  } else {
    keyDictionary[dictKey].keyCode = value

    // anytime we change the dictionary we
    // want to generate a new keymap
    keymap = generateKeymap(keyDictionary)
  }
}

/**
 * searches through the keyDictionary and
 * attempts to find the keycode in the keydictionary
 * @returns Key:String or null
*/
function findKeyByKeycode (keycode) {
  for (const key in keyDictionary) {
    if (+keyDictionary[key].keyCode === +keycode) {
      return key
    }
  }
  return null
}

// generate an object with keyCode keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this should fire anytime the hotkey storage dictionary changes
function generateKeymap (keyDictionary) {
  const hotkeys = keyDictionary
  const result = {}

  for (const hotkey in hotkeys) {
    if (hotkeys.hasOwnProperty(hotkey)) {
      // build new hotkey dictionary here
      const thisKey = hotkeys[hotkey]
      result[thisKey.keyCode] = {
        name: hotkey,
        ctrlKey: hotkeys[hotkey].ctrlKey,
        altKey: hotkeys[hotkey].altKey,
        shiftKey: hotkeys[hotkey].shiftKey
      }
    }
  }
  return result
}

// TODO:
// load an existing dictionary of hotkeys
// otherwise load defaults
function loadHotkeys () {
  return defaultHotkeys
}

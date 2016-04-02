(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hotkeyCommander"] = factory();
	else
		root["hotkeyCommander"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var configurator = __webpack_require__(1);
	var engine = __webpack_require__(5);

	// two ways to start the module:
	//   1) call init with the proper parameters (this assumes 1 context)
	//   2) initialized engine and configurator seperately

	module.exports = {
	  init: init,
	  startEngine: startEngine,
	  startConfigurator: startConfigurator
	};

	// if only 1 element is passed in,
	// we can assume that its ok to
	// do everything in one context?
	function init(configContainerEl, configListener, engineListener) {
	  configurator.init(configContainerEl, configListener || window);
	  engine.init(engineListener || window);
	}

	function startEngine(listenerEl) {
	  engine.init(listenerEl);
	}

	function startConfigurator(containerEl, listenerEl) {
	  configurator.init(containerEl, listenerEl);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// this module:
	// renders hotkey configuration
	// handles recording new hotkeys
	var utils = __webpack_require__(2);
	var Store = __webpack_require__(3);

	var recording = false;
	var containerElement = null;

	// css selectors used for populating templates
	// and applying/removing styles
	var recordingStyle = 'recording';
	var setButtonSelector = '.set-key-button';
	var labelSelector = '.hotkey-config.key-setting';
	var functionLabelSelector = '.hotkey-config.key-function';

	// public api
	module.exports = {
	  init: init
	};

	// load configuration templates
	// takes an element to load the template to
	function init(containerEl, listenerEl) {
	  if (!utils.validateEl(containerEl)) {
	    console.error('Configurators first argument must be a valid DOM element');
	    throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element');
	  }
	  if (!utils.validateEl(listenerEl)) {
	    console.error('Configurators second argument must be a valid DOM element or the window object');
	    throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element or the window object.');
	  }

	  containerElement = containerEl;

	  utils.addListener(listenerEl || window, 'keydown', onKeydown);

	  render(Store.getKeymap(), containerEl);
	}

	// render the hotkeys to their dom element
	// clears the element first if clearElement is true
	function render(hotkeys, el) {
	  var clearElement = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	  var templates = document.getElementById('hotkeyTemplate').import;
	  var template = templates.getElementById('hotkey-setting');

	  if (clearElement) {
	    containerElement.innerHTML = '';
	  }

	  // load hotkeys into the template
	  // and write it to the page.

	  var _loop = function _loop(i) {
	    var clone = document.importNode(template.content, true);

	    clone.querySelector(setButtonSelector).addEventListener('click', function (evt) {
	      if (!recording) {
	        // add highlighting to bg for this element
	        var target = this.parentElement.children;
	        for (var _i = 0; _i < target.length; _i++) {
	          var child = target[_i];
	          if (child.className.indexOf('key-setting') !== -1) {
	            child.className += ' ' + recordingStyle;
	          }
	        }

	        // set recording to the key we are recording
	        recording = i;
	      }
	    });

	    clone.querySelector(functionLabelSelector).innerText = utils.stripUnderscores(hotkeys[i].name);
	    clone.querySelector(labelSelector).innerText = String.fromCharCode(i);
	    el.appendChild(clone);
	  };

	  for (var i in hotkeys) {
	    _loop(i);
	  }
	}

	function onKeydown(evt) {
	  // already recording - this is the new key
	  if (recording) {
	    // TODO: validate that the key is not already in use.

	    Store.set(recording, evt.keyCode);
	    render(Store.getKeymap(), containerElement, true);

	    // remove bg highlighting
	    var keys = document.getElementsByClassName('hotkeyConfig');
	    for (var key in keys) {
	      if (keys.hasOwnProperty(key)) {
	        var targetEl = keys[key];
	        removeStyle(targetEl, recordingStyle);
	      }
	    }
	    recording = false;
	  }
	}

	function removeStyle(el, style) {
	  var styleList = el.className.split(' ');
	  console.log(styleList);
	  var targetIndex = styleList.indexOf(style);
	  if (targetIndex !== -1) {
	    // remove the target style
	    styleList = styleList.splice(targetIndex, 1);
	    return styleList;
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// Common modules

	var utils = exports;

	utils.addListener = function (listenerEl, listenerType, cb) {
	  listenerEl = listenerEl || window;
	  listenerEl.addEventListener(listenerType, cb);
	};

	utils.stripUnderscores = function (string) {
	  if (!string || typeof string !== 'string') {
	    console.error('stripUnderscores requires a string');
	    return '';
	  }
	  return string.replace('_', ' ');
	};

	// turn a snake case string into a camelCase string
	utils.snakeCaseToCamelCase = function (string) {
	  string = utils.stripUnderscores(string);
	  string = string.split(' ');
	  var result = string.map(function (word, index) {
	    // uppercase the first character of each word
	    // except the first word
	    if (index !== 0) {
	      return word[0].toUpperCase() + word.slice(1).toLowerCase();
	    } else {
	      return word.toLowerCase();
	    }
	  });
	  return result.join('');
	};

	/* globals Window Element */
	// validate that a object is an Element or Window
	utils.validateEl = function (el) {
	  if (!el instanceof Window || !el instanceof Element) {
	    return false;
	  } else {
	    return true;
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaultHotkeys = __webpack_require__(4);

	var keyDictionary = loadHotkeys();
	var keymap = generateKeymap(keyDictionary);

	var hotkeyStore = module.exports = {};

	hotkeyStore.getKeymap = function () {
	  return keymap;
	};

	hotkeyStore.getAll = function () {
	  return keyDictionary;
	};

	hotkeyStore.findKeyByKeycode = findKeyByKeycode;

	hotkeyStore.set = function (key, value) {
	  // validations?
	  // TODO: find out if another key is using this code
	  var dictKey = findKeyByKeycode(key);
	  if (!dictKey) {
	    console.error('Could not find keycode with key: ', key);
	  } else {
	    keyDictionary[dictKey].keyCode = value;

	    // anytime we change the dictionary we
	    // want to generate a new keymap
	    keymap = generateKeymap(keyDictionary);
	  }
	};

	/**
	 * searches through the keyDictionary and
	 * attempts to find the keycode in the keydictionary
	 * @returns Key:String or null
	*/
	function findKeyByKeycode(keycode) {
	  for (var key in keyDictionary) {
	    if (+keyDictionary[key].keyCode === +keycode) {
	      return key;
	    }
	  }
	  return null;
	}

	// generate an object with keyCode keys
	// so that the hotkeys can be accessed by their keycode
	// instead of by their name
	// this should fire anytime the hotkey storage dictionary changes
	function generateKeymap(keyDictionary) {
	  var hotkeys = keyDictionary;
	  var result = {};

	  for (var hotkey in hotkeys) {
	    if (hotkeys.hasOwnProperty(hotkey)) {
	      // build new hotkey dictionary here
	      var thisKey = hotkeys[hotkey];
	      result[thisKey.keyCode] = {
	        name: hotkey,
	        ctrlKey: hotkeys[hotkey].ctrlKey,
	        altKey: hotkeys[hotkey].altKey,
	        shiftKey: hotkeys[hotkey].shiftKey
	      };
	    }
	  }
	  return result;
	}

	// TODO:
	// load an existing dictionary of hotkeys
	// otherwise load defaults
	function loadHotkeys() {
	  return defaultHotkeys;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	// Define hotkeys here
	/*  ALL hotkeys must follow this pattern
	 *
	 *  HOTKEY_NAME: {
	 *     name: 'HOTKEY_NAME',
	 *     keyCode: 89,
	 *     ctrlKey: false,
	 *     shiftKey: false,
	 *     altKey: false
	 *  }
	*/

	module.exports = {
	  CANCEL_ALL: {
	    keyCode: 89,
	    ctrlKey: false,
	    shiftKey: false,
	    altKey: false
	  },
	  CANCEL_LAST: {
	    keyCode: 84,
	    ctrlKey: false,
	    shiftKey: false,
	    altKey: false
	  },
	  CANCEL_BIDS: {
	    keyCode: 82,
	    ctrlKey: false,
	    shiftKey: false,
	    altKey: false
	  },
	  CANCEL_OFFERS: {
	    keyCode: 85,
	    ctrlKey: false,
	    shiftKey: false,
	    altKey: false
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** Hotkey Engine Module
	 *
	 * This module exports an engine for responding to keystrokes
	 * Provide the element to listen on
	 */

	var utils = __webpack_require__(2);
	var Store = __webpack_require__(3);

	var listenerEl = void 0;

	// public api
	module.exports = {
	  init: init,
	  start: start,
	  set: set
	};

	// if no listener element is provided
	// then use the window object
	// if no keydownHandler is provided, user our own
	// keydownhandler can be a function that handles and event...
	function init(listenerEl, keydownHandler) {
	  set(listenerEl);
	  start(keydownHandler || onKeydown);
	}

	function start(keydownHandler) {
	  if (!listenerEl) {
	    var msg = 'Must have a listener set!';
	    console.error(msg);
	    throw new Error(msg);
	  }
	  utils.addListener(listenerEl, 'keydown', keydownHandler || onKeydown);
	}

	function set(el) {
	  if (!utils.validateEl(el)) {
	    console.error('Must be initialized with the window or a DOM element');
	    throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element');
	  } else {
	    listenerEl = el;
	  }
	}

	// this is where the magic happens
	function onKeydown(evt) {
	  var keymap = Store.getKeymap();
	  if (keymap[evt.keyCode]) {
	    console.log(keymap[evt.keyCode]);
	    // call the function related to this object here
	  } else {
	      console.log('No key mapped to ', evt.keyCode);
	    }
	}

/***/ }
/******/ ])
});
;
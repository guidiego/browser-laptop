/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// hacky require so we can use the same code as the browser
var immutable_ = typeof Immutable !== 'undefined' ? Immutable : null
function require(module_name) {
  switch (module_name) {
    case 'immutable':
      return immutable_;
      break
    case 'url':
      return {
        parse: (location) => {
          let parser = document.createElement('a');
          parser.href = location
          return parser
        }
      }
      break
  }
}

/**
 * Executes a script in the page DOM context
 *
 * @param {string} text The content of the script to insert
 * @param {Object=} data attributes to set in the inserted script tag
 */
function insertScript (text, data) {
  var parent = document.documentElement
  var script = document.createElement('script')

  script.text = text
  script.async = false

  if (data) {
    for (var key in data) {
      script.setAttribute('data-' + key.replace('_', '-'), data[key])
    }
  }

  parent.insertBefore(script, parent.firstChild)
  parent.removeChild(script)
}

/**
 * Whether an element is editable or can be typed into.
 * @param {Element} elem
 * @return {boolean}
 */
function isEditable (elem) {
  // TODO: find other node types that are editable
  return ((elem.contentEditable && elem.contentEditable !== 'false' && elem.contentEditable !== 'inherit') ||
          elem.nodeName === 'INPUT' ||
          elem.nodeName === 'TEXTAREA')
}

/**
 * Whether we are on OS X
 * @return {boolean}
 */
function isPlatformOSX () {
  // TODO: navigator.platform is getting deprecated
  return window.navigator.platform.includes('Mac')
}

function hasWhitespace (text) {
  return /\s/g.test(text);
}

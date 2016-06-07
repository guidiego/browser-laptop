/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var Immutable = require('immutable')
var { getSiteSettingsForURL } = require('../../app/extensions/brave/js/state/getSiteSettings')
/**
  * Obtains the site settings stored for a specific pattern.
  * @param {Object} siteSettings - The top level app state site settings indexed by hostPattern.
  * @param {string} hostPattern - The host pattern to lookup.
  *   Supported hostPattern values are of the form: protocol|(https[?])://[*.]<hostname>[:*]
  * @return {Object} The exact setting object for the specified host pattern or undefined.
  */
module.exports.getSiteSettingsForHostPattern = (siteSettings, hostPattern) =>
  siteSettings.get(hostPattern)

/**
  * Merges the settings for the specified host pattern.
  * @param {Object} siteSettings - The top level app state site settings indexed by hostPattern.
  * @param {string} hostPattern - The host pattern to merge into
  * @param {string} key - A setting key
  * @param {string|number} value - A setting value
  */
module.exports.mergeSiteSetting = (siteSettings, hostPattern, key, value) =>
  (siteSettings || Immutable.Map()).mergeIn([hostPattern], {
    [key]: value
  })

/**
  * Remove all site settings for the specified hostPattern.
  * @param {Object} siteSettings - The top level app state site settings indexed by hostPattern.
  * @param {string} hostPattern - The host pattern to remove all settings for.
  */
module.exports.removeSiteSettings = (siteSettings, hostPattern) =>
  siteSettings.delete(hostPattern)

/**
  * Obtains a squashed settings object of all matching host patterns with more exact matches taking precedence
  * @param {Object} siteSettings - The top level app state site settings indexed by hostPattern.
  * @param {string} location - The current page location to get settings for.
  * @return {Object} A merged settings object for the specified site setting or undefined
  */
module.exports.getSiteSettingsForURL = getSiteSettingsForURL


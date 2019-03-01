/**
 * Listing filter for ClayDB
 * @module clay-list-filter
 */

'use strict'


const filterArray = require('./filter_array')
const matching = require('./matching')

exports.filterArray = filterArray
exports.matching = matching

module.exports = {
  filterArray,
  matching
}

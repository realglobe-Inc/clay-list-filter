/**
 * Listing filter for ClayDB
 * @module clay-list-filter
 */

'use strict'

const d = (module) => module && module.default || module

const filterArray = d(require('./filter_array'))
const matching = d(require('./matching'))

module.exports = {
  filterArray,
  matching
}


exports.filterArray = filterArray
exports.matching = matching

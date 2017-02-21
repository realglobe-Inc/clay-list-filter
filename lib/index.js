/**
 * Listing filter for ClayDB
 * @module clay-list-filter
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get filterArray () { return d(require('./filter_array')) },
  get matching () { return d(require('./matching')) }
}

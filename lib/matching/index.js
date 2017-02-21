/**
 * Matching utility
 * @module matching
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get operatorMatch () { return d(require('./operator_match')) },
  get valueMatch () { return d(require('./value_match')) }
}

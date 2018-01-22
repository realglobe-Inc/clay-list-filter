/**
 * Matching utility
 * @module matching
 */

'use strict'

const d = (module) => module && module.default || module

const operatorMatch = d(require('./operator_match'))
const valueMatch = d(require('./value_match'))

module.exports = {
  operatorMatch,
  valueMatch
}


exports.operatorMatch = operatorMatch
exports.valueMatch = valueMatch

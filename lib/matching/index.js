/**
 * Matching utility
 * @module matching
 */

'use strict'


const operatorMatch = require('./operator_match')
const valueMatch = require('./value_match')

exports.operatorMatch = operatorMatch
exports.valueMatch = valueMatch

module.exports = {
  operatorMatch,
  valueMatch
}

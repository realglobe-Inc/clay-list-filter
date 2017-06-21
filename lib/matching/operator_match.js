/**
 * Matcher for operator
 * @function operatorMatch
 * @param {string} operator - Operator value
 * @param {Object} matcher - Matching value
 * @param {Object} target - Target value
 * @returns {boolean} Matched or not
 */
'use strict'

/** @lends operatorMatch */
function operatorMatch (operator, matcher, target) {
  let needsConvertAsDate = (matcher instanceof Date) !== (target instanceof Date)
  if (needsConvertAsDate) {
    return operatorMatch(operator, new Date(matcher), new Date(target))
  }
  let needsConvertNumber = (typeof matcher === 'number') !== (typeof target === 'number')
  if (needsConvertNumber) {
    let matcherAsNumber = Number(matcher)
    let targetAsNumber = Number(target)
    let convertSuccess = !isNaN(matcherAsNumber) && !isNaN(targetAsNumber)
    if (convertSuccess) {
      return operatorMatch(operator, matcherAsNumber, targetAsNumber)
    }
  }

  switch (operator) {
    case '$eq':
      return matcher === target
    case '$ne':
      return matcher !== target
    case '$gt':
      return matcher < target
    case '$gte':
      return matcher <= target
    case '$lt':
      return matcher > target
    case '$lte':
      return matcher >= target
    case '$in':
      return Boolean(~([].concat(matcher)).indexOf(target))
    case '$notIn':
      return Boolean(!~([].concat(matcher)).indexOf(target))
    case '$between': {
      let [ from, to ] = [].concat(matcher).map(Number)
      return (from <= target) && (target <= to)
    }
    case '$notBetween': {
      let [ from, to ] = [].concat(matcher).map(Number)
      return (target < from) || (to < target)
    }
    default:
      console.warn(`Unknown operator: "${operator}"`)
  }
}

module.exports = operatorMatch

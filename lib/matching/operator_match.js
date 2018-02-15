/**
 * Matcher for operator
 * @function operatorMatch
 * @param {string} operator - Operator value
 * @param {Object} matcher - Matching value
 * @param {Object} target - Target value
 * @returns {boolean} Matched or not
 */
'use strict'

const {ClayId} = require('clay-id')

const likeRegExp = (term) => new RegExp(
  '^' + term.replace(/\^/g, '\\^').replace(/\$/g, '\\$').replace(/\*/g, '\\*').replace(/%/g, '.*') + '$'
)

const formatForOperation = (value) => {
  if (Array.isArray(value)) {
    return value.map((v) => formatForOperation(v))
  }
  if (value instanceof ClayId) {
    return String(value)
  }
  return value
}

/** @lends operatorMatch */
function operatorMatch (operator, matcher, target) {
  const needsConvertAsDate = (matcher instanceof Date) !== (target instanceof Date)
  if (needsConvertAsDate) {
    return operatorMatch(operator, new Date(matcher), new Date(target))
  }
  const needsConvertNumber = (typeof matcher === 'number') !== (typeof target === 'number')
  if (needsConvertNumber) {
    let matcherAsNumber = Number(matcher)
    let targetAsNumber = Number(target)
    let convertSuccess = !isNaN(matcherAsNumber) && !isNaN(targetAsNumber)
    if (convertSuccess) {
      return operatorMatch(operator, matcherAsNumber, targetAsNumber)
    }
  }

  target = formatForOperation(target)
  matcher = formatForOperation(matcher)

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
      const [from, to] = [].concat(matcher).map(Number)
      return (from <= target) && (target <= to)
    }
    case '$notBetween': {
      const [from, to] = [].concat(matcher).map(Number)
      return (target < from) || (to < target)
    }
    case '$like': {
      return likeRegExp(matcher).test(target)
    }
    case '$notLike': {
      return !likeRegExp(matcher).test(target)
    }
    default:
      console.warn(`Unknown operator: "${operator}"`)
  }
}

module.exports = operatorMatch

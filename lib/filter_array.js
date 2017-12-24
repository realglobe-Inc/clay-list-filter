/**
 * Filter array with condition
 * @function filterArray
 * @param {Object[]} array - Array to filter
 * @param {Object} conditions - Filter conditions
 * @returns {Object[]} Filtered array
 */
'use strict'

const {valueMatch, operatorMatch} = require('./matching')

/** @lends filterArray */
function filterArray (array, conditions = {}) {
  return array.filter((entry) => hit(entry, conditions))
}

const hit = (values, conditions) => {
  if (Array.isArray(conditions)) {
    return conditions.some((conditions) => hit(values, conditions))
  }
  for (const name of Object.keys(conditions)) {
    const value = values[name]
    const condition = conditions[name]
    const rejected = !hitForValue(value, condition)
    if (rejected) {
      return false
    }
  }
  return true
}

const hitForValue = (value, condition) => {
  if (Array.isArray(condition)) {
    return condition.some((condition) => hitForValue(value, condition))
  }
  const isNested = typeof condition === 'object' && !(condition instanceof Date) && (condition !== null)
  if (isNested) {
    for (const propertyName of Object.keys(condition)) {
      const isOperator = /^\$/.test(propertyName) && !~['$ref'].indexOf(propertyName)
      if (isOperator) {
        let operativeValue = condition[propertyName]
        let rejected = !operatorMatch(propertyName, operativeValue, value)
        if (rejected) {
          return false
        }
      } else {
        const propertyValue = condition[propertyName]
        const rejected = !valueMatch(propertyValue, value && value[propertyName])
        if (rejected) {
          return false
        }
      }
    }
  } else {
    const rejected = !valueMatch(condition, value)
    if (rejected) {
      return false
    }
  }
  return true
}

module.exports = filterArray

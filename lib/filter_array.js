/**
 * Filter array with condition
 * @function filterArray
 * @param {Object[]} array - Array to filter
 * @param {Object} conditions - Filter conditions
 * @returns {Object[]} Filtered array
 */
'use strict'

const { valueMatch, operatorMatch } = require('./matching')

/** @lends filterArray */
function filterArray (array, conditions = {}) {
  let hit = (values, conditions) => {
    for (let name of Object.keys(conditions)) {
      let value = values[ name ]
      let condition = conditions[ name ]
      let isNested = typeof condition === 'object' && !(condition instanceof Date) && (condition !== null)
      if (isNested) {
        for (let propertyName of Object.keys(condition)) {
          let isOperator = /^\$/.test(propertyName) && !~[ '$ref' ].indexOf(propertyName)
          if (isOperator) {
            let operativeValue = condition[ propertyName ]
            let rejected = !operatorMatch(propertyName, operativeValue, value)
            if (rejected) {
              return false
            }
          } else {
            let propertyValue = condition[ propertyName ]
            let rejected = !valueMatch(propertyValue, value && value[ propertyName ])
            if (rejected) {
              return false
            }
          }
        }
      } else {
        let rejected = !valueMatch(condition, value)
        if (rejected) {
          return false
        }
      }
    }
    return true
  }
  return array.filter((entry) => hit(entry, conditions))
}

module.exports = filterArray

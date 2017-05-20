/**
 * Matcher for value
 * @function valueMatch
 * @param {Object} matcher - Matching value
 * @param {Object} target - Target value
 * @returns {boolean} Matched or not
 */
'use strict'

/** @lends valueMatch */
function valueMatch (matcher, target) {
  if (Array.isArray(matcher)) {
    for (let aMatcher of matcher) {
      let matched = valueMatch(aMatcher, target)
      if (matched) {
        return true
      }
    }
    return false
  }
  let hit = matcher === target
  if (hit) {
    return true
  }
  return String(matcher) === String(target)
}

module.exports = valueMatch

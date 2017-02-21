/**
 * Test case for valueMatch.
 * Runs with mocha.
 */
'use strict'

const valueMatch = require('../lib/matching/value_match.js')
const assert = require('assert')
const co = require('co')

describe('value-match', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Value match', () => co(function * () {
    assert.ok(
      valueMatch('foo', 'foo')
    )
    assert.ok(
      !valueMatch('foo', 'bar')
    )
    assert.ok(
      valueMatch([ 'foo', 'bar' ], 'foo')
    )
  }))
})

/* global describe, before, after, it */

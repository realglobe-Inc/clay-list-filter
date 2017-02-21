/**
 * Test case for operatorMatch.
 * Runs with mocha.
 */
'use strict'

const operatorMatch = require('../lib/matching/operator_match.js')
const assert = require('assert')
const co = require('co')

describe('operator-match', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Operator match', () => co(function * () {
    assert.ok(operatorMatch('$gt', 1, 2))
    assert.ok(!operatorMatch('$gt', 2, 2))
    assert.ok(!operatorMatch('$gt', 3, 2))
    assert.ok(operatorMatch('$gte', 1, 2))
    assert.ok(operatorMatch('$gte', 2, 2))
    assert.ok(!operatorMatch('$gte', 3, 2))
    assert.ok(operatorMatch('$in', [ 1, 2, 3 ], 2))
    assert.ok(!operatorMatch('$in', [ 1, 2, 3 ], 5))
    assert.ok(operatorMatch('$notIn', [ 1, 2, 3 ], 5))
  }))
})

/* global describe, before, after, it */

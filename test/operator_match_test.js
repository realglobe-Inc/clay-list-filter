/**
 * Test case for operatorMatch.
 * Runs with mocha.
 */
'use strict'

const operatorMatch = require('../lib/matching/operator_match.js')
const {ClayId} = require('clay-id')
const {ok} = require('assert')

describe('operator-match', function () {
  this.timeout(3000)

  it('Operator match', async () => {
    ok(operatorMatch('$gt', 1, 2))
    ok(!operatorMatch('$gt', 2, 2))
    ok(!operatorMatch('$gt', 3, 2))
    ok(operatorMatch('$gte', 1, 2))
    ok(operatorMatch('$gte', 2, 2))
    ok(!operatorMatch('$gte', 3, 2))
    ok(operatorMatch('$in', [1, 2, 3], 2))
    ok(!operatorMatch('$in', [1, 2, 3], 5))
    ok(operatorMatch('$notIn', [1, 2, 3], 5))
    ok(operatorMatch('$between', [5, 15], 10))
    ok(operatorMatch('$notBetween', [5, 15], 100))
    ok(operatorMatch('$like', 'fo%', 'foo'))
    ok(operatorMatch('$notLike', 'fo%', 'hoge'))
    ok(!operatorMatch('$notIn', ['x'], new ClayId('x')))
    ok(operatorMatch('$notIn', ['y'], new ClayId('x')))
  })
})

/* global describe, before, after, it */

/**
 * Test case for filterArray.
 * Runs with mocha.
 */
'use strict'

const filterArray = require('../lib/filter_array.js')
const { equal, deepEqual } = require('assert')
const co = require('co')

describe('filter-array', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Filter array', () => co(function * () {
    deepEqual(
      filterArray([ { name: 'foo' }, { name: 'bar' } ], { name: 'foo' }),
      [ { name: 'foo' } ]
    )

    equal(
      filterArray([ { at: new Date('2012/12/12') }, { at: new Date('2014/1/1') } ], { at: { $gt: new Date('2013/1/1') } }).length,
      1
    )

    deepEqual(
      filterArray([ { name: 'foo' }, { name: null }, { name: null } ], { name: null }),
      [ { name: null }, { name: null } ]
    )
  }))

  it('Filter by ref', () => co(function * () {
    deepEqual(
      filterArray([ { $ref: 'Org#1' }, { $ref: 'Org#2' } ], { $ref: 'Org#1' })
        [ { $ref: 'Org#1' } ]
    )
  }))
})

/* global describe, before, after, it */

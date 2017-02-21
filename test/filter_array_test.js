/**
 * Test case for filterArray.
 * Runs with mocha.
 */
'use strict'

const filterArray = require('../lib/filter_array.js')
const assert = require('assert')
const co = require('co')

describe('filter-array', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Filter array', () => co(function * () {
    assert.deepEqual(
      filterArray([ { name: 'foo' }, { name: 'bar' } ], { name: 'foo' }),
      [ { name: 'foo' } ]
    )

    assert.equal(
      filterArray([ { at: new Date('2012/12/12') }, { at: new Date('2014/1/1') } ], { at: { $gt: new Date('2013/1/1') } }).length,
      1
    )
  }))
})

/* global describe, before, after, it */

/**
 * Test case for filterArray.
 * Runs with mocha.
 */
'use strict'

const filterArray = require('../lib/filter_array.js')
const {equal, deepEqual} = require('assert')
const co = require('co')

describe('filter-array', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Filter array', () => co(function * () {
    deepEqual(
      filterArray([{name: 'foo'}, {name: 'bar'}], {name: 'foo'}),
      [{name: 'foo'}]
    )

    equal(
      filterArray([{at: new Date('2012/12/12')}, {at: new Date('2014/1/1')}], {at: {$gt: new Date('2013/1/1')}}).length,
      1
    )

    deepEqual(
      filterArray([{name: 'foo'}, {name: null}, {name: null}], {name: null}),
      [{name: null}, {name: null}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}], {v: {$in: [300, 500]}}),
      [{v: 300}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}], {v: {$between: [150, 350]}}),
      [{v: 300}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}], {v: {$notBetween: [150, 350]}}),
      [{v: 100}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}], {$or: [{v: {$notBetween: [150, 350]}}]}),
      [{v: 100}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}, {v: 500}, {v: 700}], {v: { $between: [0, 500] }, $or: [{v: { $ne: 300 }}]}),
      [{v: 100}, {v: 500}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}, {v: 500}, {v: 700}], {v: { $between: [0, 500] }, $or: [{v: { $ne: 300 }}, {v: { $ne: 500 }}]}),
      [{v: 100}, {v: 300}, {v: 500}]
    )

    deepEqual(
      filterArray([{v: 100}, {v: 300}, {v: 500}, {v: 700}], {v: { $between: [0, 500] }, $and: [{v: { $ne: 300 }}, {v: { $ne: 500 }}]}),
      [{v: 100}]
    )

    deepEqual(
      filterArray([{v: 100, w: 1}, {v: 300, w: 2}, {v: 500, w: 1}, {v: 700, w: 3}], {$and: [{$or: [{v: 100}, {v: 300}]}, {$or: [{w: 2}, {w: 3}]}]}),
      [{v: 300, w: 2}]
    )

    deepEqual(
      filterArray([{v: 100, w: 1}, {v: 300, w: 2}, {v: 500, w: 1}, {v: 700, w: 3}], {$or: [{$or: [{v: 100}, {v: 300}]}, {$or: [{w: 2}, {w: 3}]}]}),
      [{v: 100, w: 1}, {v: 300, w: 2}, {v: 700, w: 3}]
    )
  }))

  it('Filter by ref', () => co(function * () {
    deepEqual(
      filterArray([{org: {$ref: 'Org#1'}}, {org: {$ref: 'Org#2'}}], {org: {$ref: 'Org#1'}}),
      [{org: {$ref: 'Org#1'}}]
    )

    deepEqual(
      filterArray([{org: {$ref: 'Org#1'}}, {org: {$ref: 'Org#2'}}], {org: [{$ref: 'Org#1'}]}),
      [{org: {$ref: 'Org#1'}}]
    )

  }))
})

/* global describe, before, after, it */

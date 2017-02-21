'use strict'

const { filterArray } = require('clay-list-filter')

{
  let source = [ { name: 'foo' }, { name: 'bar' } ]
  let condition = { name: 'foo' }

  let filtered = filterArray(source, condition)
  console.log(filtered) // -> [ { name: 'foo' } ]
}


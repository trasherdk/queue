'use strict'

const assert = require('assert')
const test = require('testit')
const Queue = require('../')

test('queue', () => {
  const q = new Queue()
  const results = []
  assert(q.length === 0)
  q.push(1)
  assert(q.length === 1)
  q.push(2)
  assert(q.length === 2)
  q.push(3)
  assert(q.length === 3)
  return q.shift().then((n) => {
    assert(n === 1)
    assert(q.length === 2)
    return q.shift()
  }).then((n) => {
    assert(n === 2)
    assert(q.length === 1)
    return q.shift()
  }).then((n) => {
    assert(n === 3)
    assert(q.length === 0)
    results.push(q.shift())
    assert(q.length === -1)
    results.push(q.shift())
    assert(q.length === -2)
    results.push(q.shift())
    assert(q.length === -3)
    q.push(1)
    assert(q.length === -2)
    return results.shift()
  }).then((n) => {
    assert(n === 1)
    q.push(2)
    assert(q.length === -1)
    return results.shift()
  }).then((n) => {
    assert(n === 2)
    q.push(3)
    assert(q.length === 0)
    return results.shift()
  }).then((n) => {
    assert(n === 3)
  })
})

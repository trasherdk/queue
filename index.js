'use strict';
var Promise = require('promise')

function Queue() {
  if (!(this instanceof Queue)) return new Queue()
  this._items = []
  this._waiting = []
}

Queue.prototype.push = function(item) {
  var waiting = this._waiting.pop()
  if (waiting)
    waiting(item)
  else
    this._items.push(item)
}

Queue.prototype.pop = function(cb) {
  var item = this._items.pop()
  return (item
    ? Promise.from(item)
    : new Promise(function(resolve, reject) {
        this._waiting.push(resolve)
      })).nodeify(cb)
}

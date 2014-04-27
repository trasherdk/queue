'use strict';

var Promise = require('promise')

module.exports = Queue
function Queue() {
  if (!(this instanceof Queue)) return new Queue()
  this._items = []
  this._waiting = []
  this.length = 0
}

Queue.prototype.push = function(item) {
  if (this._waiting.length) {
    var waiting = this._waiting.shift()
    waiting(item)
  }
  else {
    this.length++
    this._items.push(item)
  }
}

Queue.prototype.pop = function(cb) { var self = this
  if (this._items.length) {
    var item = this._items.shift()
    this.length--
    return Promise.from(item).nodeify(cb)
  }
  else {
    return new Promise(function(resolve, reject) {
      self._waiting.push(resolve)
    }).nodeify(cb)
  }
}

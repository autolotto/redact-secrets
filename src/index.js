'use strict'

var traverse = require('traverse')
var isSecret = require('./isSecret')

module.exports = function (redacted) {
  return {
    map: map,
    forEach: forEach
  }

  function map (obj) {
    return traverse(obj).map(function (val) {
      if (isSecret.key(this.key) || isSecret.value(val)) this.update(redacted)
    })
  }

  function forEach (obj) {
    traverse(obj).forEach(function (val) {
      if (isSecret.key(this.key) || isSecret.value(val)) this.update(redacted)
    })
  }
}

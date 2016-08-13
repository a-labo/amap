/**
 * Extract inline source map to another file
 * @module amap
 * @version 1.0.6
 */

'use strict'

const amap = require('./amap')

let lib = amap.bind(this)

Object.assign(lib, amap, {
  amap
})

module.exports = lib

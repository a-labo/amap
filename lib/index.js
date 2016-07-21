/**
 * Extract inline source map to another file
 * @module amap
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get amap () { return d(require('./amap')) }
}

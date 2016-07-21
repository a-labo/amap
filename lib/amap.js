/**
 * @function amap
 * @param {string} filename - Filename to extract
 * @param {Object} [options] - Optional settings
 * @param {string} [options.dest] - Path to save file (which has no longer contains sourcemap)
 * @param {string} [options.map] - Path to save sourcemap file
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const fs = require('fs')
const path = require('path')
const { mkdirpAsync } = require('asfs')
const filecopy = require('filecopy')
const filedel = require('filedel')
const exorcist = require('exorcist')

/** @lends amap */
function amap (filename, options = {}) {
  let destFile = options.dest || filename
  let mapFile = options.map || `${destFile}.map`
  let tmpFile = `${destFile}.tmp`
  return co(function * () {
    yield mkdirpAsync(path.dirname(filename))
    yield mkdirpAsync(path.dirname(tmpFile))
    let input = fs.createReadStream(filename)
    let tmp = fs.createWriteStream(tmpFile)

    yield new Promise((resolve, reject) => {
      input.on('error', reject)
      tmp.on('error', reject)
      tmp.on('close', (ex) => co(function * () {
        resolve()
      }).catch(reject))
      input.pipe(exorcist(mapFile)).pipe(tmp)
    })

    yield filecopy(tmpFile, destFile)
    console.log(`File generated: ${destFile}, ${mapFile}`)
    yield filedel(tmpFile)
  })
}

module.exports = amap

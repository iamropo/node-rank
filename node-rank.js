#!/usr/bin/env node

var request = require('request')
var chalk = require('chalk')
var nodeVersion = require('child_process').spawn('node', ['-v'])

nodeVersion.stdout.on('data', nodeVersion => {
  nodeVersion = nodeVersion.toString().trim() // removes the newline character

  request('https://nodejs.org/en/download/releases/', (err, res, body) => {
    if (!err && res.statusCode === 200) {
      var raw = body.match(/v[^13][.]\d+[.]\d+/g) // has duplicate data
      var versions = Array.from(new Set(raw))

      console.log(chalk.bold.gray('\nNode.js Releases (Newest first): \n'))

      versions.some(function (v, i) {
        if (v === nodeVersion) {
          var rank = i + 1
          if (i === 0) {
            console.log(chalk.green(v) + ' Latest version! Node Rank: ' + rank)
          }
          console.log(chalk.red(v) + ' <--- Your Node Version, Node Rank: ' + rank)
          return true
        } else {
          console.log(v)
        }
      })
    } else {
      console.log('Couldn\'t fetch data. :(')
    }
  })
})

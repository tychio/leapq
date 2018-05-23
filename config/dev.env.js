'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_URL: {
    LEAPQ: '"http://localhost:3000/questionary"',
    ANALYSIS: '"http://localhost:3000/analysis"',
    EXPERIMENT: '"http://localhost:3000/experiment"'
  }
})

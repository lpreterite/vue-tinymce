require("jsdom-global")()
const Vue = require("vue")
global.Vue = Vue

const assert = require('assert')
const { expect } = require('chai')

global.expect = expect
global.assert = assert

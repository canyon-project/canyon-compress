// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

const sss = require('./coverage.json')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toEqual(sss)
})

const _ = require('lodash');

const sss = require('./coverage.json');
const sss1 = require('./test-coverage.json');

const obj1 = { a: 1, b: { c: 3 } };
const obj2 = { a: 1, b: { c: 3 } };

console.log(_.isEqual(sss, sss1)); // true

// test smaller
var assert = require('assert'),
    math = require('../../../index.js'),
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    smaller = math.smaller;

describe('smaller', function() {

  it('should compare two numbers correctly', function() {
    assert.equal(smaller(2, 3), true);
    assert.equal(smaller(2, 2), false);
    assert.equal(smaller(2, 1), false);
    assert.equal(smaller(0, 0), false);
    assert.equal(smaller(-2, 2), true);
    assert.equal(smaller(-2, -3), false);
    assert.equal(smaller(-3, -2), true);
  });

  it('should compare two booleans', function() {
    assert.equal(smaller(true, true), false);
    assert.equal(smaller(true, false), false);
    assert.equal(smaller(false, true), true);
    assert.equal(smaller(false, false), false);
  });

  it('should compare mixed numbers and booleans', function() {
    assert.equal(smaller(2, true), false);
    assert.equal(smaller(1, true), false);
    assert.equal(smaller(0, true), true);
    assert.equal(smaller(true, 2), true);
    assert.equal(smaller(true, 1), false);
    assert.equal(smaller(false, 2), true);
  });

  it('should compare two measures of the same unit correctly', function() {
    assert.equal(smaller(unit('100cm'), unit('10inch')), false);
    assert.equal(smaller(unit('99cm'), unit('1m')), true);
    //assert.equal(smaller(unit('100cm'), unit('1m')), false); // dangerous, round-off errors
    assert.equal(smaller(unit('101cm'), unit('1m')), false);
  });

  it('should throw an error if comparing a unit and a number', function() {
    assert.throws(function () {smaller(unit('100cm'), 22)});
  })

  it('should perform lexical comparison on two strings', function() {
    assert.equal(smaller('0', 0), false);
    assert.equal(smaller('abd', 'abc'), false);
    assert.equal(smaller('abc', 'abc'), false);
    assert.equal(smaller('abc', 'abd'), true);
  });

  it('should perform element-wise comparison on two matrices of same size', function() {
    assert.deepEqual(smaller([1,4,6], [3,4,5]), [true, false, false]);
    assert.deepEqual(smaller([1,4,6], matrix([3,4,5])), matrix([true, false, false]));
  });

  it('should throw an error when comparing complex numbers', function() {
    assert.throws(function () {smaller(complex(1,1), complex(1,2))}, TypeError);
    assert.throws(function () {smaller(complex(2,1), 3)}, TypeError);
    assert.throws(function () {smaller(3, complex(2,4))}, TypeError);
  });

  it('should throw an error with two matrices of different sizes', function () {
    assert.throws(function () {smaller([1,4,6], [3,4])});
  });

});

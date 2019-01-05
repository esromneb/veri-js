var jsc = require("jsverify");
var assert = require('assert');
// const dut = require("../mock/mockutils.js");


  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });

describe('name for collection of tests', function () {
  jsc.property("convert in", "bool", function (bb) {
    let a = jsc.random(0,255); // inclusive
    let b = jsc.random(0,255); // inclusive
    

    return a < 256 && b < 256;
  });

  jsc.property("test string", "bool", function (bb) {

    // console.log(bb);

    return true;
  });



});
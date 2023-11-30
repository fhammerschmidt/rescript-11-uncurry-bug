// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";

function mapMod(f, x) {
  if (x.NAME === "Just") {
    return {
            NAME: "Just",
            VAL: Curry._1(f, x.VAL)
          };
  } else {
    return {
            NAME: "Not",
            VAL: Curry._1(f, x.VAL)
          };
  }
}

function affirm(x) {
  if (typeof x !== "object") {
    return ;
  }
  if (x.TAG === "Fail") {
    fail(x._0);
    return ;
  }
  var match = x._0;
  if (match.NAME === "Just") {
    var match$1 = match.VAL;
    return Curry._1(expect(match$1[0]).toEqual, match$1[1]);
  }
  var match$2 = match.VAL;
  Curry._1(expect(match$2[0]).not.toEqual, match$2[1]);
}

function toEqual(b, p) {
  return {
          TAG: "Equal",
          _0: mapMod((function (a) {
                  return [
                          a,
                          p
                        ];
                }), b)
        };
}

function expect$1(a) {
  return {
          NAME: "Just",
          VAL: a
        };
}

function testUncurry(name, callback) {
  test(name, (function (param) {
          affirm(Curry._1(callback, undefined));
        }));
}

function testManualUncurry(name, callback) {
  test(name, (function () {
          affirm(Curry._1(callback, undefined));
        }));
}

testUncurry("@uncurry", (function (param) {
        return toEqual({
                    NAME: "Just",
                    VAL: "a"
                  }, "a");
      }));

testManualUncurry("manual uncurry", (function (param) {
        return toEqual({
                    NAME: "Just",
                    VAL: "a"
                  }, "a");
      }));

export {
  mapMod ,
  affirm ,
  toEqual ,
  expect$1 as expect,
  testUncurry ,
  testManualUncurry ,
}
/*  Not a pure module */
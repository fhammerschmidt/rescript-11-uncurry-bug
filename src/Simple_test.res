@val external fail: string => unit = "fail"
@val external expect: 'a => {..} = "expect"
@val external _testUncurry: (string, @uncurry (unit => Js.undefined<unit>)) => unit = "test"
@val external _testManualUncurry: (string, (. unit) => Js.undefined<unit>) => unit = "test"

type modifier<'a> = [
  | #Just('a)
  | #Not('a)
]

let mapMod = (f, x) =>
  switch x {
  | #Just(a) => #Just(f(a))
  | #Not(a) => #Not(f(a))
  }

type rec assertion =
  | Ok: assertion
  | Fail(string): assertion
  | Equal(modifier<('a, 'a)>): assertion

let affirm = x =>
  switch x {
  | Ok => ()
  | Fail(message) => fail(message)
  | Equal(#Just(a, b)) => expect(a)["toEqual"](b)
  | Equal(#Not(a, b)) => expect(a)["not"]["toEqual"](b)
  }

let toEqual = (b, p) => Equal(mapMod(a => (a, p), b))
let expect = a => #Just(a)

let testUncurry = (name, callback) =>
  _testUncurry(name, () => {
    affirm(callback())
    Js.undefined
  })

let testManualUncurry = (name, callback) =>
  _testManualUncurry(name, (. ()) => {
    affirm(callback())
    Js.undefined
  })

testUncurry("@uncurry", () => {
  expect("a")->toEqual("a") // Fails, but should not
})

testManualUncurry("manual uncurry", () => {
  expect("a")->toEqual("a") // Succeeds
})

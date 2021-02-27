import { parseJS } from "./core/parse";
import { BlockStatement } from "./core/statements";

const parse = (js: string): string => BlockStatement.print(parseJS(js))

describe("variables", () => {
    test("declare string", () => {
        expect(parse("let foo = \"Hello, World!\";"))
            .toBe("[DEFINE foo \"Hello, World!\"]")
    })

    test("declare array", () => {
        expect(parse("let foo = [1,2,3,4,5];"))
            .toBe("[DEFINE foo [ARRAY 1 2 3 4 5]]")
    })

    test("variable addition", () => {
        expect(parse("let add = \"Hello, \" + \"World!\""))
            .toBe("[DEFINE add [MATH \"Hello, \" + \"World!\"]]")
    })
})

describe("logic", () => {
    test("if statement", () => {
        expect(parse(`
let success = "Success!"
if (20 > 10) {
  success;
}`))
            .toBe("[DEFINE success \"Success!\"][IF [COMPARE 20 > 10] [VAR success]]")
    })

    test("if/else statement", () => {
        expect(parse(`
let fail = "Fail!"
let success = "Success!"
if (10 > 20) {
  fail;
} else {
  success;
}`))
            .toBe("[DEFINE fail \"Fail!\"][DEFINE success \"Success!\"][IF [COMPARE 10 > 20] [VAR fail] [VAR success]]")
    })
})

describe("function", () => {
    test("declare function", () => {
        expect(parse(`
let foo = "bruh";
function bar() {
  foo;
}
bar();`))
            .toBe("[DEFINE foo \"bruh\"][DEFINE bar [VAR foo]][VAR bar]")
    })
})
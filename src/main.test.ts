import { describe, test, expect } from "vitest";
import { parseCode } from "./core/parse";

const parse = (js: string) => parseCode(js).replaceAll("\n", " ").trim();

describe("variables", () => {
    test("declare string", () => {
        expect(parse(`let foo = "Hello, World!";`))
            .toBe(`[DEFINE foo "Hello, World!"]`)
    })

    test("declare array", () => {
        expect(parse("let foo = [1, 2, 3, 4, 5];"))
            .toBe("[DEFINE foo [ARRAY 1 2 3 4 5]]")
    })

    test("variable addition", () => {
        expect(parse(`let add = "Hello, " + "World!"`))
            .toBe(`[DEFINE add [ADD "Hello, " "World!"]]`)
    })
})

describe("logic", () => {
    test("if statement", () => {
        expect(parse(`if (20 > 10) "Success!"`))
            .toBe(`[IF [COMPARE 20 > 10] "Success!"]`)
    })

    test("if/else statement", () => {
        expect(parse(`
if (10 > 20) {
  "Fail!";
} else {
  "Success!";
}`))
            .toBe(`[IF [COMPARE 10 > 20] "Fail!" "Success!"]`)
    })
})

describe("function", () => {
    test("declare function", () => {
        expect(parse(`
function bar() {
  return "bruh";
};
bar();`))
            .toBe(`[FUNCTION bar [ARRAY ] "bruh"]  [bar ]`) // TODO: fix double space
    })

    test("declare function with params", () => {
        expect(parse(`
function foo(x, y) {
  return x + y;
}
foo(22);`))
            .toBe(`[FUNCTION foo [ARRAY x y] [ADD [VAR x] [VAR y]]] [foo 22]`)
    })

    test("map function", () => {
        expect(parse(`
let foo = [1, 2, 3, 4, 5];
let bar = foo.map(x => x * 2);
bar;`))
            .toBe("[DEFINE foo [ARRAY 1 2 3 4 5]] [DEFINE bar [MAP [MUL [VAR map.iterator] 2] [VAR foo]]] [VAR bar]")
    })
})

describe("loops", () => {
    test("for loop", () => {
        expect("").toBe("")
    })

    test("while loop", () => {
        expect("").toBe("")
    })
})

describe("global variables", () => {
    test("define and var", () => {
        expect("").toBe("")
    })
})
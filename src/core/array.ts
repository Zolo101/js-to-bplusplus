import * as estree from "estree";
import { CallExpressionArguments, Expression } from "./expression";
import { Pattern } from "./pattern";

export function getLength(array: estree.Expression): string {
    return `[LENGTH ${Expression(array)}]`;
}

export function arrayMap(array: estree.ArrayExpression, callback: estree.ArrowFunctionExpression): string {
    console.log("!!!", callback)
    const param = Pattern(callback.params[0]); //"map.iterator";
    let body: string | undefined = Expression(callback.body as estree.Expression);
    body = body?.replace(param, "map.iterator");
    return `[MAP ${body} ${Expression(array)}]`;
}

// [1, 2, 3].map(x => x * 2);
// [MAP [MUL [VAR map.iterator] 2] {1, 2, 3}]
// [2, 4, 6]

// export function arrayRepeat(array: estree.ArrayExpression, amount: CallExpressionArguments) {
//     if (amount.length !== 1) throw "Array.repeat() requires one argument, but got " + amount.length;
//     return `[REPEAT ${Expression(amount[0])} ${Expression(array)}]`;
// }


export function arrayPush(array: estree.ArrayExpression, addition: CallExpressionArguments) {
    console.log("?", array, addition)
    const unpackedArguments = addition.map(arg => Expression(arg)).join(" ");
    return `[CONCAT ${Expression(array)} [ARRAY ${unpackedArguments}]]`;
}

export function arrayAt(array: estree.ArrayExpression, index: estree.Expression) {
    return `[INDEX ${Expression(array)} ${Expression(index)}]`;
}

export function arrayEvery(array: estree.ArrayExpression, callback: estree.ArrowFunctionExpression) {
    const map = arrayMap(array, callback);
    return `[COMPARE [FIND ${map} 0] = -1]`;
}

export function arraySome(array: estree.ArrayExpression, callback: estree.ArrowFunctionExpression) {
    const map = arrayMap(array, callback);
    return `[COMPARE [FIND ${map} 1] != -1]`;
}


// type e = keyof typeof Array.prototype;
// let s: e = "slice"
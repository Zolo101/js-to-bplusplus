import { BFunction } from "./btypes";
import { ERRORLIST } from "./global";

/*
export const printFunction = new BFunction((...args) => {
    return "idk lol"
})
*/

export const MathFunction = new BFunction((...args) => {
    switch (args[1]) {
        case "+":
        case "-":
        case "*":
        case "/":
            return `MATH ${args[0]} ${args[1]} ${args[2]}`;

        case "**":
            return `MATH ${args[0]} ^ ${args[2]}`;

        default:
            ERRORLIST.push(`Unknown Operation: ${args[1]}`);
            throw 1;
    }
})

export const CompareFunction = new BFunction((...args) => {
    switch (args[1]) {
        case ">":
        case "<":
        case ">=":
        case "<=":
            return `COMPARE ${args[0]} ${args[1]} ${args[2]}`;

        case "==":
        case "===":
            return `COMPARE ${args[0]} = ${args[2]}`;

        case "!=":
        case "!==":
            return `COMPARE ${args[0]} != ${args[2]}`;

        default:
            ERRORLIST.push(`Unknown Operation: ${args[1]}`);
            throw 1;
    }
})



import { parse } from "acorn";
import { interpretLine } from "./interpreter";
import * as estree from "estree";

export function parseCode(code: string) {
    // @ts-ignore
    const parsedCode = parse(code, { ecmaVersion: 13 }).body;
    // console.log(parsedCode)

    let finalResult = ""
    for (const line of parsedCode) {
        // console.log(">>>", line);
        finalResult += interpretLine(line as estree.Statement) + "\n";
    }
    return finalResult
}
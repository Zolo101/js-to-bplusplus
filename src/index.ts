import "../style.css";
import * as estree from "estree";
import { parse } from "acorn";
import { startEditor } from "./editor/editor";
import { interpretLine } from "./core/interpreter";
import { buildOps, resetOps } from "./core/expression";
import { ERRORLIST } from "./core/global";

const outputtextarea = document.querySelector("#btext") as HTMLTextAreaElement;
const buildTimeElem = document.querySelector("#buildtime") as HTMLSpanElement;
console.log("Starting...")

export function runCode(code: string): void {
    const t0 = window.performance.now();
    try {
        outputtextarea.style.color = "black";
        outputtextarea.innerHTML = mainFunc(code);
    } catch (err: any) {
        outputtextarea.style.color = "red";
        outputtextarea.innerHTML = err;
    } finally {
        const t1 = window.performance.now();
        const time = t1 - t0;

        buildTimeElem.innerText = `${(time).toFixed(2)}ms, ${buildOps} Operations`
    }
}

function mainFunc(js: string): string {
    ERRORLIST.length = 0;
    resetOps()

    // @ts-ignore
    const parsedCode = parse(js, { ecmaVersion: 13 }).body;
    console.log(parsedCode)
    let finalResult = ""

    for (const line of parsedCode) {
        console.log(">>>", line);
        finalResult += interpretLine(line as estree.Statement);
        finalResult += "\n"
    }

    return finalResult
}

startEditor();
import estree = require("estree");
import { MathFunction } from "./core/functions";
import { ERRORLIST, FUNCTIONS, VARIABLES } from "./core/global";
import { parseJS } from "./core/parse";
import { setCode } from "./core/storage";
import { buildOps, resetOps, Statement } from "./core/types";

const outputtextarea = document.querySelector("#btext") as HTMLTextAreaElement;
const buildTimeElem = document.querySelector("#buildtime") as HTMLSpanElement;
console.log("Starting...")

export function runCode(code: string): void {
    const bTime = window.performance.now();
    try {
        outputtextarea.style.color = "black";
        outputtextarea.innerHTML = mainFunc(code);
    } catch (err) {
        outputtextarea.style.color = "red";
        outputtextarea.innerHTML = ERRORLIST.join("\n");
    } finally {
        console.log(parseJS(code));

        buildTimeElem.innerText = `${(window.performance.now() - bTime).toFixed(3)}ms, ${buildOps} Operations`
        setCode(code);
    }
}

FUNCTIONS.set("MATH", MathFunction)

function mainFunc(js: string): string {
    ERRORLIST.length = 0;
    resetOps();
    VARIABLES.clear();

    const parsedCode = parseJS(js).body
    let finalResult = ""

    for (const line of parsedCode) { // copy of BlockStatement
        finalResult += Statement(line as estree.Statement);
        console.log(">>>", line);
        finalResult += "\n"
    }

    return finalResult
}

import { startEditor, view } from "./editor/editor";

startEditor();
runCode();
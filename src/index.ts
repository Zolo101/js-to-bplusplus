import "../style.css";
import { startEditor } from "./editor/editor";
import { buildOps, resetOps } from "./core/expression";
import { ERRORLIST } from "./core/global";
import { parseCode } from "./core/parse";

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

export function mainFunc(js: string): string {
    ERRORLIST.length = 0;
    resetOps()

    return parseCode(js);
}

startEditor();
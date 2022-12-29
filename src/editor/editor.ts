import * as monaco from "monaco-editor";
import { runCode } from "..";
import { getCode, setCode } from "../core/storage";
const editorElem = document.querySelector("#ztext");
const fillerCode = getCode() ||
`const foo = "Hello, ";
const bar = "World!";
foo;
bar;
`;

export function startEditor(): void {
    if (!editorElem) throw "Could not inject editor?";

    // TODO: Figure out how to tell monaco to stop logging errors
    const editor = monaco.editor.create(<HTMLElement>editorElem, {
        value: fillerCode,
        language: "javascript",
        theme: "vs-dark",
    })

    editor.onKeyUp(e => {
        const val = editor.getValue();
        runCode(val);
        setCode(val);
    })

    runCode(editor.getValue());
}
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { defaultTabBinding } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript";
import { runCode } from "..";
import { VARIABLES } from "../core/global";
import { getCode } from "../core/storage";
const editorElem = document.querySelector("#ztext");
export let view: EditorView
const fillerCode = getCode() ||
`const foo = "Hello, ";
const bar = "World!";
foo;
bar;
`;


export function codeDispatch(): (tr: Transaction) => void {
    return (tr: Transaction) => {
        view.update([tr])
        if (!tr.changes.empty) {
            runCode();
            console.log(VARIABLES.values())
        }
    }
}

export function startEditor(): void {
    if (!editorElem) throw "what?"
    view = new EditorView({
        state: EditorState.create({
            extensions: [
                basicSetup,
                keymap.of([defaultTabBinding]),
                javascript()
            ]
        }),
        parent: editorElem,
        dispatch: codeDispatch()
    })

    view.dispatch({
        changes: {
            from: 0,
            insert: fillerCode
        }
    })
}

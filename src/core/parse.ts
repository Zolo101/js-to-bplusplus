import esprima = require("esprima");
export function parseJS(js: string): esprima.Program {
    return esprima.parseScript(js)
}

/*
 This is in another file because jest gets mad
 whenever it sees DOM.
*/
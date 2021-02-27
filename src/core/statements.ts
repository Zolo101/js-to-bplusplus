import estree = require("estree");
import { ERRORLIST, VARIABLES } from "./global";
import BTypes from "./btypes";
import { envelopeString } from "./util";
import { ArrayExpression, Expression, Pattern, Statement } from "./types";

export const VariableDeclaration = new BTypes(
).addPost((node: estree.VariableDeclaration) => {
    const dec = node.declarations[0];
    if (!dec.init) {
        ERRORLIST.push("Unknown / Missing Expression!")
        throw 1;
    }

    switch (dec.init.type) {
        case "ArrayExpression":
            VARIABLES.set(Pattern(dec.id), ArrayExpression(dec.init))
            break;

        default:
            VARIABLES.set(Pattern(dec.id), Expression(dec.init))
            break;
    }
}).addPrint((node: estree.VariableDeclaration) => {
    const dec = node.declarations[0];
    if (!dec.init) {
        ERRORLIST.push("Unknown / Missing Expression!")
        throw 1;
    }

    switch (dec.init.type) {
        case "ArrayExpression":
            return envelopeString("DEFINE", Pattern(dec.id), envelopeString("ARRAY", ArrayExpression(dec.init)))

        default:
            return envelopeString("DEFINE", Pattern(dec.id), Expression(dec.init))
    }
})

export const FunctionDeclaration = new BTypes(
).addPost((node: estree.FunctionDeclaration) => {
    if (node.async || node.generator) {
        ERRORLIST.push("async and/or generators aren't supported!");
        throw 1;
    }

    if (!node.id) {
        ERRORLIST.push("Unknown / Missing Identifier!")
        throw 1;
    }

    VARIABLES.set(Pattern(node.id), Statement(node.body))
}).addPrint((node: estree.FunctionDeclaration) => {
    if (!node.id) {
        ERRORLIST.push("Unknown / Missing Identifier!")
        throw 1;
    }
    const name = Pattern(node.id);

    if (!VARIABLES.has(name)) {
        ERRORLIST.push(`Unknown Variable: ${name}`)
        throw 1;
    }

    return envelopeString("DEFINE", name, VARIABLES.get(name) as string)
})

export const ExpressionStatement = new BTypes(
).addPost((node: estree.ExpressionStatement) => {
    if (!VARIABLES.has(Expression(node.expression))) {
        ERRORLIST.push(`Unknown Variable: ${Expression(node.expression)}`)
        throw 1;
    }
}).addPrint((node: estree.ExpressionStatement) => {
    return envelopeString("VAR", Expression(node.expression))
})

export const IfStatement = new BTypes(
).addPost(() => {
    let placeholder; // Placeholder while I make functions like this optional
}).addPrint((node: estree.IfStatement) => {
    if (node.alternate) {
        return envelopeString("IF", Expression(node.test), Statement(node.consequent), Statement(node.alternate))
    } else {
        return envelopeString("IF", Expression(node.test), Statement(node.consequent))
    }
})

export const BlockStatement = new BTypes(
).addPost(() => {
    let placeholder; // Placeholder while I make functions like this optional
}).addPrint((node: estree.BlockStatement) => {
    let result = "";
    for (const line of node.body) {
        result += Statement(line);
    }
    return result;
})

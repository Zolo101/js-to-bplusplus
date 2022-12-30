import * as estree from "estree";
import { Expression } from "./expression";
import { Pattern, PatternIdentifier } from "./pattern";
import { ERRORLIST } from "./global";

export function interpretLine(line: estree.Statement) {
    let output: string | undefined = "";

    // find correct statement type
    switch (line.type) {
        case "EmptyStatement":
            break;
        case "ExpressionStatement":
            output = ExpressionStatement(line);
            break;

        case "BlockStatement":
            output = BlockStatement(line);
            break;

        case "StaticBlock":
            break;
        case "DebuggerStatement":
            break;
        case "WithStatement":
            break;
        case "ReturnStatement":
            output = ReturnStatement(line);
            break;
        case "LabeledStatement":
            break;
        case "BreakStatement":
            break;
        case "ContinueStatement":
            break;
        case "IfStatement":
            output = IfStatement(line);
            break;
        case "SwitchStatement":
            break;
        case "ThrowStatement":
            break;
        case "TryStatement":
            break;
        case "WhileStatement":
            output = WhileStatement(line);
            break;
        case "DoWhileStatement":
            break;
        case "ForStatement":
            output = ForStatement(line);
            break;
        case "ForInStatement":
            break;
        case "ForOfStatement":
            break;
        case "FunctionDeclaration":
            output = FunctionDeclaration(line);
            break;

        case "VariableDeclaration":
            output = VariableDeclaration(line);
            break;

        case "ClassDeclaration":
            break;

        default:
            ERRORLIST.push(`Unknown Declaration: ${(line as any).type}`);
            throw 1;
    }

    return output;
}

function VariableDeclaration(statement: estree.VariableDeclaration) {
    // TODO: Is this correct?
    return statement.declarations.map(declaration => VariableDeclarator(declaration)).join(" ");
}

function VariableDeclarator(declaration: estree.VariableDeclarator) {
    return `[DEFINE ${Pattern(declaration.id)} ${Expression(declaration.init)}]`
}

function ExpressionStatement(statement: estree.ExpressionStatement) {
    return Expression(statement.expression);
}

function BlockStatement(statement: estree.BlockStatement) {
    return statement.body.map(line => interpretLine(line)).join(" ");
}

function IfStatement(statement: estree.IfStatement) {
    // TODO: Use ===?
    let alt = statement.alternate == undefined ? "" : ` ${interpretLine(statement.alternate)}`
    return `[IF ${Expression(statement.test)} ${interpretLine(statement.consequent)}${alt}]`;
}

function WhileStatement(statement: estree.WhileStatement) {
    return `[WHILE ${Expression(statement.test)} ${interpretLine(statement.body)}]`;
}

function ForStatement(statement: estree.ForStatement) {
    let indexDefine = VariableDeclaration(statement.init as estree.VariableDeclaration);
    let condition = Expression(statement.test);
    let update = Expression(statement.update);
    console.log("eefgh")
    let body = interpretLine(statement.body);
    console.log(indexDefine, condition, update, body);

    return `${indexDefine} [WHILE ${condition} ${body} ${update}]`;
}

function FunctionDeclaration(statement: estree.FunctionDeclaration) {
    if (statement.id == null) throw "All functions must have names!"

    const name = PatternIdentifier(statement.id);
    const params = `[ARRAY ${statement.params.map(param => Pattern(param)).join(" ")}]`
    return `[FUNCTION ${name} ${params} ${interpretLine(statement.body)}]`;
}

function ReturnStatement(statement: estree.ReturnStatement) {
    return Expression(statement.argument);
}
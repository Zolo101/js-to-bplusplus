import estree = require("estree");
import { CompareFunction, MathFunction } from "./functions";
import { ERRORLIST, VARIABLES} from "./global";
import { BlockStatement, ExpressionStatement, FunctionDeclaration, IfStatement, VariableDeclaration } from "./statements";
import { envelopeString, packArray, unpackArray } from "./util";
export let buildOps = 0; // Operations
export const resetOps = (): number => buildOps = 0;

/// Level 1 Types

export function Identifer(arg: estree.Identifier): string {
    return arg.name;
}

export function Literal(arg: estree.Literal): string {
    if (arg.raw) {
        return arg.raw
    } else {
        ERRORLIST.push("Empty Literal!");
        throw 1; // error
    }
}

// Level 2 Types

export function BinaryExpression(arg: estree.BinaryExpression): string {
    let argLeft = Expression(arg.left);
    let argRight = Expression(arg.right);

    if (VARIABLES.has(argLeft)) argLeft = `[VAR ${argLeft}]`
    if (VARIABLES.has(argRight)) argRight = `[VAR ${argRight}]`

    switch (arg.operator) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "**":
            return envelopeString(MathFunction.onRun(argLeft, arg.operator, argRight))

        case ">":
        case "<":
        case ">=":
        case "<=":
        case "==":
        case "===":
        case "!=":
        case "!==":
            return envelopeString(CompareFunction.onRun(argLeft, arg.operator, argRight))

        default:
            ERRORLIST.push(`Unknown Operation: ${arg.operator}`);
            throw 1;
    }
}

export function ArrayExpression(arg: estree.ArrayExpression): string {
    const elem = [];
    for (const express of arg.elements) {
        if (!express) { // NULL
            ERRORLIST.push("Null Array!");
            throw 1; // error
        }

        switch (express.type) {
            case "SpreadElement":
                elem.push(...unpackArray(SpreadElement(express)));
                break;

            default:
                elem.push(Expression(express))
                break;
        }
    }
    return packArray(elem, " ")
}

export function CallExpression(arg: estree.CallExpression): string {
    return Expression(arg.callee as estree.Expression)
}

/*
export function AssignmentExpression(arg: estree.AssignmentExpression): string {
    let argLeft = Pattern(arg.left);
    const argRight = Expression(arg.right);
    let newValue = "";

    if (VARIABLES.has(argLeft)) {
        argLeft = `[DEFINE ${argLeft}]`
    } else {
        ERRORLIST.push("Unknown Variable Assignment!");
        throw 1;
    }

    if (isNaN(Number(argLeft))) { // Check if NAN
        // String
        switch (arg.operator) {
            case "=":
                newValue = argRight
                break;

            case "+=":
                newValue += argLeft + argRight
                break;

            default:
                ERRORLIST.push("Illegal string operator!");
                throw 1;
        }
    } else {
        let arNum = unpackNumber(argLeft);
        // Number
        switch (arg.operator) {
            case "=":
                arNum = unpackNumber(argRight);
                break;

            case "+=":
                arNum += unpackNumber(argRight);
                break;

            case "-=":
                arNum -= unpackNumber(argRight);
                break;

            case "*=":
                arNum *= unpackNumber(argRight);
                break;

            case "/=":
                arNum /= unpackNumber(argRight);
                break;

            case "%=":
                arNum %= unpackNumber(argRight);
                break;

            case "**=":
                arNum **= unpackNumber(argRight);
                break;

            case "<<=":
                arNum <<= unpackNumber(argRight);
                break;

            case ">>=":
                arNum >>= unpackNumber(argRight);
                break;

            case ">>>=":
                arNum >>>= unpackNumber(argRight);
                break;

            case "|=":
                arNum |= unpackNumber(argRight);
                break;

            case "^=":
                arNum ^= unpackNumber(argRight);
                break;

            case "&=":
                arNum &= unpackNumber(argRight);
                break;
        }
        newValue = packNumber(arNum);
    }

    VARIABLES.set(argLeft, newValue);
    return newValue;
} */


// Specfic nodes

export function SpreadElement(arg: estree.SpreadElement): string {
    const expr = Expression(arg.argument);
    if (VARIABLES.has(expr)) {
        return VARIABLES.get(expr) as string
    } else {
        return "";
    }
}

// Specfic types

export function Expression(arg: estree.Expression): string {
    buildOps += 1;
    switch (arg.type) {
        case "Identifier":
            return Identifer(arg)

        case "Literal":
            return Literal(arg)

        case "BinaryExpression":
            return BinaryExpression(arg)

        case "ArrayExpression":
            return ArrayExpression(arg)

        case "CallExpression":
            return CallExpression(arg)

        case "AssignmentExpression":
        case "MemberExpression":
        case "ObjectExpression":
        case "ThisExpression":
        case "FunctionExpression":
        case "ArrowFunctionExpression":
        case "YieldExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "LogicalExpression":
        case "ConditionalExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ClassExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ImportExpression":
        case "ChainExpression":
            ERRORLIST.push(`${arg.type} has not been implemented yet!`)
            throw 1;

        default:
            ERRORLIST.push("Unknown / Missing Expression!")
            throw 1;
    }
}

export function Pattern(arg: estree.Pattern): string {
    buildOps += 1;
    switch (arg.type) {
        case "Identifier":
            return Identifer(arg)

        case "ObjectPattern":
        case "ArrayPattern":
        case "RestElement":
        case "AssignmentPattern":
        case "MemberExpression":
            ERRORLIST.push(`${arg.type} has not been implemented yet!`)
            throw 1;

        default:
            ERRORLIST.push(`Unknown Pattern: ${arg}`)
            throw 1;
    }
}

export function Statement(arg: estree.Statement): string {
    buildOps += 1;
    switch (arg.type) {
        case "VariableDeclaration":
            VariableDeclaration.postFunction(arg);
            return VariableDeclaration.print(arg);

        case "FunctionDeclaration":
            FunctionDeclaration.postFunction(arg);
            return FunctionDeclaration.print(arg);

        case "ExpressionStatement":
            ExpressionStatement.postFunction(arg);
            return ExpressionStatement.print(arg);

        case "IfStatement":
            IfStatement.postFunction(arg);
            return IfStatement.print(arg);

        case "BlockStatement":
            BlockStatement.postFunction(arg);
            return BlockStatement.print(arg);

        case "ClassDeclaration":
        case "EmptyStatement":
        case "DebuggerStatement":
        case "WithStatement":
        case "ReturnStatement":
        case "LabeledStatement":
        case "BreakStatement":
        case "ContinueStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "TryStatement":
        case "WhileStatement":
        case "DoWhileStatement":
        case "ForStatement":
        case "ForInStatement":
        case "ForOfStatement":
            ERRORLIST.push(`${arg.type} has not been implemented yet!`)
            throw 1;

        default:
            ERRORLIST.push(`Unknown Statement: ${arg}`)
            throw 1;
    }
}

/*
export function ObjectExpression(arg: estree.ObjectExpression): string {

    for (const property of arg.properties) {
        switch (property.type) {
            case "Property":
                VARIABLES.set()
            break;

        case "SpreadElement":
            ERRORLIST.push("Spread (...) has not yet been developed!");
            throw 1; // error

        default:
            ERRORLIST.push("Unknown Property Type");
            throw 1; // error
        }
    }
} */
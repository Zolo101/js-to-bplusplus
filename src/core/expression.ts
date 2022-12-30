import * as estree from "estree";
import { Pattern, PatternIdentifier } from "./pattern";
import { arrayAt, arrayEvery, arrayMap, arrayPush, arraySome, getLength } from "./array";

export let buildOps = 0; // Operations
export const resetOps = () => buildOps = 0;

type Result = string | number | bigint | boolean | RegExp | null | undefined;
type ResultWithVoid = string | number | bigint | boolean | void | RegExp | null | undefined;
export type CallExpressionArguments = (estree.Expression | estree.SpreadElement)[]
export function Expression(expression: estree.Expression | estree.SpreadElement | undefined | null): string | undefined {
    buildOps += 1;
    switch (expression?.type) {
        case "Literal":
            return Literal(expression);

        case "Identifier":
            return Identifier(expression);

        case "BinaryExpression":
            return BinaryExpression(expression);

        case "ArrayExpression":
            return ArrayExpression(expression);

        case "CallExpression":
            return CallExpression(expression);

        case "AssignmentExpression":
            return AssignmentExpression(expression);


        case "ConditionalExpression":
            return ConditionalExpression(expression);


        case "MemberExpression":
            return idkExpression(expression);

        case "ClassExpression":

        case "ThisExpression":

        case "ChainExpression":

        case "UnaryExpression":

        case "AwaitExpression":

        case "LogicalExpression":

        case "FunctionExpression":

        case "TaggedTemplateExpression":

        case "SequenceExpression":

        case "ImportExpression":

        case "ArrowFunctionExpression":

        case "MetaProperty":

        case "NewExpression":

        case "UpdateExpression":
            return UpdateExpression(expression as estree.UpdateExpression);

        case "YieldExpression":

        case "TemplateLiteral":

        case "ObjectExpression":

        default:
            // ERRORLIST.push(`Unknown Expression: ${expression?.type}`);
            throw `Unknown Expression: ${expression?.type}`;
    }
}

export function Literal(expression: estree.SimpleLiteral | estree.RegExpLiteral | estree.BigIntLiteral) {
    switch (typeof expression.value) {
        case "undefined":
            break;
        case "object":
            break;
        case "boolean":
            break;
        case "number":
            return expression.value.toString();
        case "string":
            return `"${expression.value}"`;
        case "function":
            break;
        case "symbol":
            break;
        case "bigint":
            break;
    }
}

export function Identifier(expression: estree.Identifier) {
    return `[VAR ${expression.name}]`
}

export function ConditionalExpression(expression: estree.ConditionalExpression): string {
    return `[IF ${Expression(expression.test)} ${Expression(expression.consequent)} ${Expression(expression.alternate)}]`;
}

export function BinaryExpression(expression: estree.BinaryExpression): string | undefined {
    const [left, operator, right] = [Expression(expression.left), expression.operator, Expression(expression.right)];
    switch (expression.operator) {
        case "===":
        case "==":
            return `[COMPARE ${left} = ${right}]`;

        case "!=":
        case "!==":
            return `[COMPARE ${left} != ${right}]`;

        case "<":
        case "<=":
        case ">":
        case ">=":
            return `[COMPARE ${left} ${operator} ${right}]`;

        case "<<":
        case ">>":
        case ">>>":
            break;

        case "+":
            return `[ADD ${left} ${right}]`;
        case "-":
            return `[SUB ${left} ${right}]`;
        case "*":
            return `[MUL ${left} ${right}]`;
        case "/":
            return `[DIV ${left} ${right}]`;
        case "%":
            return `[MOD ${left} ${right}]`;
        case "**":
            return `[POW ${left} ${right}]`;

        case "|":
        case "^":
        case "&":
        case "in":
        case "instanceof":
        default:
            throw `Unknown BinaryExpression ${expression.operator}`;

    }
}

export function ArrayExpression(expression: estree.ArrayExpression) {
    let r: ResultWithVoid[]  = expression.elements.map(element => Expression(element));
    // return `{${r.join(", ")}}`;
    return `[ARRAY ${r.join(" ")}]`;
}

export function UpdateExpression(expression: estree.UpdateExpression) {
    const updatee = Pattern(expression.argument as estree.Pattern);
    switch (expression.operator) {
        case "++":
            return `[DEFINE ${updatee} [ADD [VAR ${updatee}] 1]]`;
        case "--":
            return `[DEFINE ${updatee} [SUB [VAR ${updatee}] 1]]`;
    }
}

export function CallExpression(expression: estree.SimpleCallExpression): string {
    switch (expression.callee.type) {
        case "MemberExpression":
            return CallMemberExpression(expression.callee, expression.arguments);

        default:
            const args: string = expression.arguments.map(arg => Expression(arg)).join(" ");
            return `[${PatternIdentifier(expression.callee as estree.Identifier)} ${args}]`
    }
}

export function AssignmentExpression(expression: estree.AssignmentExpression): string {
    let left = Pattern(expression.left);
    let right = Expression(expression.right);
    switch (expression.operator) {
        case "=":
            return `[DEFINE ${left} ${right}]`;
        case "+=":
            return `[DEFINE ${left} [ADD [VAR ${left}] ${right}]]`;
        case "-=":
            return `[DEFINE ${left} [SUB [VAR ${left}] ${right}]]`;
        case "*=":
            return `[DEFINE ${left} [MUL [VAR ${left}] ${right}]]`;
        case "/=":
            return `[DEFINE ${left} [DIV [VAR ${left}] ${right}]]`;
        case "%=":
            return `[DEFINE ${left} [MOD [VAR ${left}] ${right}]]`;
        case "**=":
            return `[DEFINE ${left} [POW [VAR ${left}] ${right}]]`;

        case "<<=":
        case ">>=":
        case ">>>=":
        case "|=":
        case "^=":
        case "&=":
            throw `Unknown AssignmentExpression ${expression.operator}`;

    }
}

export function idkExpression(expression: estree.ChainExpression | estree.UnaryExpression | estree.AwaitExpression | estree.LogicalExpression | estree.ThisExpression | estree.FunctionExpression | estree.TaggedTemplateExpression | estree.SequenceExpression | estree.ImportExpression | estree.ArrowFunctionExpression | estree.MetaProperty | estree.NewExpression | estree.UpdateExpression | estree.YieldExpression | estree.ConditionalExpression | estree.ClassExpression | estree.MemberExpression) {
    switch (expression.type) {
        case "MemberExpression":
            return PropertyCallExpression(expression);

        default:
            break;
    }
}

// this can only be used for properties, not methods
function PropertyCallExpression(expression: estree.MemberExpression) {
    const propertyName: string | undefined = expression.property.type === "Identifier" ? PatternIdentifier(expression.property) : Expression(expression.property as estree.Expression);
    const objectType = expression.object.type
    // console.log(propertyName, objectType)
        console.log(":", expression.type, objectType, propertyName, expression.computed)
    if (expression.computed) {
        return `[INDEX ${Expression(expression.object as estree.Expression)} ${Expression(expression.property as estree.Expression)}]`;
    }
    switch (objectType) {
        case "Identifier":
            switch (propertyName) {
                case "length":
                    return getLength(expression.object);
            }

        // arrays
        case "ArrayExpression":
            switch (propertyName as keyof typeof Array.prototype) {
                case "length":
                    return getLength(expression.object);
            }

        default:
            throw "Unknown PropertyCallExpression" + objectType + propertyName;
    }
}

// for methods only
function CallMemberExpression(expression: estree.MemberExpression, args: CallExpressionArguments) {
    switch (expression.object.type) {
        case "Identifier":
        case "ArrayExpression":
            // @ts-ignore
            return CallMemberArrayExpression(expression, expression.object, args);

        default:
            throw `Unknown MemberExpression type ${expression.object.type}`;
    }
}

// for array methods that are being called
function CallMemberArrayExpression(expression: estree.MemberExpression, object: estree.ArrayExpression, args: any) {
    const propertyName = expression.property.type === "Identifier" ? PatternIdentifier(expression.property) : Expression(expression.property as estree.Expression);
    switch (propertyName) {
        case "push":
            return arrayPush(object, args);
        case "map":
            return arrayMap(object, args[0]);
        // case "repeat":
        //     return arrayRepeat(object, args);

        case "at":
            return arrayAt(object, args[0]);
        case "every":
            return arrayEvery(object, args[0]);
        case "some":
            return arraySome(object, args[0]);
        case "join":
        case "filter":
        case "slice":
        case "findIndex":
        case "shift":
        case "fill":
        case "sort":

        default:
            throw `Array.prototype.${propertyName} is not supported`;
    }
}
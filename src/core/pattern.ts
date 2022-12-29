import * as estree from "estree";
import { ERRORLIST } from "./global";

export function Pattern(pattern: estree.Pattern) {
    switch (pattern.type) {
        case "Identifier":
            return PatternIdentifier(pattern);
        case "ObjectPattern":
            // break;
        case "ArrayPattern":
            // break;
        case "RestElement":
            // break;
        case "AssignmentPattern":
            // break;
        case "MemberExpression":
            // break;
        default:
            ERRORLIST.push(`Unknown Pattern: ${pattern.type}`);
            throw 1;
    }
}

// Identifier without the [VAR] wrap
export function PatternIdentifier(expression: estree.Identifier) {
    return expression.name
}
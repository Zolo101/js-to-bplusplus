import { BVariable } from "./btypes"

export function envelopeString(...str: BVariable[]): string {
    return `[${str.join(" ")}]`
}

export function hasWhiteSpace(str: string): boolean {
    return str.indexOf(" ") >= 0
}

export function unpackArray(str: string, seperator = ","): string[] {
    return str.split(seperator)
}

export function packArray(arr: string[], seperator = ","): string {
    return arr.join(seperator)
}

export function unpackNumber(str: string): number {
    return Number(str);
}

export function packNumber(num: number): string {
    return num.toString();
}


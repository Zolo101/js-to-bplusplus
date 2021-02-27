type btypeFunctionVoid = (arg: any) => void;
type btypeFunction = (arg: any) => string;

export type BOperatiors = "+" | "-" | "*" | "/" | "^"

export type BVariable = string

export class BFunction {
    onRun: (...args: string[]) => string

    constructor(func: (...args: string[]) => string) {
        this.onRun = func;
    }
}

export class BTypes {
    postFunction!: btypeFunctionVoid
    print!: btypeFunction

    addPost(func: btypeFunctionVoid): BTypes {
        this.postFunction = func;
        return this;
    }

    addPrint(func: btypeFunction): BTypes {
        this.print = func;
        return this;
    }
}

export default BTypes;
export function getCode(): string | null {
    return localStorage.getItem("code")
}
export function setCode(code: string): void {
    localStorage.setItem("code", code)
}

export function getCode() {
    return localStorage.getItem("code")
}
export function setCode(code: string) {
    localStorage.setItem("code", code)
}

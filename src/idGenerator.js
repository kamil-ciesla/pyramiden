export function createRandomId() {
    let randomId = ''
    for (let i = 0; i < 5; i++) {
        randomId += Math.random().toString(36).substring(2, 32 + 2)
    }
    return randomId
}
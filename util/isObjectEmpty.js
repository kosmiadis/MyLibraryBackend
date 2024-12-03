export function isObjectEmpty (obj) {
    try {
        return Array.from(Object.entries(obj)).length === 0
    } catch (e) {
        return true
    }
}
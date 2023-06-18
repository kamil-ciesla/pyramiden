export function convertDateIfNeeded(date) {
    if (isDate(date)) {
        return date
    } else {
        return date.toDate()
    }
}

function isDate(obj) {
    return obj instanceof Date && !isNaN(obj.valueOf());
}

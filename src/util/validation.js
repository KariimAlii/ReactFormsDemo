export function isEmail(value) {
    return value.includes('@');
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}

export const validate = (value, ...fns) => fns.every(fn => fn(value));

export function hasMinLength_V2(minLength) {
    return value => value.length >= minLength;
}
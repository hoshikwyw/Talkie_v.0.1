/** Joins class names, dropping falsy values so conditionals stay inline. */
export const cn = (...classes) => classes.filter(Boolean).join(' ')

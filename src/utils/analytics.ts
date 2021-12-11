export const makeHumanReadable = (s: string | undefined) =>
  s
    ? s
        .split(/(?=[A-Z])/)
        .map((it) => it.charAt(0).toUpperCase() + it.slice(1))
        .join(' ')
    : ''

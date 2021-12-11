export const makeUnique = <T>(arr: T[]) =>
  arr.filter((item, index, list) => list.findIndex((it) => it === item) === index)

export const rotate = <T>(arr: T[], n: number) => {
  const safeN = n % arr.length
  return arr.slice(safeN, arr.length).concat(arr.slice(0, safeN))
}

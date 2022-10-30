export const arrayToString = arr => {
  return arr.reduce(
    (res, el, index) =>
      (res += index !== 0 ? `, "${el}"` : `"${el}"`),
    '',
  )
}

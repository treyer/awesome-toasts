export const getPositionX = e => {
  const touch = e.touches && e.touches[0]
  return e.clientX || touch.pageX
}

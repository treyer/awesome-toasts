export const checkAndFixLifetime = options => {
  if ('lifeTime' in options) {
    if (
      !(
        Number.isInteger(+options.lifeTime) &&
        options.lifeTime >= 0
      )
    ) {
      console.error(
        `Incorrect "lifeTime" option value "${options.lifeTime}"`,
      )
      delete options.lifeTime
    } else {
      options.lifeTime = Number(options.lifeTime)
    }
  }
  return options
}

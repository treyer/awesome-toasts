import { TOAST_TYPE } from '@constants/toastTypes'
import { arrayToString } from '@helpers/arrayToString'

export const fixToastType = options => {
  if ('type' in options) {
    if (!Object.values(TOAST_TYPE).includes(options.type)) {
      console.error(
        `Wrong "type" option value "${
          options.type
        }". Available values:${arrayToString(
          Object.values(TOAST_TYPE),
        )}`,
      )
      delete options.type
    }
  }
  return options
}

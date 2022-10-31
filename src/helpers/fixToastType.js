import { TOAST_TYPE } from '@constants/toastTypes.js'
import { arrayToString } from '@helpers/arrayToString.js'

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

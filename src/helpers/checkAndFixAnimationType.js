import {
  ANIMATION_TYPES,
  CUBIC_BEZIER_FN,
} from '@constants/animationTypes.js'
import { arrayToString } from '@helpers/arrayToString.js'

export const checkAndFixAnimationType = options => {
  if ('animationType' in options) {
    if (
      !Object.values(ANIMATION_TYPES).includes(
        options.animationType,
      )
    ) {
      console.error(
        `Wrong "animationType" option value "${
          options.animationType
        }". Available values: ${arrayToString(
          Object.values(ANIMATION_TYPES),
        )}.`,
      )
      delete options.animationType
    } else {
      if (
        options.animationType ===
        ANIMATION_TYPES.CUBIC_BEZIER
      ) {
        options.animationType = CUBIC_BEZIER_FN
      }
    }
  }
  return options
}

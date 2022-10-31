import { TOAST_STATE } from '@constants/toastStates'
import { TOAST_TYPE_COLORS } from '@constants/colors'
import { TOAST_TYPE } from '@constants/toastTypes'
import { INDENTS } from '@constants/indents'
import { ANIMATION_TYPES } from '@constants/animationTypes'
import { getDefaultDirections } from '@helpers/getDefaultDirections'
import { setIndents } from '@helpers/calculateIndents'
import { fixOptions } from '@helpers/fixOptions'
import { isObject } from '@helpers/isObject'
import { fixToastType } from '@helpers/fixToastType'
import { checkAndFixAnimationType } from '@helpers/checkAndFixAnimationType'
import { setBgColor } from '@helpers/setBgColor'

const methodSignature =
  'addToast(toastText [, toastHeader [, optionsObject]])'

export const getToastSettings = (
  args,
  containerPosition,
) => {
  const [showFrom, hideTo] = getDefaultDirections(
    containerPosition,
  )

  const defaultOptions = {
    lifeTime: 0,
    toastState: TOAST_STATE.WILL_APPEAR,
    type: TOAST_TYPE.DEFAULT,
    showFrom,
    hideTo,
    bgColor: TOAST_TYPE_COLORS[TOAST_TYPE.DEFAULT],
    margin: `${INDENTS.SM}px`,
    padding: `${INDENTS.SM}px`,
    animationType: ANIMATION_TYPES.EASE_IN_OUT,
  }

  args = args.slice(0, 4)
  if (args.length === 0) {
    console.error(
      `Toast text is required. ${methodSignature}`,
    )
    return null
  }
  if (
    (args.length === 1 && typeof args[0] !== 'string') ||
    (args.length === 2 &&
      !(
        typeof args[0] === 'string' &&
        (typeof args[1] === 'string' || isObject(args[1]))
      )) ||
    (args.length === 3 &&
      !(
        typeof args[0] === 'string' &&
        typeof args[1] === 'string' &&
        isObject(args[2])
      ))
  ) {
    console.error(`Wrong arguments. ${methodSignature}`)
    return null
  }
  if (args.length === 1) {
    return {
      headerText: null,
      text: args[0],
      options: defaultOptions,
    }
  }
  if (args.length === 2) {
    return {
      headerText:
        typeof args[1] === 'string' ? args[1] : null,
      text: args[0],
      options: isObject(args[1])
        ? {
            ...defaultOptions,
            ...checkAndFixOptions(args[1]),
          }
        : defaultOptions,
    }
  }
  if (args.length === 3) {
    return {
      headerText: args[1],
      text: args[0],
      options: {
        ...defaultOptions,
        ...checkAndFixOptions(args[2]),
      },
    }
  }
}

const checkAndFixOptions = optionsObj => {
  return checkAndFixAnimationType(
    setIndents(
      setBgColor(fixToastType(fixOptions(optionsObj))),
    ),
  )
}

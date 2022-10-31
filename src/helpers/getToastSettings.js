import { TOAST_STATE } from '@constants/toastStates'
import { TOAST_TYPE_COLORS } from '@constants/colors'
import { TOAST_TYPE } from '@constants/toastTypes'
import { INDENTS } from '@constants/indents'
import { ANIMATION_TYPES , CUBIC_BEZIER_FN } from '@constants/animationTypes'
import { getDefaultDirections } from '@helpers/getDefaultDirections'
import { arrayToString } from '@helpers/arrayToString'
import { setIndents } from '@helpers/calculateIndents'

const validOptionKeys = [
  'lifeTime',
  'showFrom',
  'hideTo',
  'type',
  'bgColor',
  'padding',
  'margin',
  'animationType',
]

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

const fixOptions = obj => {
  const wrongKeys = []
  Object.keys(obj).forEach(key => {
    if (!validOptionKeys.includes(key)) {
      wrongKeys.push(key)
      delete obj[key]
    }
  })
  if (wrongKeys.length > 0) {
    const text =
      wrongKeys.length === 1 ? 'option key' : 'options keys'
    console.error(
      `Unsupported ${text}: ${arrayToString(
        wrongKeys,
      )}. Available keys: ${arrayToString(
        validOptionKeys,
      )}`,
    )
  }
  return obj
}

const fixToastType = options => {
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

const setBgColor = options => {
  if (!('bgColor' in options) && 'type' in options) {
    options.bgColor = TOAST_TYPE_COLORS[options.type]
  }
  return options
}

const checkAndFixAnimationType = options => {
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

const isObject = value => {
  return value !== null && typeof value === 'object'
}

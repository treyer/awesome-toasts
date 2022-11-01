import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon/Icon.jsx'
import {
  Body,
  Header,
  IconWrapper,
  MainWrapper,
  RemoveButton,
  ToastInner,
  ToastWrapper,
} from './components'

import toaster from '@/ToastService.jsx'
import { TOAST_STATE } from '@constants/toastStates.js'
import { TOAST_TYPE } from '@constants/toastTypes.js'
import {
  HIDE_TO,
  SHOW_FROM,
} from '@constants/directions.js'
import {
  ANIMATION_TYPES,
  CUBIC_BEZIER_FN,
} from '@constants/animationTypes.js'

function Toast({
  id,
  toastState,
  text,
  headerText,
  type,
  lifeTime,
  showFrom,
  hideTo,
  bgColor,
  margin,
  padding,
  animationType,
}) {
  const [isHidden, setIsHidden] = useState(
    toastState === TOAST_STATE.WILL_APPEAR,
  )
  const [isRemoving, setIsRemoving] = useState(false)
  const [isOnLifetime, setIsOnLifetime] = useState(false)

  useEffect(() => {
    if (isHidden) {
      const timer = setTimeout(() => {
        setIsHidden(false)
        toaster.setToastStatus(id, TOAST_STATE.SHOWN)
        if (lifeTime > 0) {
          setIsOnLifetime(true)
        }
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [isHidden])

  useEffect(() => {
    if (isRemoving) {
      const timer = setTimeout(() => {
        toaster.removeToast(id)
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [isRemoving])

  useEffect(() => {
    if (isOnLifetime) {
      const timer = setTimeout(() => {
        handleRemoveToast()
      }, lifeTime)
      return () => clearTimeout(timer)
    }
  }, [isOnLifetime])

  const handleRemoveToast = () => {
    setIsHidden(true)
    setIsRemoving(true)
  }

  return (
    <ToastWrapper
      className={isHidden && 'hidden'}
      data-show={isHidden && showFrom}
      data-hide={isRemoving && hideTo}
      animationType={animationType}
      bgColor={bgColor}
      margin={margin}>
      <ToastInner padding={padding}>
        <IconWrapper>
          <Icon type={type} />
        </IconWrapper>
        <MainWrapper>
          {headerText && <Header>{headerText}</Header>}
          <Body>{text}</Body>
        </MainWrapper>
      </ToastInner>
      <RemoveButton onClick={handleRemoveToast}>
        ×
      </RemoveButton>
    </ToastWrapper>
  )
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  toastState: PropTypes.oneOf([
    TOAST_STATE.WILL_APPEAR,
    TOAST_STATE.SHOWN,
  ]).isRequired,
  text: PropTypes.string.isRequired,
  headerText: PropTypes.string,
  type: PropTypes.oneOf([
    TOAST_TYPE.DEFAULT,
    TOAST_TYPE.INFO,
    TOAST_TYPE.SUCCESS,
    TOAST_TYPE.DANGER,
    TOAST_TYPE.WARNING,
  ]).isRequired,
  lifeTime: PropTypes.number,
  showFrom: PropTypes.oneOf([
    SHOW_FROM.LEFT,
    SHOW_FROM.RIGHT,
    SHOW_FROM.TOP,
    SHOW_FROM.BOTTOM,
  ]).isRequired,
  hideTo: PropTypes.oneOf([
    HIDE_TO.LEFT,
    HIDE_TO.RIGHT,
    HIDE_TO.TOP,
    HIDE_TO.BOTTOM,
  ]).isRequired,
  bgColor: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  animationType: PropTypes.oneOf([
    ANIMATION_TYPES.EASE,
    ANIMATION_TYPES.EASE_IN,
    ANIMATION_TYPES.EASE_OUT,
    ANIMATION_TYPES.EASE_IN_OUT,
    ANIMATION_TYPES.LINEAR,
    ANIMATION_TYPES.STEP_START,
    ANIMATION_TYPES.STEP_END,
    CUBIC_BEZIER_FN,
  ]).isRequired,
}

export default Toast

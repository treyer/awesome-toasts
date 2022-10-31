import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {
  Body,
  Header,
  RemoveButton,
  ToastInner,
  ToastWrapper,
} from './components'

import toaster from '@/ToastService'
import { TOAST_STATE } from '@constants/toastStates'

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
        {headerText && <Header>{headerText}</Header>}
        <Body>{text}</Body>
      </ToastInner>
      <RemoveButton onClick={handleRemoveToast}>
        ×
      </RemoveButton>
    </ToastWrapper>
  )
}

Toast.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
}

export default Toast

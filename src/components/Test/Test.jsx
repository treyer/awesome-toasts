import React, { useRef, useState } from 'react'

import ToastContainer from '@components/ToastContainer/ToastContainer'

import toaster from '@/ToastService'
import { POSITION_TYPE } from '@constants/positions'
import { SHOW_FROM, HIDE_TO } from '@constants/directions'
import { TOAST_TYPE } from '@constants/toastTypes'

function Test({ position = POSITION_TYPE.TOP_CENTER }) {
  const count = useRef(0)

  const [isContainerShown, setIsContainerShown] =
    useState(true)

  const handleShowContainer = () => {
    setIsContainerShown(prev => !prev)
  }

  const handleAddToast = () => {
    toaster.addToast(
      `Some Text Some Text Some Text Some Text Some Text Some Text Some Text${count.current}`,
      `Some Header ${count.current}`,
      {
        showFrom: SHOW_FROM.TOP,
        hideTo: HIDE_TO.BOTTOM,
        margin: 'lg sm 12 12',
        // padding: 'lg',
        type: TOAST_TYPE.WARNING,
        // animationType: 'ease-in',
        // bgColor: 'grey',
        lifeTime: '2000',
      },
    )
    count.current = count.current + 1
  }

  const handleAddToastWithLifecycle = () => {
    toaster.addToast(
      `Some Text ${count.current}`,
      `Some Header ${count.current}`,
      {
        showFrom: SHOW_FROM.RIGHT,
        hideTo: HIDE_TO.LEFT,
        lifeTime: 2000,
        type: TOAST_TYPE.INFO,
      },
    )
    count.current = count.current + 1
  }

  return (
    <React.Fragment>
      <button onClick={handleShowContainer}>
        Show/Hide container
      </button>
      <button onClick={handleAddToast}>Add Toast</button>
      <button onClick={handleAddToastWithLifecycle}>
        Add Toast With Lifecycle
      </button>
      {isContainerShown && (
        <ToastContainer position={position} />
      )}
    </React.Fragment>
  )
}

export default Test

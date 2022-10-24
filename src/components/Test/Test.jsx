import React, { useRef, useState } from 'react'
import toaster from '../../ToastService'

import ToastContainer from '../ToastContainer/ToastContainer'

function Test() {
  const count = useRef(0)

  const [isContainerShown, setIsContainerShown] =
    useState(true)

  const handleShowContainer = () => {
    setIsContainerShown(prev => !prev)
  }

  const handleAddToast = () => {
    toaster.addToast(`Some Text ${count.current}`)
    count.current = count.current + 1
  }

  const handleAddToastWithLifecycle = () => {
    toaster.addToast(`Some Text ${count.current}`, 2000)
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
      {isContainerShown && <ToastContainer />}
    </React.Fragment>
  )
}

export default Test

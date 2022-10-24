import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { ContainerWrapper } from './components'

import toaster from '../../ToastService'
import {
  ROOT_CONTAINER_ID,
  ROOT_ID,
} from '../../constants/common'

function ToastContainer({ position }) {
  const rootElement = document.createElement('div')
  rootElement.id = ROOT_ID
  document.body.append(rootElement)

  useEffect(() => {
    toaster.setRenderRoot()

    return () => {
      const root = document.getElementById(ROOT_ID)
      if (root) root.remove()
      toaster.dropRenderRoot()
    }
  })

  return ReactDOM.createPortal(
    <ContainerWrapper
      id={ROOT_CONTAINER_ID}
      data-position={position}
    />,
    rootElement,
  )
}

export default ToastContainer

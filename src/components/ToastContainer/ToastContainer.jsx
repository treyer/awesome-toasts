import React, {
  useState,
  useLayoutEffect,
  useEffect,
} from 'react'
import ReactDOM from 'react-dom'

import { ContainerWrapper } from './components'

import {
  ROOT_CONTAINER_ID,
  ROOT_ID,
} from '@constants/common'
import { POSITION_TYPE } from '@constants/positions'
import toaster from '@/ToastService'

function createRootElement(rootId) {
  const rootElement = document.createElement('div')
  rootElement.id = rootId
  document.body.append(rootElement)
  return rootElement
}

function ToastContainer({
  position = POSITION_TYPE.TOP_RIGHT,
  rootId = ROOT_ID,
}) {
  const [rootElement, setRootElement] = useState(null)

  useEffect(() => {
    toaster.setContainerPosition(position)
    return () => toaster.setContainerPosition(null)
  }, [])

  useLayoutEffect(() => {
    let element = document.getElementById(rootId)
    let systemCreated = false

    if (!element) {
      systemCreated = true
      element = createRootElement(rootId)
    }
    setRootElement(element)

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [rootId])

  if (rootElement === null) return null

  return ReactDOM.createPortal(
    <ContainerWrapper
      id={ROOT_CONTAINER_ID}
      data-position={position}
    />,
    rootElement,
  )
}

export default ToastContainer

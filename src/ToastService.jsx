import React from 'react'
import ReactDOM from 'react-dom/client'
import { v4 as uuid } from 'uuid'

import Toast from '@components/Toast/Toast.jsx'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.jsx'

import { getToastSettings } from '@helpers/getToastSettings.js'
import { ROOT_CONTAINER_ID } from '@constants/common.js'
import { ANIMATION_DURATION } from '@constants/common.js'
import { TOAST_STATES } from '@constants/toastStates.js'
import { ANIMATION_DIRECTIONS } from '@constants/animationDirections.js'

class ToastService {
  constructor() {
    this.toasts = []
    this.queue = []
    this.root = null
    this.renderRoot = null
    this.containerPosition = null
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToastService()
    }
    return this.instance
  }

  getToastById(toastId) {
    return this.toasts.find(el => el.id === toastId)
  }

  addToast(...args) {
    const { text, headerText, options } = getToastSettings(
      args,
      this.containerPosition,
    )
    const toast = {
      id: uuid(),
      state: TOAST_STATES.INIT,
      timer: null,
      headerText,
      text,
      options,
    }
    if (this.toasts.length < 3) {
      this.toasts.push(toast)
      this.renderToasts(this.hydrateToasts(this.toasts))
    } else {
      this.queue.push(toast)
    }
  }

  initRemove(toastId) {
    const toast = this.getToastById(toastId)
    if (toast.state === TOAST_STATES.INIT) {
      toast.state = TOAST_STATES.ON_REMOVE
      if (toast.timer) {
        clearTimeout(toast.timer)
        toast.timer = null
      }
      const timer = setTimeout(() => {
        this.removeToast(toastId)
      }, ANIMATION_DURATION - 50)
      toast.timer = timer
      this.renderToasts(this.hydrateToasts(this.toasts))
    }
  }

  removeToast(toastId) {
    const toast = this.getToastById(toastId)
    if (toast.timer) {
      clearTimeout(toast.timer)
    }
    this.toasts = this.toasts.filter(
      el => el.id !== toastId,
    )
    if (this.queue.length > 0) {
      this.toasts.push(this.queue.shift())
    }
    this.renderToasts(this.hydrateToasts(this.toasts))
  }

  activateToastTimers = toasts => {
    toasts.forEach(toast => {
      if (!toast.timer) {
        if (toast.options.lifeTime > 0) {
          const timer = setTimeout(() => {
            this.initRemove(toast.id)
          }, toast.options.lifeTime + ANIMATION_DURATION)
          toast.timer = timer
        }
      }
    })
  }

  hydrateToasts(toasts) {
    this.activateToastTimers(toasts)
    return (
      <ErrorBoundary>
        {toasts.map(toast => {
          const { lifeTime, showFrom, hideTo, ...rest } =
            toast.options

          return (
            <Toast
              key={toast.id}
              id={toast.id}
              headerText={toast.headerText}
              text={toast.text}
              animationName={
                toast.state === TOAST_STATES.INIT
                  ? showFrom
                  : hideTo
              }
              animationDirection={
                toast.state === TOAST_STATES.INIT
                  ? ANIMATION_DIRECTIONS.NORMAL
                  : ANIMATION_DIRECTIONS.REVERSE
              }
              {...rest}
            />
          )
        })}
      </ErrorBoundary>
    )
  }

  renderToasts(hydratedToasts) {
    if (!this.root) {
      this.root = document.getElementById(ROOT_CONTAINER_ID)
      this.renderRoot = ReactDOM.createRoot(this.root)
    } else {
      const currentRoot = document.getElementById(
        ROOT_CONTAINER_ID,
      )
      if (currentRoot !== this.root) {
        this.root = currentRoot
        this.renderRoot = ReactDOM.createRoot(this.root)
      }
    }
    this.renderRoot.render(hydratedToasts)
  }

  setContainerPosition(position) {
    this.containerPosition = position
  }
}

const toaster = ToastService.getInstance()

export default toaster

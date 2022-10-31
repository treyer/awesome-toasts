import React from 'react'
import ReactDOM from 'react-dom/client'
import { v4 as uuid } from 'uuid'

import Toast from '@components/Toast/Toast.jsx'
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.jsx'

import { ROOT_CONTAINER_ID } from '@constants/common.js'
import { getToastSettings } from '@helpers/getToastSettings.js'

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
    const settings = getToastSettings(
      args,
      this.containerPosition,
    )
    if (settings) {
      const { text, headerText, options } = settings
      const toast = {
        id: uuid(),
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
  }

  removeToast(toastId) {
    this.toasts = this.toasts.filter(
      el => el.id !== toastId,
    )
    if (this.queue.length > 0) {
      this.toasts.push(this.queue.shift())
    }
    this.renderToasts(this.hydrateToasts(this.toasts))
  }

  setToastStatus(toastId, state) {
    this.toasts.map(el => {
      if (el.id === toastId) el.toastState = state
      return el
    })
  }

  hydrateToasts(toasts) {
    return (
      <ErrorBoundary>
        {toasts.map(toast => {
          return (
            <Toast
              key={toast.id}
              id={toast.id}
              headerText={toast.headerText}
              text={toast.text}
              {...toast.options}
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

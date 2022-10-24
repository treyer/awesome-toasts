import React from 'react'
import ReactDOM from 'react-dom/client'
import { v4 as uuid } from 'uuid'

import Toast from './components/Toast/Toast'

import { ROOT_CONTAINER_ID } from './constants/common'

class ToastService {
  constructor() {
    this.toasts = []
    this.queue = []
    this.renderRoot = null
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToastService()
    }
    return this.instance
  }

  getToasts() {
    return this.toasts
  }

  addToast(text) {
    const toastId = uuid()
    if (this.toasts.length < 3) {
      this.toasts.push({
        id: toastId,
        text,
      })
      this.renderToasts(this.hydrateToasts(this.toasts))
    } else {
      this.queue.push({ id: toastId, text })
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

  hydrateToasts(toasts) {
    return toasts.map(toast => {
      return (
        <Toast
          key={toast.id}
          id={toast.id}
          text={toast.text}
        />
      )
    })
  }

  renderToasts(hydratedToasts) {
    if (this.renderRoot === null) {
      this.renderRoot = ReactDOM.createRoot(
        document.getElementById(ROOT_CONTAINER_ID),
      )
    }
    this.renderRoot.render(hydratedToasts)
  }

  dropRenderRoot() {
    this.renderRoot = null
  }
}

const toaster = ToastService.getInstance()

export default toaster

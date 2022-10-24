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

  getToastById(toastId) {
    return this.toasts.find(el => el.id === toastId)
  }

  addToast(text, lifeTime = 0) {
    const toastId = uuid()
    if (this.toasts.length < 3) {
      const timer =
        lifeTime > 0
          ? setTimeout(() => {
              this.removeToast(toastId)
            }, lifeTime)
          : null
      this.toasts.push({
        id: toastId,
        text,
        timer,
      })
      this.renderToasts(this.hydrateToasts(this.toasts))
    } else {
      this.queue.push({ id: toastId, text, lifeTime })
    }
  }

  addToastFromQueue(toast) {
    const timer =
      toast.lifeTime > 0
        ? setTimeout(() => {
            this.removeToast(toast.id)
          }, toast.lifeTime)
        : null
    this.toasts.push({
      id: toast.id,
      text: toast.text,
      timer,
    })
  }

  removeToast(toastId) {
    const toast = this.getToastById(toastId)
    if (toast.timer) clearTimeout(toast.timer)
    this.toasts = this.toasts.filter(
      el => el.id !== toastId,
    )
    if (this.queue.length > 0) {
      this.addToastFromQueue(this.queue.shift())
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
    this.renderRoot.render(hydratedToasts)
  }

  dropRenderRoot() {
    this.renderRoot.unmount()
  }

  setRenderRoot() {
    this.renderRoot = ReactDOM.createRoot(
      document.getElementById(ROOT_CONTAINER_ID),
    )
    console.log('set root')
  }
}

const toaster = ToastService.getInstance()

export default toaster

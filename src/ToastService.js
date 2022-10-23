import { v4 as uuid } from 'uuid'
import Toast from './components/Toast/Toast'

class ToastService {
  constructor() {
    this.toasts = []
    this.subscribers = []
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToastService()
    }
    return this.instance
  }

  subscribe(callback) {
    this.subscribers.push(callback)
  }

  notifyAll() {
    this.subscribers.forEach((callback) => callback())
  }

  getToasts() {
    return this.toasts
  }

  addToast(text) {
    const toastId = uuid()
    this.toasts.push({
      id: toastId,
      toast: (
        <Toast key={toastId} text={text} id={toastId} />
      ),
    })
    this.notifyAll()
  }

  removeToast(toastId) {
    this.toasts = this.toasts.filter(
      (el) => el.id !== toastId,
    )
    this.notifyAll()
  }
}

const toaster = ToastService.getInstance()

export default toaster

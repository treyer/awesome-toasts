function ToastContainerInner({ toasts }) {
  return <>{toasts.map((el) => el.toast)}</>;
}

export default ToastContainerInner;

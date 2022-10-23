import toaster from '../../ToastService'
import { RemoveButton, ToastWrapper } from './components'
import PropTypes from 'prop-types'

function Toast({ id, text }) {
  const handleRemoveToast = () => {
    toaster.removeToast(id)
  }

  return (
    <ToastWrapper>
      {text}
      <RemoveButton onClick={handleRemoveToast}>
        x
      </RemoveButton>
    </ToastWrapper>
  )
}

Toast.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
}

export default Toast

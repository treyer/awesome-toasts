import React from 'react'
import PropTypes from 'prop-types'

function Toast({ backgroundColor }) {
  const styles = { backgroundColor }
  return <div style={styles}>Hello from Toast!!!</div>
}

Toast.propTypes = {
  backgroundColor: PropTypes.string,
}

export default Toast

import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <React.Fragment>
          <h3>Something went wrong with Toasts.</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error &&
              this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </React.Fragment>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ErrorBoundary

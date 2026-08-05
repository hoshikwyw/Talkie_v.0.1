import { Component } from 'react'
import Button from './Button'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.assign('/')
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
        <div className="panel w-full max-w-sm p-8 text-center">
          <h1 className="mb-4 font-pixel text-pixel-md text-danger text-shadow-pixel">GAME OVER</h1>
          <p className="mb-7 font-body text-xl text-muted">
            Something went wrong. Don&apos;t worry — your messages are safe.
          </p>
          <Button fullWidth onClick={this.handleReset}>
            Continue?
          </Button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary

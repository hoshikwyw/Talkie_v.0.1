import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-surface-darker gap-6">
          <div className="pixel-card p-8 text-center max-w-sm">
            <h1 className="font-pixel text-sm text-pixel-red mb-4 text-shadow-pixel">
              GAME OVER
            </h1>
            <p className="font-body text-xl text-pixel-cream mb-6">
              Something went wrong. Don't worry, your progress is saved!
            </p>
            <button
              className="pixel-btn-primary"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.href = '/'
              }}
            >
              CONTINUE?
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

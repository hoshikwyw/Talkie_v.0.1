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
    console.error("ErrorBoundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-base-content/70">An unexpected error occurred.</p>
          <button
            className="btn btn-neutral btn-sm"
            onClick={() => {
              this.setState({ hasError: false })
              window.location.href = '/'
            }}
          >
            Go Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

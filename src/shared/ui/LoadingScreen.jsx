/** Full-page loading state, shared by the auth gate and route suspense. */
const LoadingScreen = ({ label = 'Loading' }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-screen flex-col items-center justify-center gap-5 bg-canvas"
  >
    <span className="animate-blink font-pixel text-pixel-lg text-primary text-shadow-pixel">
      {label}
    </span>
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent [animation-delay:150ms]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
    </div>
  </div>
)

export default LoadingScreen

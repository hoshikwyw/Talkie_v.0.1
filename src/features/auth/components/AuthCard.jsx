/** The shell both auth screens were each spelling out by hand. */
const AuthCard = ({ subtitle, children, footer }) => (
  <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
    <div className="panel w-full max-w-sm p-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 animate-float font-pixel text-pixel-lg text-primary text-shadow-pixel">
          Talkie
        </h1>
        <p className="font-body text-xl text-muted">{subtitle}</p>
      </header>

      {children}

      {footer && <p className="mt-6 text-center font-body text-muted">{footer}</p>}
    </div>
  </div>
)

export const AuthDivider = () => (
  <div className="my-6 flex items-center gap-3" role="separator">
    <span className="flex-1 border-t-2 border-dashed border-muted/20" />
    <span className="font-pixel text-label uppercase text-muted">or</span>
    <span className="flex-1 border-t-2 border-dashed border-muted/20" />
  </div>
)

export default AuthCard

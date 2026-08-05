import { useId } from 'react'
import { cn } from '@/shared/lib/cn'

/** Label, control and error message wired together for screen readers. */
const TextField = ({ label, error, hint, className, id, trailing, ...props }) => {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="field-label">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn('input', trailing && 'pr-12', error && 'input-invalid')}
          {...props}
        />
        {/* Slot for an in-field control, e.g. reveal password. */}
        {trailing && (
          <div className="absolute inset-y-0 right-1.5 flex items-center">{trailing}</div>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 font-body text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 font-body text-sm text-muted">{hint}</p>
      )}
    </div>
  )
}

export default TextField

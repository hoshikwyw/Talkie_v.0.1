import { cn } from '@/shared/lib/cn'
import Spinner from './Spinner'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

// Tailwind's utilities layer outranks the components layer, so these override
// the padding baked into `.btn` without needing `!important`.
const SIZES = {
  sm: 'px-3 py-1.5 text-label',
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3',
}

/**
 * `loading` keeps the label in place and adds a spinner, so the button does not
 * change width mid-request the way swapping the text to "LOADING..." did.
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={cn(VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)}
    {...props}
  >
    {loading && <Spinner size={size === 'sm' ? 12 : 14} />}
    {children}
  </button>
)

export default Button

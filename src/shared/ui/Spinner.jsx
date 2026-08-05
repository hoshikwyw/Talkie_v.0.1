import { cn } from '@/shared/lib/cn'

const Spinner = ({ size = 16, className }) => (
  <span
    role="status"
    aria-label="Loading"
    style={{ width: size, height: size }}
    className={cn(
      'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
      className
    )}
  />
)

export default Spinner

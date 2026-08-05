import { forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'

/** Icon-only button. `label` is required — it becomes the accessible name. */
const IconButton = forwardRef(({ label, className, active = false, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label={label}
    className={cn('icon-btn', active && 'bg-muted/10 text-primary', className)}
    {...props}
  />
))

IconButton.displayName = 'IconButton'

export default IconButton

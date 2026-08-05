import { cn } from '@/shared/lib/cn'

/** The "nothing here yet" block, previously re-invented on four screens. */
const EmptyState = ({ title, description, icon, action, className }) => (
  <div className={cn('flex flex-col items-center justify-center gap-2.5 px-6 py-12 text-center', className)}>
    {icon && <div className="mb-1 text-muted/60">{icon}</div>}
    <p className="font-pixel text-pixel-xs uppercase tracking-wider text-muted">{title}</p>
    {description && <p className="font-body text-lg text-muted/80">{description}</p>}
    {action && <div className="mt-3">{action}</div>}
  </div>
)

export default EmptyState

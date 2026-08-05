import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from '@/stores/userStore'
import { authErrorMessage } from '../lib/authErrors'

/**
 * Runs an auth action and hydrates the profile from it.
 *
 * Both auth screens had the same four-step dance — set a loading flag, await,
 * hydrate, toast, clear the flag — written out twice each. `pending` holds the
 * key of whichever action is in flight so only that button shows a spinner.
 */
export function useAuthSubmit() {
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo)
  const [pending, setPending] = useState(null)

  const submit = useCallback(
    async (key, action, { successMessage } = {}) => {
      setPending(key)
      try {
        const user = await action()
        await fetchUserInfo(user.uid)
        if (successMessage) toast.success(successMessage)
        return true
      } catch (error) {
        console.error('Auth action failed:', error)
        const message = authErrorMessage(error)
        if (message) toast.error(message)
        return false
      } finally {
        setPending(null)
      }
    },
    [fetchUserInfo]
  )

  return { pending, submit }
}

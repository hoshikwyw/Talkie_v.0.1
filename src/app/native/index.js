import { SplashScreen } from '@capacitor/splash-screen'
import { isNative } from '@/shared/platform'
import { initBackButton } from '@/shared/platform/backButton'
import { initSystemBars } from './systemBars'

/** Wires up the native shell. Safe to call on the web, where it does nothing. */
export async function initNativeShell() {
  if (!isNative()) return () => {}

  await initSystemBars()
  return initBackButton()
}

/**
 * Dismisses the launch screen once the app has something real to show.
 *
 * `launchShowDuration` in the Capacitor config is the backstop: if this never
 * runs the splash still goes away on its own, rather than leaving the app
 * looking frozen.
 */
export async function hideSplashScreen() {
  if (!isNative()) return

  try {
    await SplashScreen.hide()
  } catch (err) {
    console.error('Could not hide the splash screen:', err)
  }
}

import { SystemBars, SystemBarsStyle } from '@capacitor/core'
import { isNative } from '@/shared/platform'

/**
 * Every theme is dark, so the system bars always need light content. If a light
 * theme is ever added, this is the single place that has to learn about it.
 *
 * Capacitor 8 draws the app edge to edge and publishes the inset sizes as
 * `--safe-area-inset-*` CSS variables; the stylesheet consumes those, so there
 * is no colour to set here — only the icon contrast.
 */
export async function initSystemBars() {
  if (!isNative()) return

  try {
    await SystemBars.setStyle({ style: SystemBarsStyle.Dark })
  } catch (err) {
    console.error('Could not style the system bars:', err)
  }
}

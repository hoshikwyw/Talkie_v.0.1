import { Capacitor } from '@capacitor/core'

/**
 * The one place that answers "are we inside the native shell?".
 *
 * Everything platform-specific branches on this rather than sniffing the user
 * agent, so the web build keeps working untouched and the native paths stay
 * easy to find.
 */
export const isNative = () => Capacitor.isNativePlatform()

export const isAndroid = () => Capacitor.getPlatform() === 'android'

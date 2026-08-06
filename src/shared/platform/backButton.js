import { useEffect, useRef } from 'react'
import { App } from '@capacitor/app'
import { isNative } from './index'

/**
 * Android's hardware back button, layered.
 *
 * A chat app has several things "back" could mean — dismiss a dialog, close a
 * slide-over, leave the conversation, leave the screen — and the right one
 * depends on what is on top. Handlers register as they mount and are offered
 * the event innermost-first; the first to return `true` consumes it. If none
 * do, the app exits, which is what Android users expect from the root screen.
 */
const handlers = []

export function useBackButton(handler, enabled = true) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!enabled || !isNative()) return undefined

    const entry = () => handlerRef.current()
    handlers.push(entry)

    return () => {
      const index = handlers.indexOf(entry)
      if (index !== -1) handlers.splice(index, 1)
    }
  }, [enabled])
}

/** @returns a function that removes the native listener. */
export async function initBackButton() {
  if (!isNative()) return () => {}

  const listener = await App.addListener('backButton', () => {
    for (let index = handlers.length - 1; index >= 0; index -= 1) {
      if (handlers[index]() === true) return
    }
    App.exitApp()
  })

  return () => listener.remove()
}

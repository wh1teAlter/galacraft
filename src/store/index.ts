import type { StateCreator } from 'zustand/vanilla'
import { createStore } from 'zustand/vanilla'
import { subscribeWithSelector } from 'zustand/middleware'
import { useStore as useZustandStore } from 'zustand'
import { shallow } from 'zustand/shallow'

export interface AppState {
}

export const appStateCreator: StateCreator<AppState> = (/* set, get */) => ({
})

const storeWithSubscribe = subscribeWithSelector(appStateCreator)

export const appStore = createStore(storeWithSubscribe)

export function useAppStore<T = AppState>(selector: (state: AppState) => T): T {
  return useZustandStore(appStore, selector, shallow)
}

export function appSubscribe<T extends keyof AppState>(val: T,
  fn: (val: AppState[T], pre: AppState[T]) => void,
  fireImmediately?: boolean) {
  return appStore.subscribe(s => s[val], fn, {
    equalityFn: shallow,
    fireImmediately,
  })
}

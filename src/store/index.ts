import { subscribeWithSelector } from 'zustand/middleware'
import { useStore as useZustandStore } from 'zustand'
import type { StateCreator } from 'zustand/vanilla'
import { createStore } from 'zustand/vanilla'
import { shallow } from 'zustand/shallow'
import { produce } from 'immer'
import type { Vector3 } from '@galacean/engine'
import { Vector2 } from '@galacean/engine'
import type { BlockID, OriginChunk, Section } from '../constants'
import { sectionHeight, sectionSize } from '../constants'

export interface AppState {
  chunkData: Record<string, Section>
  initChunkData: (data: OriginChunk) => void
  setSection: (key: Vector2, value: Section) => void
  getSection: (key: Vector2) => Section | null
  setBlock: (key: Vector2, index: Vector3, value: BlockID) => void
  getBlock: (key: Vector2, index: Vector3) => BlockID | null
}

export const appStateCreator: StateCreator<AppState> = (set, get) => ({
  chunkData: {},
  initChunkData: (data: OriginChunk) => {
    const { setSection } = get()
    data.forEach((originSection) => {
      const key = new Vector2(originSection.position.x, originSection.position.y)
      let index = 0
      const section: Section = []
      for (let x = 0; x < sectionSize; x++) {
        if (!section[x])
          section[x] = []
        for (let y = 0; y < sectionHeight; y++) {
          if (!section[x][y])
            section[x][y] = []
          for (let z = 0; z < sectionSize; z++) {
            section[x][y][z] = originSection.data[index] as BlockID
            index += 1
          }
        }
      }
      setSection(key, section)
    })
  },
  setSection: (key: Vector2, value: Section) => {
    const k = `${key.x}_${key.y}`
    set(produce((s: AppState) => {
      s.chunkData[k] = value
    }))
  },
  getSection(key: Vector2) {
    const { chunkData } = get()
    const k = `${key.x}_${key.y}`
    if (chunkData[k])
      return chunkData[k]
    return null
  },
  setBlock(key: Vector2, index: Vector3, value: BlockID) {
    const { chunkData } = get()
    const k = `${key.x}_${key.y}`
    if (chunkData[k][index.x][index.y][index.z]) {
      set(produce((s: AppState) => {
        s.chunkData[k][index.x][index.y][index.z] = value
      }))
    }
  },
  getBlock(key: Vector2, index: Vector3) {
    const { getSection } = get()
    const section = getSection(key)
    if (section?.[index.x]?.[index.y]?.[index.z])
      return section[index.x][index.y][index.z]
    return null
  },
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

import { Vector2 } from '@galacean/engine'
import { voxelSurfLength } from './voxel'
import type { BlockMap } from './types'
import { BlockID, Surf } from './types'

export const subMeshMax = 65535 - voxelSurfLength

export const blockMap: BlockMap = {
  [BlockID.blank]: {
    display: 'transparent',
    uvOffset: {
      [Surf.back]: new Vector2(0.0, 0.0),
      [Surf.front]: new Vector2(0.0, 0.0),
      [Surf.top]: new Vector2(0.0, 0.0),
      [Surf.bottom]: new Vector2(0.0, 0.0),
      [Surf.left]: new Vector2(0.0, 0.0),
      [Surf.right]: new Vector2(0.0, 0.0),
    },
  },
  [BlockID.clod]: {
    display: 'opaque',
    uvOffset: {
      [Surf.back]: new Vector2(0.25, 0.0),
      [Surf.front]: new Vector2(0.25, 0.0),
      [Surf.top]: new Vector2(0.25, 0.0),
      [Surf.bottom]: new Vector2(0.25, 0.0),
      [Surf.left]: new Vector2(0.25, 0.0),
      [Surf.right]: new Vector2(0.25, 0.0),
    },
  },
}

export const sectionSize = 16

export const sectionHeight = 64

export const chunkSize = 3

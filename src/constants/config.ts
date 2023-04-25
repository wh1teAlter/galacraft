import { Vector2 } from '@galacean/engine'
import { BlockID, voxelSurfLength } from '.'
import type { BlockMap } from '.'

export const subMeshMax = 65535 - voxelSurfLength

export const blockMap: BlockMap = {
  [BlockID.blank]: {
    display: 'transparent',
  },
  [BlockID.clod]: {
    display: 'opaque',
    uvOffset: {
      default: new Vector2(0.25, 0.0),
    },
  },
}

export const sectionSize = 16

export const sectionHeight = 64

export const chunkSize = 3

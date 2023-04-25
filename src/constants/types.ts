import type { Vector2 } from '@galacean/engine'

export enum BlockID {
  blank = '1',
  clod = '2',
}

export enum Surf {
  back = '1',
  front = '2',
  top = '3',
  bottom = '4',
  left = '5',
  right = '6',
}

export type BlockMap = {
  [k in BlockID]: {
    // size: number
    display: 'translucent' | 'opaque' | 'transparent'
    uvOffset?: { [s in Surf]?: Vector2 } & { default?: Vector2 }
  }
}

// export type Section = string[][]

export interface OriginSection {
  data: string
  position: {
    x: number
    y: number
  }
}

// export type Chunk = Section[][]

export type OriginChunk = OriginSection[]

export type UV = {
  [k in BlockID]: {
    [l in Surf]: Vector2[]
  }
}

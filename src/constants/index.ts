import { Vector2, Vector3 } from '@galacean/engine'

import { TypeMap } from './config'

export const voxelVerts = [
  new Vector3(0.0, 0.0, 0.0),
  new Vector3(1.0, 0.0, 0.0),
  new Vector3(1.0, 1.0, 0.0),
  new Vector3(0.0, 1.0, 0.0),
  new Vector3(0.0, 0.0, 1.0),
  new Vector3(1.0, 0.0, 1.0),
  new Vector3(1.0, 1.0, 1.0),
  new Vector3(0.0, 1.0, 1.0),
]

export const voxelUV = [
  new Vector2(0.0, 0.0),
  new Vector2(0.0, 1.0),
  new Vector2(1.0, 0.0),
  new Vector2(1.0, 0.0),
  new Vector2(0.0, 1.0),
  new Vector2(1.0, 1.0),
]

export enum Surf {
  back = 1,
  front,
  top,
  bottom,
  left,
  right,
}

type UV = {
  [k in TypeMap]: {
    [l in Surf]: Vector2[]
  }
}

export const UVMap: UV = {
  [TypeMap.clod]: {
    [Surf.back]: [],
    [Surf.front]: [],
    [Surf.top]: [],
    [Surf.bottom]: [],
    [Surf.left]: [],
    [Surf.right]: [],
  },
}

export const voxelSurf = {
  [Surf.back]: [voxelVerts[0], voxelVerts[3], voxelVerts[1], voxelVerts[1], voxelVerts[3], voxelVerts[2]],
  [Surf.front]: [voxelVerts[5], voxelVerts[6], voxelVerts[4], voxelVerts[4], voxelVerts[6], voxelVerts[7]],
  [Surf.top]: [voxelVerts[3], voxelVerts[7], voxelVerts[2], voxelVerts[2], voxelVerts[7], voxelVerts[6]],
  [Surf.bottom]: [voxelVerts[1], voxelVerts[5], voxelVerts[0], voxelVerts[0], voxelVerts[5], voxelVerts[4]],
  [Surf.left]: [voxelVerts[4], voxelVerts[7], voxelVerts[0], voxelVerts[0], voxelVerts[7], voxelVerts[3]],
  [Surf.right]: [voxelVerts[1], voxelVerts[2], voxelVerts[5], voxelVerts[5], voxelVerts[2], voxelVerts[6]],
}

export const voxelNormal = {
  [Surf.back]: Array(6).fill(new Vector3(0.0, 0.0, -1.0)) as Vector3[],
  [Surf.front]: Array(6).fill(new Vector3(0.0, 0.0, 1.0)) as Vector3[],
  [Surf.top]: Array(6).fill(new Vector3(0.0, 1.0, 0.0)) as Vector3[],
  [Surf.bottom]: Array(6).fill(new Vector3(0.0, -1.0, 0.0)) as Vector3[],
  [Surf.left]: Array(6).fill(new Vector3(-1.0, 0.0, 0.0)) as Vector3[],
  [Surf.right]: Array(6).fill(new Vector3(1.0, 0.0, 0.0)) as Vector3[],
}

function moveUV(type: TypeMap, surf: Surf) {
  switch (type) {
    case TypeMap.clod:
      switch (surf) {
        case Surf.top:
          voxelUV.forEach((uv) => {
            UVMap[type][surf].push(uv.clone().add(new Vector2(0.25, 0.0)))
          })
          break
        case Surf.bottom:
          voxelUV.forEach((uv) => {
            UVMap[type][surf].push(uv.clone().add(new Vector2(0.25, 0.0)))
          })
          break
        default:
          voxelUV.forEach((uv) => {
            UVMap[type][surf].push(uv.clone().add(new Vector2(0.25, 0.0)))
          })
          break
      }
      break
    default:
      break
  }
}

export function computedUV() {
  voxelUV.forEach((i) => {
    i.scale(0.25)
  })
  const types = Object.keys(UVMap).map(i => Number(i)) as TypeMap[]
  types.forEach((type) => {
    const surfs = Object.keys(UVMap[type]).map(i => Number(i)) as Surf[]
    surfs.forEach((surf) => {
      UVMap[type][surf].push()
      moveUV(type, surf)
    })
  })
}

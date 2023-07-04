import { Vector2, Vector3 } from '@galacean/engine'
import { Surf } from './types'

export const countInTex = 4

const voxelUV = [
  new Vector2(0.0, 0.0),
  new Vector2(0.0, 1.0),
  new Vector2(1.0, 0.0),
  // new Vector2(1.0, 0.0),
  // new Vector2(0.0, 1.0),
  new Vector2(1.0, 1.0),
]

voxelUV.forEach(uv => uv.scale(1 / countInTex))

export { voxelUV }

export const voxelVert = [
  new Vector3(0.0, 0.0, 0.0),
  new Vector3(1.0, 0.0, 0.0),
  new Vector3(1.0, 1.0, 0.0),
  new Vector3(0.0, 1.0, 0.0),
  new Vector3(0.0, 0.0, 1.0),
  new Vector3(1.0, 0.0, 1.0),
  new Vector3(1.0, 1.0, 1.0),
  new Vector3(0.0, 1.0, 1.0),
]

export const voxelSurf = {
  [Surf.back]: [voxelVert[0], voxelVert[3], voxelVert[1], /* voxelVert[1], voxelVert[3], */ voxelVert[2]],
  [Surf.front]: [voxelVert[5], voxelVert[6], voxelVert[4], /* voxelVert[4], voxelVert[6], */ voxelVert[7]],
  [Surf.top]: [voxelVert[3], voxelVert[7], voxelVert[2], /* voxelVert[2], voxelVert[7], */ voxelVert[6]],
  [Surf.bottom]: [voxelVert[1], voxelVert[5], voxelVert[0], /* voxelVert[0], voxelVert[5], */ voxelVert[4]],
  [Surf.left]: [voxelVert[4], voxelVert[7], voxelVert[0], /* voxelVert[0], voxelVert[7], */ voxelVert[3]],
  [Surf.right]: [voxelVert[1], voxelVert[2], voxelVert[5], /* voxelVert[5], voxelVert[2], */ voxelVert[6]],
}

export const voxelIndices = [0, 1, 2, 2, 1, 3]

export const voxelSurfLength = 24

// export const voxelNormal = {
//   [Surf.back]: Array(6).fill(new Vector3(0.0, 0.0, -1.0)) as Vector3[],
//   [Surf.front]: Array(6).fill(new Vector3(0.0, 0.0, 1.0)) as Vector3[],
//   [Surf.top]: Array(6).fill(new Vector3(0.0, 1.0, 0.0)) as Vector3[],
//   [Surf.bottom]: Array(6).fill(new Vector3(0.0, -1.0, 0.0)) as Vector3[],
//   [Surf.left]: Array(6).fill(new Vector3(-1.0, 0.0, 0.0)) as Vector3[],
//   [Surf.right]: Array(6).fill(new Vector3(1.0, 0.0, 0.0)) as Vector3[],
// }

export const surfCheck = {
  [Surf.back]: new Vector3(0.0, 0.0, -1.0),
  [Surf.front]: new Vector3(0.0, 0.0, 1.0),
  [Surf.top]: new Vector3(0.0, 1.0, 0.0),
  [Surf.bottom]: new Vector3(0.0, -1.0, 0.0),
  [Surf.left]: new Vector3(-1.0, 0.0, 0.0),
  [Surf.right]: new Vector3(1.0, 0.0, 0.0),
}

export const surfs = Object.keys(voxelSurf) as Surf[]

export function scaleUV() {
  voxelUV.forEach((i) => {
    i.scale(0.25)
  })
}

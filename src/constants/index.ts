import { Vector2, Vector3 } from '@galacean/engine'

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

export const voxelSurf = {
  back: [voxelVerts[0], voxelVerts[3], voxelVerts[1], voxelVerts[1], voxelVerts[3], voxelVerts[2]],
  front: [voxelVerts[5], voxelVerts[6], voxelVerts[4], voxelVerts[4], voxelVerts[6], voxelVerts[7]],
  top: [voxelVerts[3], voxelVerts[7], voxelVerts[2], voxelVerts[2], voxelVerts[7], voxelVerts[6]],
  bottom: [voxelVerts[1], voxelVerts[5], voxelVerts[0], voxelVerts[0], voxelVerts[5], voxelVerts[4]],
  left: [voxelVerts[4], voxelVerts[7], voxelVerts[0], voxelVerts[0], voxelVerts[7], voxelVerts[3]],
  right: [voxelVerts[1], voxelVerts[2], voxelVerts[5], voxelVerts[5], voxelVerts[2], voxelVerts[6]],
}

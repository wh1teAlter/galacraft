import type { WebGLEngine } from '@galacean/engine'
import { BlinnPhongMaterial, Color, Entity, MeshRenderer, ModelMesh } from '@galacean/engine'

import { voxelSurf, voxelUV } from '../../constants'

export function createCube(engine: WebGLEngine) {
  const entity = new Entity(engine, 'cube_entity')

  Object.values(voxelSurf).forEach((surf) => {
    const modelMesh = new ModelMesh(engine)
    modelMesh.setPositions(surf)
    modelMesh.setUVs(voxelUV)
    modelMesh.addSubMesh(0, surf.length)
    modelMesh.uploadData(false)

    const material = new BlinnPhongMaterial(engine)
    material.baseColor = new Color(1, 0.25, 0.25, 1)

    const meshRenderer = entity.addComponent(MeshRenderer)
    meshRenderer.mesh = modelMesh
    meshRenderer.setMaterial(material)
  })

  return { entity }
}

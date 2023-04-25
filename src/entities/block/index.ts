import { AssetType, Entity, MeshRenderer, ModelMesh, TextureFilterMode, TextureWrapMode, UnlitMaterial } from '@galacean/engine'
import type { Texture2D, Vector3, WebGLEngine } from '@galacean/engine'

import { voxelNormal, voxelSurf } from '../../constants'
import type { Surf } from '../../constants'

export async function createBlock(engine: WebGLEngine) {
  const entity = new Entity(engine, 'block_entity')
  const p: Vector3[] = []
  // const uv: Vector2[] = []
  const normal: Vector3[] = []
  const surfs = Object.keys(voxelSurf).map(i => Number(i)) as Surf[]
  surfs.forEach((surf) => {
    p.push(...voxelSurf[surf])
    // uv.push(...UVMap[BlockID.clod][surf])
    normal.push(...voxelNormal[surf])
  })

  const modelMesh = new ModelMesh(engine)
  modelMesh.setPositions(p)
  modelMesh.setNormals(normal)
  // modelMesh.setUVs(uv)
  modelMesh.addSubMesh(0, p.length)
  modelMesh.uploadData(false)

  const material = new UnlitMaterial(engine)
  material.baseTexture = await engine.resourceManager.load<Texture2D>({
    type: AssetType.Texture2D,
    url: 'https://mdn.alipayobjects.com/afts/img/A*RlTnSoieYvkAAAAAAAAAAAAADrd2AQ/texu.png',
  })
  material.baseTexture.wrapModeU = TextureWrapMode.Clamp
  material.baseTexture.wrapModeV = TextureWrapMode.Clamp
  material.baseTexture.filterMode = TextureFilterMode.Point
  const meshRenderer = entity.addComponent(MeshRenderer)
  meshRenderer.mesh = modelMesh
  meshRenderer.setMaterial(material)

  return { entity }
}

import { AssetType, Entity, MeshRenderer, ModelMesh, TextureFilterMode, TextureWrapMode, UnlitMaterial, Vector3 } from '@galacean/engine'
import type { Texture2D, Vector2, WebGLEngine } from '@galacean/engine'
import { blockMap, sectionHeight, sectionSize, surfCheck, voxelIndices, voxelSurf, voxelUV } from '../../constants'
import type { Section, Surf } from '../../constants'
import { appStore } from '../../store'

const voxelIndex = new Vector3(0, 0, 0)
const checkIndex = new Vector3(0, 0, 0)

function visibleCheck(surf: Surf, data: Section) {
  checkIndex.copyFrom(voxelIndex)
  checkIndex.add(surfCheck[surf])
  const block = blockMap[data?.[checkIndex.x]?.[checkIndex.y]?.[checkIndex.z]]
  if (block)
    return block.display !== 'opaque'
  return true
}

function resolveBlock(data: Section, positionArray: Vector3[], uvArray: Vector2[], indices: number[]) {
  const block = blockMap[data?.[voxelIndex.x]?.[voxelIndex.y]?.[voxelIndex.z]]
  if (!block)
    return
  if (block.display === 'transparent')
    return
  let surf: Surf
  for (surf in voxelSurf) {
    const visible = visibleCheck(surf, data)
    if (!visible)
      continue
    const now = positionArray.length
    voxelIndices.forEach((index) => {
      indices.push(index + now)
    })

    voxelSurf[surf].forEach((pos, index) => {
      positionArray.push(pos.clone().add(voxelIndex))
      uvArray.push(voxelUV[index].clone().add(block.uvOffset[surf]))
    })
  }
}

function resolveSection(data: Section, positionArray: Vector3[], uvArray: Vector2[], indices: number[]) {
  for (let x = 0; x < sectionSize; x++) {
    voxelIndex.x = x
    for (let y = 0; y < sectionHeight; y++) {
      voxelIndex.y = y
      for (let z = 0; z < sectionSize; z++) {
        voxelIndex.z = z
        resolveBlock(data, positionArray, uvArray, indices)
      }
    }
  }
}

export async function createSection(engine: WebGLEngine, key: string) {
  const entity = new Entity(engine, 'section_entity')
  const sectionPosition = key.split('_').map(s => Number(s))
  entity.transform.position.set(sectionPosition[0], 0, sectionPosition[1])

  const material = new UnlitMaterial(engine)
  material.baseTexture = await engine.resourceManager.load<Texture2D>({
    type: AssetType.Texture2D,
    url: 'https://mdn.alipayobjects.com/afts/img/A*RlTnSoieYvkAAAAAAAAAAAAADrd2AQ/texu.png',
  })
  material.baseTexture.wrapModeU = TextureWrapMode.Clamp
  material.baseTexture.wrapModeV = TextureWrapMode.Clamp
  material.baseTexture.filterMode = TextureFilterMode.Point

  const positionArray: Vector3[] = []
  const uvArray: Vector2[] = []
  const indices: number[] = []
  const { chunkData } = appStore.getState()
  resolveSection(chunkData[key], positionArray, uvArray, indices)

  const modelMesh = new ModelMesh(engine)
  modelMesh.setPositions(positionArray)
  modelMesh.setUVs(uvArray)
  modelMesh.setIndices(Uint32Array.from(indices))
  modelMesh.addSubMesh(0, indices.length)
  modelMesh.uploadData(false)

  const meshRenderer = entity.addComponent(MeshRenderer)
  meshRenderer.mesh = modelMesh
  meshRenderer.setMaterial(material)

  positionArray.length = 0
  uvArray.length = 0
  indices.length = 0

  return { entity }
}

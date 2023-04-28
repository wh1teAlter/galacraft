import { AssetType, Entity, MeshRenderer, ModelMesh, TextureFilterMode, TextureWrapMode, UnlitMaterial, Vector2, Vector3 } from '@galacean/engine'
import type { Texture2D, WebGLEngine } from '@galacean/engine'
import { blockMap, sectionHeight, sectionSize, surfs, voxelSurf, voxelUV } from '../../constants'
import type { BlockID, OriginSection } from '../../constants'

const posOffset = new Vector3(0, 0, 0)
const uvOffset = new Vector2(0, 0)

function resolveBlock(id: BlockID, position: Vector3[], uv: Vector2[]) {
  surfs.forEach((surf) => {
    voxelSurf[surf].forEach((pos, i) => {
      position.push(pos.clone().add(posOffset))

      if (blockMap[id].uvOffset?.[surf])
      // @ts-expect-error never undefined
        uvOffset.copyFrom(blockMap[id].uvOffset[surf])

      if (blockMap[id].uvOffset?.default)
        // @ts-expect-error never undefined
        uvOffset.copyFrom(blockMap[id].uvOffset.default)

      uv.push(voxelUV[i].clone().add(uvOffset))
    })
  })
}

function resolveSection(data: OriginSection['data'], position: Vector3[], uv: Vector2[]) {
  let index = 0

  for (let x = 0; x < sectionSize; x++) {
    posOffset.x = x
    for (let y = 0; y < sectionHeight; y++) {
      posOffset.y = y
      for (let z = 0; z < sectionSize; z++) {
        const id = data[index] as BlockID
        if (!blockMap[id]) {
          index += 1
          continue
        }
        if (blockMap[id].display === 'transparent') {
          index += 1
          continue
        }
        posOffset.z = z
        uvOffset.set(0, 0)
        resolveBlock(id, position, uv)
        index += 1
      }
    }
  }
}

export async function createSection(engine: WebGLEngine, section: OriginSection) {
  const entity = new Entity(engine, 'section_entity')
  entity.transform.position.set(section.position.x, 0, section.position.y)

  const material = new UnlitMaterial(engine)
  material.baseTexture = await engine.resourceManager.load<Texture2D>({
    type: AssetType.Texture2D,
    url: 'https://mdn.alipayobjects.com/afts/img/A*RlTnSoieYvkAAAAAAAAAAAAADrd2AQ/texu.png',
  })
  material.baseTexture.wrapModeU = TextureWrapMode.Clamp
  material.baseTexture.wrapModeV = TextureWrapMode.Clamp
  material.baseTexture.filterMode = TextureFilterMode.Point

  const position: Vector3[] = []
  const uv: Vector2[] = []

  resolveSection(section.data, position, uv)
  const modelMesh = new ModelMesh(engine)
  modelMesh.setPositions(position)
  modelMesh.setUVs(uv)
  modelMesh.addSubMesh(0, position.length)
  modelMesh.uploadData(false)
  console.warn(position)
  const meshRenderer = entity.addComponent(MeshRenderer)
  meshRenderer.mesh = modelMesh
  meshRenderer.setMaterial(material)
  console.warn(entity)
  return { entity }
}

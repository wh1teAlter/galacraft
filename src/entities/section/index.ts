import type { Texture2D, Vector2, WebGLEngine } from '@galacean/engine'
import { AssetType, Entity, TextureFilterMode, TextureWrapMode, UnlitMaterial, Vector3 } from '@galacean/engine'
import type { BlockID, OriginSection } from '../../constants'
import { blockMap, sectionHeight, sectionSize, surfs, voxelSurf } from '../../constants'

function resolveSection(data: OriginSection['data'], position: Vector3[], uv: Vector2[]) {
  let index = 0
  const posOffset = new Vector3(0, 0, 0)
  for (let x = 0; x < sectionSize; x++) {
    posOffset.x = x
    for (let y = 0; y < sectionHeight; y++) {
      posOffset.y = y
      for (let z = 0; z < sectionSize; z++) {
        const id = data[index] as BlockID
        if (!blockMap[id])
          return
        if (blockMap[id].display === 'transparent')
          return
        posOffset.z = z
        surfs.forEach((surf) => {
          voxelSurf[surf].forEach((pos) => {
            position.push(pos.clone().add(posOffset))
          })
        })
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

  return { entity }
}

import { Vector2, Vector3 } from '@galacean/engine'
import type { BlockID, Chunk, GameMap } from '../../constants'
import { blockMap, sectionHeight, sectionSize, subMeshMax, surfs, voxelSurf, voxelUV } from '../../constants'

const secOffset = new Vector3(0, 0, 0)
const uvOffset = new Vector2(0, 0)

export function resolveBlock(blockID: BlockID, position: Vector3[][], uv: Vector2[][]) {
  // 超出寻址上限 增加一个mesh数组
  if (position[position.length - 1].length > subMeshMax) {
    position.push([])
    uv.push([])
  }
  // 拿到还没有装满的数组
  const lastPos = position[position.length - 1]
  const lastUV = uv[uv.length - 1]
  surfs.forEach((surf) => {
    voxelSurf[surf].forEach((pos, i) => {
      lastPos.push(pos.clone().add(secOffset))

      if (blockMap[blockID]?.uvOffset?.[surf])
      // @ts-expect-error never undefined
        uvOffset.copyFrom(blockMap[blockID].uvOffset[surf])
      if (blockMap[blockID]?.uvOffset?.default)
        // @ts-expect-error never undefined
        uvOffset.copyFrom(blockMap[blockID].uvOffset.default)
      lastUV.push(voxelUV[i].clone().add(uvOffset))
    })
  })
}

export function resolveSection(section: string, chunkX: number, chunkZ: number, position: Vector3[][], uv: Vector2[][]) {
  let index = 0
  // 纵
  for (let z = 0; z < sectionSize; z++) {
    // 列
    for (let y = 0; y < sectionHeight; y++) {
      // 行
      for (let x = 0; x < sectionSize; x++) {
        secOffset.set(x + chunkX, y, z + chunkZ)
        resolveBlock(section[index] as BlockID, position, uv)
        index += 1
      }
    }
  }
}

export function resolveChunk(chunk: Chunk, position: Vector3[][], uv: Vector2[][]) {
  // 行
  for (let x = 0; x < chunk.length; x++) {
    if (x > 0)
      return
    const offsetX = x * sectionSize
    for (let z = 0; z < chunk[x].length; z++) {
      if (z > 0)
        return
      const offsetZ = z * sectionSize
      resolveSection(chunk[x][z], offsetX, offsetZ, position, uv)
    }
  }
}
export function resolveMap(map: GameMap, position: Vector3[][], uv: Vector2[][]) {

}

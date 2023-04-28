import { Vector2 } from '@galacean/engine'
import { BlockID, chunkSize, sectionHeight, sectionSize } from '../constants'
import type { OriginChunk, OriginSection } from '../constants'

// 根据sectionSize生成section
export function createSectionData(position: Vector2) {
  const section: OriginSection = {
    position: position.clone(),
    data: '',
  }
  for (let x = 0; x < sectionSize; x++) {
    for (let y = 0; y < sectionHeight; y++) {
      for (let z = 0; z < sectionSize; z++) {
        if (y > 1)
          section.data += BlockID.blank
        else
          section.data += BlockID.clod
      }
    }
  }
  return section
}

export function createChunkData() {
  const chunk: OriginChunk = []
  const position = new Vector2(0, 0)
  for (let x = 0; x < chunkSize; x++) {
    position.x = x * sectionSize
    for (let y = 0; y < chunkSize; y++) {
      position.y = y * sectionSize
      chunk.push(createSectionData(position))
    }
  }
  return chunk
}

import type { WebGLEngine } from '@galacean/engine'
import { Entity } from '@galacean/engine'
import { chunkSize } from '../../constants'
import { createSection } from '..'

import chunk from '../../utils/chunk.json'

export async function createChunk(engine: WebGLEngine) {
  const entity = new Entity(engine, 'chunk_entity')
  let index = 0
  for (let x = 0; x < chunkSize; x++) {
    for (let z = 0; z < chunkSize; z++) {
      const section = await createSection(engine, chunk[index])
      entity.addChild(section.entity)
      index += 1
    }
  }
  // entity.transform.setPosition(position.x, position.y, position.z)
  // for (let i = 0; i < sections.length; i++) {
  //   const section = await createSection(engine, sections[i])
  //   entity.addChild(section.entity)
  // }
  return { entity }
}

import type { WebGLEngine } from '@galacean/engine'
import { Entity } from '@galacean/engine'
import { appStore } from '../../store'
import { createSection } from '../section'

export async function createChunk(engine: WebGLEngine) {
  const entity = new Entity(engine, 'chunk_entity')
  const { chunkData } = appStore.getState()
  const chunkKeys = Object.keys(chunkData)
  for (let i = 0; i < chunkKeys.length; i++) {
    const section = await createSection(engine, chunkKeys[i])
    entity.addChild(section.entity)
  }
  return { entity }
}

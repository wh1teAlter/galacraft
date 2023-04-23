import type { WebGLEngine } from '@galacean/engine'
import { Entity } from '@galacean/engine'
import { createCube } from '..'

export async function createGround(engine: WebGLEngine) {
  const entity = new Entity(engine, 'ground_entity')
  const cube = await createCube(engine)
  entity.addChild(cube.entity)
  return { entity }
}

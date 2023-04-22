import type { WebGLEngine } from '@galacean/engine'
import { Entity } from '@galacean/engine'
import { createCube } from '..'

export function createGround(engine: WebGLEngine) {
  const entity = new Entity(engine, 'ground_entity')
  const cube = createCube(engine)
  console.warn(cube.entity)
  entity.addChild(cube.entity)
  return { entity }
}

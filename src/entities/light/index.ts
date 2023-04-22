import type { WebGLEngine } from '@galacean/engine'
import { Color, DirectLight, Entity, Vector3 } from '@galacean/engine'

export function createLight(engine: WebGLEngine) {
  const entity = new Entity(engine, 'light_entity')
  const directLight = entity.addComponent(DirectLight)
  directLight.color = new Color(1.0, 1.0, 1.0)
  directLight.intensity = 1

  entity.transform.rotation = new Vector3(-45, 45, 45)

  return { entity }
}

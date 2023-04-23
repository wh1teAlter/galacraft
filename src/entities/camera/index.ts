import type { WebGLEngine } from '@galacean/engine'
import { Stats } from '@galacean/engine-toolkit-stats'
import { Camera, Entity, Vector3 } from '@galacean/engine'
import { OrbitControl } from '@galacean/engine-toolkit-controls'

export function createCamera(engine: WebGLEngine) {
  const entity = new Entity(engine, 'camera_entity')

  entity.addComponent(Camera)
  entity.addComponent(Stats)
  entity.transform.position = new Vector3(0, 5, 10)
  entity.transform.lookAt(new Vector3(0, 0, 0))

  entity.addComponent(OrbitControl)

  return { entity }
}

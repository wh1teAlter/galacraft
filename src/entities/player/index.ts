import type { WebGLEngine } from '@galacean/engine'
import { Color, Entity, MeshRenderer, PrimitiveMesh, UnlitMaterial } from '@galacean/engine'

export function createPlayer(engine: WebGLEngine) {
  const entity = new Entity(engine, 'chunk_player')
  const renderer = entity.addComponent(MeshRenderer)
  renderer.mesh = PrimitiveMesh.createCapsule(engine, 0.5, 1, 8, 8)
  const material = new UnlitMaterial(engine)
  material.baseColor = new Color(1, 1, 1, 1)
  renderer.setMaterial(material)
  return { entity }
}

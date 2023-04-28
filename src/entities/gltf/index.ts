import type { GLTFResource, Material, Vector3, WebGLEngine } from '@galacean/engine'
import { AssetType, Entity, MeshRenderer, ModelMesh } from '@galacean/engine'

export async function createGLTF(engine: WebGLEngine) {
  const entity = new Entity(engine, 'gltf_entity')
  const data = await engine.resourceManager.load<GLTFResource>({
    url: 'https://mdn.alipayobjects.com/afts/file/A*8MNtQIxVrJIAAAAAAAAAAAAADrd2AQ/Earth Voxels.gltf',
    type: AssetType.GLTF,
    params: {
      keepMeshData: true,
    },
  })
  console.warn(data)
  const position: Vector3[] = []
  const indices: number[] = []
  let count = 0
  let topology
  let offset = 0

  let material = <Material><unknown>null

  data.entities.forEach((entity) => {
    const meshRenderer = entity.getComponent(MeshRenderer)
    if (!meshRenderer)
      return
    const mesh = <ModelMesh>meshRenderer.mesh
    mesh.getPositions()?.forEach((p) => {
      position.push(p.clone()
        .add(entity.transform.position)
        .multiply(entity.transform.scale))
    })
    Array.from(mesh.getIndices()).forEach((indice) => {
      indices.push(indice + offset)
    })
    if (mesh.subMesh?.count)
      count += mesh.subMesh.count
    topology = mesh.subMesh?.topology
    material = meshRenderer.getMaterial() as Material
    offset += 24
  })

  const modelMesh = new ModelMesh(engine)
  modelMesh.setPositions(position)
  modelMesh.setIndices(Uint32Array.from(indices))
  modelMesh.addSubMesh(0, count, topology)
  modelMesh.uploadData(false)
  const meshRenderer = entity.addComponent(MeshRenderer)
  meshRenderer.mesh = modelMesh
  meshRenderer.setMaterial(material)

  position.length = 0
  indices.length = 0
  return { entity }
}

/* eslint-disable unicorn/no-new-buffer */
import type { Engine, Mesh } from '@galacean/engine'
import { Buffer, BufferBindFlag, BufferMesh, BufferUsage, IndexFormat, VertexElement, VertexElementFormat } from '@galacean/engine'

export function createCustomMesh(engine: Engine, size: number): Mesh {
  const geometry = new BufferMesh(engine, 'CustomCubeGeometry')

  // Create vertices data.
  // prettier-ignore
  const vertices: Float32Array = new Float32Array([
    // Up
    -size, size, -size, 0, 1, 0, size, size, -size, 0, 1, 0, size, size, size, 0, 1, 0, -size, size, size, 0, 1, 0,
    // Down
    -size, -size, -size, 0, -1, 0, size, -size, -size, 0, -1, 0, size, -size, size, 0, -1, 0, -size, -size, size, 0, -1, 0,
    // Left
    -size, size, -size, -1, 0, 0, -size, size, size, -1, 0, 0, -size, -size, size, -1, 0, 0, -size, -size, -size, -1, 0, 0,
    // Right
    size, size, -size, 1, 0, 0, size, size, size, 1, 0, 0, size, -size, size, 1, 0, 0, size, -size, -size, 1, 0, 0,
    // Front
    -size, size, size, 0, 0, 1, size, size, size, 0, 0, 1, size, -size, size, 0, 0, 1, -size, -size, size, 0, 0, 1,
    // Back
    -size, size, -size, 0, 0, -1, size, size, -size, 0, 0, -1, size, -size, -size, 0, 0, -1, -size, -size, -size, 0, 0, -1])

  // Create instance data.
  const instanceCount = 4000
  const instanceStride = 6
  const instanceData: Float32Array = new Float32Array(
    instanceCount * instanceStride,
  )
  for (let i = 0; i < instanceCount; i++) {
    const offset = i * instanceStride
    // instance offset
    instanceData[offset] = (Math.random() - 0.5) * 60
    instanceData[offset + 1] = (Math.random() - 0.5) * 60
    instanceData[offset + 2] = (Math.random() - 0.5) * 60
    // instance color
    instanceData[offset + 3] = Math.random()
    instanceData[offset + 4] = Math.random()
    instanceData[offset + 5] = Math.random()
  }

  // Create indices data.
  // prettier-ignore
  const indices: Uint16Array = new Uint16Array([
    // Up
    0, 2, 1, 2, 0, 3,
    // Down
    4, 6, 7, 6, 4, 5,
    // Left
    8, 10, 9, 10, 8, 11,
    // Right
    12, 14, 15, 14, 12, 13,
    // Front
    16, 18, 17, 18, 16, 19,
    // Back
    20, 22, 23, 22, 20, 21])
  // Create gpu vertex buffer and index buffer.
  const vertexBuffer = new Buffer(
    engine,
    BufferBindFlag.VertexBuffer,
    vertices,
    BufferUsage.Static,
  )
  const instanceVertexBuffer = new Buffer(
    engine,
    BufferBindFlag.VertexBuffer,
    instanceData,
    BufferUsage.Static,
  )
  const indexBuffer = new Buffer(
    engine,
    BufferBindFlag.IndexBuffer,
    indices,
    BufferUsage.Static,
  )

  // Bind buffer
  geometry.setVertexBufferBinding(vertexBuffer, 24, 0)
  geometry.setVertexBufferBinding(instanceVertexBuffer, 24, 1)
  geometry.setIndexBufferBinding(indexBuffer, IndexFormat.UInt16)

  // Add vertexElements
  geometry.setVertexElements([
    new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0, 0), // Bind to VertexBuffer 0
    new VertexElement('NORMAL', 12, VertexElementFormat.Vector3, 0, 0), // Bind to VertexBuffer 0
    new VertexElement('INSTANCE_OFFSET', 0, VertexElementFormat.Vector3, 1, 1), // Bind instance offset to VertexBuffer 1, and enable instance by set instanceStepRate with 1
    new VertexElement('INSTANCE_COLOR', 12, VertexElementFormat.Vector3, 1, 1), // Bind instance color to VertexBuffer 1, and enable instance by set instanceStepRate with 1
  ])

  // Add one sub geometry.
  geometry.addSubMesh(0, indices.length)

  geometry.instanceCount = instanceCount

  return geometry
}

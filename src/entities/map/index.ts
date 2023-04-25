// import type { WebGLEngine } from '@galacean/engine'
// import { Entity } from '@galacean/engine'
// import { createChunk } from '..'
// // import { mapSize } from '../../constants'
// import map from '../../utils/map.json'

// export async function createMap(engine: WebGLEngine) {
//   const entity = new Entity(engine, 'ground_entity')
//   let index = 0
//   for (let z = 0; z < mapSize; z++) {
//     for (let x = 0; x < mapSize; x++) {
//       const chunk = await createChunk(engine, map[index])
//       entity.addChild(chunk.entity)
//       index += 1
//     }
//   }

//   return { entity }
// }

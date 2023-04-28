import React, { useCallback, useEffect, useRef } from 'react'
import { WebGLEngine } from '@galacean/engine'
import { createCamera, createGLTF, createLight } from './entities'
import { scaleUV } from './constants'

// import './loader/voxelgltf'
import './App.less'

const App: React.FC = () => {
  const ready = useRef(false)

  const init = useCallback(async () => {
    const engine = await WebGLEngine.create({ canvas: 'canvas' })
    engine.canvas.resizeByClientSize(2)
    const scene = engine.sceneManager.activeScene
    const rootEntity = scene.createRootEntity('root')

    const camera = createCamera(engine)
    rootEntity.addChild(camera.entity)

    const light = createLight(engine)
    rootEntity.addChild(light.entity)

    // const chunk = await createChunk(engine)
    // rootEntity.addChild(chunk.entity)

    const gltf = await createGLTF(engine)
    rootEntity.addChild(gltf.entity)

    engine.run()
  }, [])

  useEffect(() => {
    if (ready.current)
      return
    ready.current = true
    scaleUV()
    // console.warn(JSON.stringify(createChunkData()))
    init().catch(err => console.warn(err))
  }, [])

  return (
    <>
      <canvas className="game" id="canvas" width={window.innerWidth} height={window.innerHeight} />
    </>
  )
}

export default App

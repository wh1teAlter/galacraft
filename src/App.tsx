import React, { useEffect, useRef } from 'react'
import { scaleUV } from './constants'

import './App.less'

// import { createChunkData } from './utils/map'

const App: React.FC = () => {
  const ready = useRef(false)

  // const init = useCallback(async () => {
  //   const engine = new WebGLEngine('canvas')
  //   engine.canvas.resizeByClientSize(2)
  //   const scene = engine.sceneManager.activeScene
  //   const rootEntity = scene.createRootEntity('root')

  //   const camera = createCamera(engine)
  //   rootEntity.addChild(camera.entity)

  //   const light = createLight(engine)
  //   rootEntity.addChild(light.entity)

  // const ground = await createMap(engine)
  // rootEntity.addChild(ground.entity)

  //   engine.run()
  // }, [])

  useEffect(() => {
    if (ready.current)
      return
    ready.current = true
    scaleUV()
    // console.warn(JSON.stringify(createChunkData()))
    // init().catch(err => console.warn(err))
  }, [])

  return (
    <>
      <canvas className="game" id="canvas" width={window.innerWidth} height={window.innerHeight} />
    </>
  )
}

export default App

import { WebGLEngine } from '@galacean/engine'
import React, { useEffect, useRef } from 'react'
import { createCamera, createGround, createLight } from './entities'

import './App.less'

const App: React.FC = () => {
  const ready = useRef(false)
  useEffect(() => {
    if (ready.current)
      return
    ready.current = true
    console.warn(111)
    const engine = new WebGLEngine('canvas')
    engine.canvas.resizeByClientSize(2)
    const scene = engine.sceneManager.activeScene
    const rootEntity = scene.createRootEntity('root')

    const camera = createCamera(engine)
    rootEntity.addChild(camera.entity)

    const light = createLight(engine)
    rootEntity.addChild(light.entity)

    const ground = createGround(engine)
    rootEntity.addChild(ground.entity)

    engine.run()
  }, [])

  return (
    <>
      <canvas className="game" id="canvas" width={window.innerWidth} height={window.innerHeight} />
    </>
  )
}

export default App

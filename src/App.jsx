import './style.css'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene.jsx'
import Rightbar from './RightBar'
import Details from './Details'
import Loading from './Loading'
import { useState, Suspense } from 'react'

export default function App() {
  const [carColor, setCarColor] = useState('greenpaint')
  const [seatColor, setSeatColor] = useState('creamleather')
  const [interiorColor, setInteriorColor] = useState('blackleather')
  const [stitchingColor, setStitchingColor] =useState('blackleather')

  return (
    <div className="container">
      <Canvas
        className="canvas"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [6, 2, 3],
        }}
      >
        <Suspense fallback={<Loading />}>
          <Scene carColor={carColor} seatColor={seatColor} interiorColor={interiorColor} stitchingColor={stitchingColor} />
        </Suspense>
      </Canvas>
        <Rightbar setCarColor={setCarColor} setSeatColor={setSeatColor} setInteriorColor={setInteriorColor} setStitchingColor={setStitchingColor} />
      <Details />
   
    </div>
  )
}

 
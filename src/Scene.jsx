import { OrbitControls, Html } from '@react-three/drei'
import Ground from './Ground'
import NashHealey from './NashHealey'
import { useRef, useState, useEffect } from 'react'

export default function Scene({ carColor, seatColor, interiorColor, stitchingColor }) {

    const [zoom, setZoom] = useState(window.innerWidth <= 1024 ? true : false)

    const textRef = useRef()

    const [hidden, set] = useState()

    //Enable camera zoom on mobile
    useEffect(() => {
      const handleResize = () => window.innerWidth <= 1024 ? setZoom(true) : setZoom(false)

      window.addEventListener('resize', handleResize)

      handleResize()
      
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <>
        <Html 
          ref={textRef}
          as='div'
          occlude="blending"
          onOcclude={set}
          position={[0,1.7,0]}
          className="subtitle"
          style={{
            opacity: hidden ? 0 : 1,
            height: hidden ? 0 : 1,
            width: hidden ? 0 : 1,
          }}>
            THE 1952</Html>
        <Html 
          ref={textRef}
          as='div'
          occlude="blending"
          onOcclude={set}
          position={[0,1.7,0]}
          className="title"
          style={{
            opacity: hidden ? 0 : 1,
            height: hidden ? 0 : 1,
            width: hidden ? 0 : 1,
          }}>
            Nash Healey Roadster</Html>

        <OrbitControls
            makeDefault
            maxPolarAngle={1.4}
            minPolarAngle={0.5}
            autoRotateSpeed={0.5}
            enablePan={false}
            enableZoom={zoom}
            maxDistance={7}
            
        />

        <NashHealey carColor={carColor} seatColor={seatColor} interiorColor={interiorColor} stitchingColor={stitchingColor} />

        <Ground/>

    </>
}
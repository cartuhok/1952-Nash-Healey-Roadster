import { OrbitControls, Html } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Ground from './Ground'
import NashHealey from './NashHealey'
import { useRef, useState } from 'react'

export default function Scene({ carColor, seatColor, interiorColor, stitchingColor })
{

    const textRef = useRef()

    const [hidden, set] = useState()

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
          }}
          
        >THE 1952</Html>
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
          }}
          
        >Nash Healey Roadster</Html>

        {/* <Environment preset='city' /> */}

        {/* <color args={ [ bgColor ] } attach="background" /> */}

        {/* <Perf position="top-left" /> */}

        <OrbitControls
            makeDefault
            maxPolarAngle={1.4}
            minPolarAngle={0.5}
            autoRotateSpeed={0.5}
            enablePan={false}
            enableZoom={false}
            maxDistance={7}
            
        />

        {/* <Lights /> */}

        <NashHealey carColor={carColor} seatColor={seatColor} interiorColor={interiorColor} stitchingColor={stitchingColor} />

        <Ground/>

        {/* <Grid /> */}

    </>
}
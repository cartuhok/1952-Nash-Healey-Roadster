import { MeshReflectorMaterial, MeshRefractionMaterial, MeshTransmissionMaterial, MeshWobbleMaterial } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect } from "react"
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three"

export default function Ground() {


    const [ roughness, normal ] = useLoader(TextureLoader, [
        "./terrain-roughness.jpg",
        "./terrain-normals.jpg",
    ])

    useEffect(() => {
        [normal, roughness].forEach((t) => {
            t.wrapS = RepeatWrapping
            t.wrapT = RepeatWrapping
            t.repeat.set(5, 5)
        })
        normal.encoding = LinearEncoding
    }, [normal, roughness])

    useFrame((state, delta) => {
        let time = -state.clock.getElapsedTime() * 0.128
        roughness.offset.set(0, time)
        normal.offset.set(0, time)
    })

    // rotation-x={Math.PI * - 0.5}
    return <mesh rotation-x={Math.PI * - 0.5} castShadow receiveShadow position={[0, -1.1, 0]}>
        <circleGeometry args={[5,30]} />

        {/* <MeshReflectorMaterial
            envMapIntensity={0}
            normalMap={normal}
            normalScale={[0.15, 0.15]}
            roughnessMap={roughness}
            dithering={true}
            color={[0.085, 0.085, 0.085]}
            roughness={0.7 }
            blur={[1000,400]}
            mixBlur={30}
            mixStrength={80}
            mixContrast={1}
            resolution={1024}
            mirror={0}
            depthScale={0.01}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={0.25}
            debug={0}
            reflectorOffset={0.2}
        />  */}

        <meshBasicMaterial color={'#e4d5b7'} />

        {/* <MeshReflectorMaterial 
         blur={[100, 100]}
         resolution={1024}
         mixBlur={1}
         mixStrength={30}
         depthScale={1}
         minDepthThreshold={0.85}
         metalness={1}
         roughness={1}
         mirror={0.01}
         color={'#ffffff'} 
        /> */}

    </mesh>
}
import React, { useRef, useEffect, useMemo, useState } from "react"
import { useGLTF, useMatcapTexture, useTexture } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

export default function NashHealey({ carColor, seatColor, interiorColor, stitchingColor }) {
  const { nodes, materials } = useGLTF("./models/NashHealey.glb")

  const [scale, setScale] = useState(window.innerWidth <= 1024 ? 1 : 1.4)

  //Set Roadster's Mobile Scale
  useEffect(() => {
    const handleResize = () => window.innerWidth <= 1024 ? setScale(1) : setScale(1.4)

    window.addEventListener('resize', handleResize)

    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  //Preload Textures
  const textures = useMemo(() => {[
      useLoader(TextureLoader, "./blackpaint.png"),
      useLoader(TextureLoader, "./greenpaint.png"),
      useLoader(TextureLoader, "./redpaint.png"),
      useLoader(TextureLoader, "./blackleather.png"),
      useLoader(TextureLoader, "./redleather.png"),
      useLoader(TextureLoader, "./creamleather.png"),
      useLoader(TextureLoader, "./chrome.png"),
  ]}, [])

  const carPaint = useTexture(`./${carColor}.png`)
  const leather = useTexture(`./${seatColor}.png`)
  const interior = useTexture(`./${interiorColor}.png`)
  const stitching = useTexture(`./${stitchingColor}.png`)
  const chrome = useTexture('./chrome.png')

  const leatherNormals = useTexture('./leatherNormals.jpeg')
  const leatherRoughness = useTexture('./leatherRoughness.jpg')

  //Spin Roadster
  const car = useRef()

  useFrame((state, delta) => {
    car.current.rotation.y += 0.1 * delta
  })

  //Used https://github.com/pmndrs/gltfjsx to generate base geometry from glb file

  return (
    <group ref={car} className="car" position={[0, -1.1, 0]} scale={scale} dispose={null}>

      {/* START Dynamic Colors */}
      
      <mesh
        name="interior_group"
        castShadow
        receiveShadow
        geometry={nodes.interior_group.geometry}
        position={[0, 0.47366, -0.71828]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.833, 0.833, 0.62308]}
      >
        <meshMatcapMaterial matcap={interior} />
      </mesh>

      <mesh
        name="dash_group"
        castShadow
        receiveShadow
        geometry={nodes.dash_group.geometry}
        position={[0, 0.47366, -0.71828]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.833, 0.833, 0.62308]}
      >
        <meshMatcapMaterial matcap={interior} />
      </mesh>

      <mesh
        name="piping_group"
        castShadow
        receiveShadow
        geometry={nodes.piping_group.geometry}
        scale={0.0728}
      >
        <meshMatcapMaterial matcap={stitching} />
      </mesh>

      <mesh
        name="bumpers"
        castShadow
        receiveShadow
        geometry={nodes.bumpers.geometry}
        position={[0, 0.59952, -1.97749]}
        rotation={[-0.97283, 0, 0]}
        scale={[0.01371, 0.00741, 0.00908]}
      >
        <meshMatcapMaterial matcap={ chrome } />
      </mesh>

      <mesh
        name="seat_group"
        castShadow
        receiveShadow
        geometry={nodes.seat_group.geometry}
        position={[0, 0.77504, -0.55337]}
        rotation={[-0.3321, 0, 0]}
        scale={[0.05254, 0.15539, 0.03863]}
      >
        <meshMatcapMaterial 
            matcap={leather}
            normalMap={leatherNormals}
            normalScale={0.4}
            bumpMap={leatherRoughness}
        />
      </mesh>

      <mesh
        name="exterior_paint_group"
        castShadow
        receiveShadow
        geometry={nodes.exterior_paint_group.geometry}
        position={[0, 0, 1.35359]}
        scale={0.6481}
      >
        <meshMatcapMaterial matcap={carPaint} />
      </mesh>

      <mesh
        name="exterior_paint_group001"
        castShadow
        receiveShadow
        geometry={nodes.exterior_paint_group001.geometry}
        position={[0, 0, 1.35359]}
        scale={0.6481}
      >
        <meshMatcapMaterial matcap={carPaint} />
      </mesh>

      {/* END Dynamic Colors */}

      {/* START Static Colors */}

      <mesh
        name="windsheild"
        castShadow
        receiveShadow
        geometry={nodes.windsheild.geometry}
        position={[0.00134, 0.00784, -0.0055]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <meshPhysicalMaterial
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={0.9}
          clearcoat={1}
          transparent
          // transmission={0.95}
          opacity={0.5}
          reflectivity={0.2}
          refractionRatio={0.985}
          ior={0.9}
        />
      </mesh>

      <mesh
        name="flat_black_group"
        castShadow
        receiveShadow
        geometry={nodes.flat_black_group.geometry}
        position={[0.00275, 0, 3.33292]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.3625, 0.036, 0.3625]}
      >
        <meshStandardMaterial color={"#000000"} />
      </mesh>

      <mesh
        name="chrome_group"
        castShadow
        receiveShadow
        geometry={nodes.chrome_group.geometry}
        position={[0, 0.59952, -1.97749]}
        rotation={[-0.97283, 0, 0]}
        scale={[0.01371, 0.00741, 0.00908]}
      >
        <meshMatcapMaterial matcap={ chrome } />
      </mesh>

      <mesh
        name="headlight_glass"
        castShadow
        receiveShadow
        geometry={nodes.headlight_glass.geometry}
        position={[0, 0, 0.04942]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[0.12391, 0.16364, 0.12391]}
      >
        <meshPhysicalMaterial
          color={"#ffcccb"}
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={0.9}
          clearcoat={1}
          transparent
          // transmission={0.95}
          opacity={0.5}
          reflectivity={0.2}
          refractionRatio={0.985}
          ior={0.9}
        />
      </mesh>

      <mesh
        name="turn_signal_back_glass"
        castShadow
        receiveShadow
        geometry={nodes.turn_signal_back_glass.geometry}
        material={nodes.turn_signal_back_glass.material}
        scale={[0.46179, 1, 0.83407]}
      >
        <meshPhysicalMaterial
          color={"#ffcccb"}
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={0.9}
          clearcoat={1}
          transparent
          // transmission={0.95}
          opacity={0.5}
          reflectivity={0.2}
          refractionRatio={0.985}
          ior={0.9}
        />
      </mesh>

      <mesh
        name="tail_light_glass"
        castShadow
        receiveShadow
        geometry={nodes.tail_light_glass.geometry}
        material={nodes.tail_light_glass.material}
        scale={[0.04356, 0.08923, 0.0219]}
      >
        <meshPhysicalMaterial
          color={"#ffcccb"}
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={0.9}
          clearcoat={1}
          transparent
          // transmission={0.95}
          opacity={0.5}
          reflectivity={0.2}
          refractionRatio={0.985}
          ior={0.9}
          emissive={"#ff0000"}
        />
      </mesh>

      <mesh
        name="turn_signal"
        castShadow
        receiveShadow
        geometry={nodes.turn_signal.geometry}
        position={[0, 0, -0.00131]}
        scale={[0.04189, 0.02724, 0.04189]}
      >
        <meshPhysicalMaterial
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={0.9}
          clearcoat={1}
          transparent
          // transmission={0.95}
          opacity={0.8}
          reflectivity={0.2}
          refractionRatio={0.985}
          ior={0.9}
          color={"#fff2cc"}
          emissive={"#333333"}
        />
      </mesh>

      {/* END Static Colors */}

    </group>
  )
}

useGLTF.preload("./models/NashHealey.glb")

import { Html } from '@react-three/drei'

export default function Loading() {

    return <>
        <Html 
          as='div'
          occlude="blending"
          position={[0,0,0]}
          className="title"
          style={{
            opacity: 1,
            height: 1,
            width: 1,
          }}
          
        >Loading...</Html>
        </>
}
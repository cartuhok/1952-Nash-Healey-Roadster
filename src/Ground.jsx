export default function Ground() {    
    return <mesh rotation-x={Math.PI * - 0.5} castShadow receiveShadow position={[0, -1.1, 0]}>
        <circleGeometry args={[5,30]} />
        <meshBasicMaterial color={'#e4d5b7'} />
    </mesh>
}
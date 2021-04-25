/// Compornent
import * as THREE from "three";
import * as React from "react";
import {Canvas, useFrame} from "@react-three/fiber";
//import {EffectComposer, SSAO} from "@react-three/postprocessing";
function Spehre(props: JSX.IntrinsicElements["mesh"]){
  const mesh = React.useRef<THREE.Mesh>(null!);
  useFrame((state, delta)  => (
    mesh.current.rotation.x += 0.01, 
    mesh.current.rotation.y += 0.01
  ))
  return (
  <mesh 
  {...props}
  ref={mesh}>
  <sphereBufferGeometry args={[1, 32, 32]}/>
  <meshStandardMaterial roughness={0.5} metalness={1.0} color={0x6699ff}/>
  </mesh>
  )
}


export default function App(){
  return(
  <Canvas style={{width:1024, height:1024}} shadows gl={{alpha: false, antialias: false}}>
    <color attach="background" args={["#fff0f0"]}/>
    <pointLight position = {[10, 10, 10]}/>
    <Spehre position={[0, 0, 0]} />
  </Canvas>
  )
}


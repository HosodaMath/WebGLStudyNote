/// Compornent
import * as THREE from "three";
import * as React from "react";
import {Canvas, useFrame} from "@react-three/fiber"
// Box Compornent
function Box(props: JSX.IntrinsicElements["mesh"]){
  const mesh = React.useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={hovered ? "orange" : "blue"}/>
    </mesh>
  ) 
}



export default function App(){
  return(
  <Canvas>
    <ambientLight />
    <pointLight position = {[10, 10, 10]}/>
    <Box position={[-1.2, 0, 0]}/>
    <Box position={[ 1.2, 0, 0]}/>
  </Canvas>
  )
}


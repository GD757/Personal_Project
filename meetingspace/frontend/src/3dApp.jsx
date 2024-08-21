import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function ThreeDApp() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      <color attach="background" args={["#171720"]} />
      <fog attach="fog" args={["#171720", 10, 30]} />
      <Experience />
    </Canvas>
  );
}

export default ThreeDApp;
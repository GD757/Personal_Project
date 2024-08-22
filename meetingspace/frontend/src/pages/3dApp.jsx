import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";

function ThreeDApp() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 42 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Experience />
      </Canvas>
    </div>
  );
}

export default ThreeDApp;

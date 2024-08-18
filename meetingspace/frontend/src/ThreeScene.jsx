import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
    </Canvas>
  );
}

export default ThreeScene;
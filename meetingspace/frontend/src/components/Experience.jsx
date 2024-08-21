import { CameraControls, Center, Environment, OrbitControls, Text } from "@react-three/drei";
import { Timber } from "./Timber";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef } from "react";


export const Experience = () => {
    const controls =useRef();
    const intro = async () => {
        controls.current.dolly(-22);
        controls.current.smoothTime = 1.6;
        controls.current.dolly(22, true);
    };
    
    useEffect(()=> {
        intro();
    },[]);
  return (
    <>
      <CameraControls ref={controls} />
      <Text 
      front={"fonts/Lora-MediumItalic.ttf"} 
      position-x={-1.3}
      position-y={-0.5} 
      position-z={1}
      lineHeight={0.8}
      textAlign="center"
      rotation-y= {degToRad(30)}
      anchorY={"bottom"}>
        MEETING{"\n"}SPACE
        <meshBasicMaterial color="white"/>
      </Text>
      <group anchorY={"bottom"} rotation-y={degToRad(-15)} position-x={-5}>
        <Timber scale={0.6} />
      </group>
      <Environment preset="sunset" />
    </>
  );
};
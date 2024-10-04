"use client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { ControlManager } from "./controller";

// City component
function City() {
  // Load the GLB city model
  const { scene } = useGLTF("/models/ccity_building_set_1.glb"); // Adjust the path as needed
  return <primitive object={scene} scale={0.05} />;
}
// Main CityScene component
export default function CityScene() {
  let [cameraState, setCamera] = useState(null);
  //
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [10, 40, 5], fov: 75, near: 0.1, far: 100000 }} // Default camera position
      onCreated={({ camera }) => setCamera(camera)} // Capture the camera reference
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {console.log(cameraState)}
      <City />

      <ControlManager camera={cameraState}></ControlManager>

      <OrbitControls></OrbitControls>
    </Canvas>
  );
}

"use client";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Player } from "./Walking";

// City component
function City() {
  // Load the GLB city model
  const { scene } = useGLTF("/models/ccity_building_set_1.glb"); // Adjust the path as needed
  return <primitive object={scene} scale={0.05} />;
}

// Car component
function Car() {
  // Load the GLB car model
  const { scene } = useGLTF("/models/Lamborghini V12 Vision.glb"); // Adjust the path as needed
  return <primitive object={scene} scale={30} position={[0, 0, 5]} />;
}
// Main CityScene component
export default function CityScene() {
  const mixer = useRef();
  const actions = useRef({});
  const currentAction = useRef();
  const cameraRef = useRef();
  //
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 100000 }} // Default camera position
      onCreated={({ camera }) => (cameraRef.current = camera)} // Capture the camera reference
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Load City */}
      <City />

      {/* Load Car */}
      {/* <Car /> */}

      {/* Load Player */}
      <Player />
      <OrbitControls></OrbitControls>
    </Canvas>
  );
}

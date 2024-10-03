"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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

// Player component
function Player({ cameraRef, mixer, actions, currentAction }) {
  const playerRef = useRef();
  const clock = new THREE.Clock();

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      "/models/idle.fbx",
      (fbx) => {
        const model = fbx;

        // Set the player's scale and position
        model.scale.set(0.3,0.3,0.3); // Adjust scale based on your model
        model.position.set(0, 10, 5); // Start at (0, 0, 0)

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
          }
        });
        playerRef.current = model;

        // Add the player model to the scene
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 5, 10); // Initial camera position
          cameraRef.current.lookAt(playerRef.current.position); // Make sure the camera looks at the player
        }

        // Set up animation mixer for the player
        mixer.current = new THREE.AnimationMixer(model);
        const idleAction = mixer.current.clipAction(fbx.animations[0]);
        actions.current.idle = idleAction;
        actions.current.idle.play();
        currentAction.current = actions.current.idle;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading the player model: ", error);
      }
    );

    const handleKeyDown = (event) => {
      if (event.key === "w") {
        switchAction("walk");
      }
      if (event.key === "s") {
        switchAction("back");
      }
    };

    const handleKeyUp = () => {
      switchAction("idle");
    };

    const switchAction = (actionName) => {
      if (!actions.current[actionName]) return;
      const newAction = actions.current[actionName];
      currentAction.current.crossFadeTo(newAction, 0.5, true);
      currentAction.current = newAction;
      newAction.play();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [cameraRef, mixer, actions, currentAction]);

  useFrame(() => {
    // Check if the player and camera are initialized
    if (playerRef.current && cameraRef.current) {
      const delta = clock.getDelta();
      if (mixer.current) mixer.current.update(delta);

      // Get the player's position
      const playerPosition = playerRef.current.position;

      // Update camera position to smoothly follow the player
      cameraRef.current.position.lerp(
        new THREE.Vector3(playerPosition.x, playerPosition.y + 150, playerPosition.z + 150),
        0.1
      );

      // Ensure the camera is always looking at the player
      cameraRef.current.lookAt(playerPosition);
    }
  });

  return playerRef.current ? <primitive object={playerRef.current} /> : null; // Render player only when loaded
}

// Main CityScene component
export default function CityScene() {
  const mixer = useRef();
  const actions = useRef({});
  const currentAction = useRef();
  const cameraRef = useRef();

  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 100000 }} // Default camera position
      onCreated={({ camera }) => (cameraRef.current = camera)} // Capture the camera reference
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Load City */}
      <City />

      {/* Load Car */}
      <Car />

      {/* Load Player */}
      <Player cameraRef={cameraRef} mixer={mixer} actions={actions} currentAction={currentAction} />
    </Canvas>
  );
}

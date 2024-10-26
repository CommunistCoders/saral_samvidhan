"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GradientTexture, Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function NavigationIcon({ playerRef, carRef, isPlayerActive }) {
  const iconRef = useRef();
  const [playerPosition, setPlayerPosition] = useState(null);
  
  // Load the arrow model
  const { scene } = useGLTF("/models/cc0_arrow_5.glb");


  useFrame(() => {
    const updateIcon = () => {
      let direction;
      if (!playerRef || !carRef) return;
      if (isPlayerActive) {
        const playerPosition_l = playerRef.current.getPosition();
        const targetPosition = carRef.current.getPosition();
        direction = new THREE.Vector3().subVectors(
          targetPosition,
          playerPosition_l
        );
        setPlayerPosition(playerPosition_l);
      } else {
        const playerPosition_l = playerRef.current.getPosition();
        const targetPosition = carRef.current.getPosition();
        direction = new THREE.Vector3().subVectors(
          playerPosition_l,
          targetPosition
        );
        setPlayerPosition(targetPosition);
      }
      if (!iconRef.current) {
        return;
      }
      const axis = new THREE.Vector3(0, 1, 0);
      direction.normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        axis,
        direction
      );

      // Set the rotation to point towards the destination
      iconRef.current.setRotationFromQuaternion(quaternion);
    };

    // Update the navigation icon every frame
    updateIcon();

    return () => {};
  }, [playerRef, carRef]);

  return (
    playerPosition && (
      <>
      <mesh
        ref={iconRef}
        position={[playerPosition.x, playerPosition.y + 40, playerPosition.z]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[5, 12, 20]} />
        <meshBasicMaterial color="red" />
      </mesh>    
         {/* <primitive
          ref={iconRef}
          object={scene}
          position={[playerPosition.x, playerPosition.y + 30, playerPosition.z]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[40, 40, 40]} 
        />  */}
        </>
      )
  );
}

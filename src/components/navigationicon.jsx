"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function NavigationIcon({ playerRef, carRef, isPlayerActive }) {
  const iconRef = useRef();
  const [playerPosition, setPlayerPosition] = useState(null);

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
      //   <Html
      //     position={[playerPosition.x, playerPosition.y + 30, playerPosition.z]}
      //     center
      //   >
      //     <div
      //       ref={iconRef}
      //       style={{
      //         width: "50px",
      //         height: "50px",
      //         background: "url('/icons/nav.png') no-repeat center",
      //         backgroundSize: "contain",
      //       }}
      //     />
      //   </Html>
      <mesh
        ref={iconRef}
        position={[playerPosition.x, playerPosition.y + 30, playerPosition.z]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[1, 2, 8]} />
        <meshBasicMaterial color="black" />
      </mesh>
    )
  );
}

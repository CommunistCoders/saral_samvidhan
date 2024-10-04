import React from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export function Player({ camera, ...props }) {
  const group = React.useRef();
  const currentAction = React.useRef(null);
  const isWalking = React.useRef(false);
  const { scene, animations } = useGLTF("/models/player.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const turnLeft = React.useRef(false);
  const turnRight = React.useRef(false);

  React.useEffect(() => {
    actions["idle"].play();
    // actions["turn"].clampWhenFinished = true;
    // actions["turn"].setLoop(THREE.LoopOnce);
    currentAction.current = actions["idle"];
    const handleKeyDown = (event) => {
      if (event.key === "w" && !isWalking.current) {
        isWalking.current = true;
        if (currentAction.current) currentAction.current.stop();
        //actions["walk"].crossFadeFrom(currentAction.current, 0.1, false);
        actions["walk"].play();
        currentAction.current = actions["walk"];
      }
      if (event.key === "a" && !turnLeft.current && !turnRight.current) {
        turnLeft.current = true;
      }
      if (event.key === "d" && !turnLeft.current && !turnRight.current) {
        turnRight.current = true;
      }
      // if (event.key === "s") {
      //   if (currentAction.current) currentAction.current.stop();
      //   //actions["idle"].crossFadeFrom(currentAction.current, 1, false);
      //   // Stop the animation when "w" is released (reset to idle)
      //   actions["turn"].play();
      //   currentAction.current = actions["turn"];
      // }
    };

    const handleKeyUp = (event) => {
      if (event.key === "w") {
        isWalking.current = false;
        if (currentAction.current) currentAction.current.stop();
        //actions["idle"].crossFadeFrom(currentAction.current, 1, false);
        // Stop the animation when "w" is released (reset to idle)
        actions["idle"].play();
        currentAction.current = actions["idle"];
      }
      if (event.key === "a" && turnLeft.current) {
        turnLeft.current = false;
      }
      if (event.key === "d" && turnRight.current) {
        turnRight.current = false;
      }
      // if (event.key === "s") {
      //   group.current.rotation.y += 3.14;
      // }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [actions]);

  useFrame(() => {
    if (camera) {
      camera.position.set(
        group.current.position.x,
        group.current.position.y + 70,
        group.current.position.z - 50
      );
      camera.lookAt(group.current.position);
    } else {
      console.log("camera not availabe");
    }

    if (turnLeft.current) {
      group.current.rotation.y += 0.01;
      console.log("left");
    }
    if (turnRight.current) {
      group.current.rotation.y -= 0.01;
    }
    if (isWalking.current) {
      const direction = new THREE.Vector3();
      group.current.getWorldDirection(direction);
      group.current.position.addScaledVector(direction, 0.25);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Character" rotation={[Math.PI / 2, 0, 0]} scale={0.2}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Beta_Joints"
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT1}
            skeleton={nodes.Beta_Joints.skeleton}
          />
          <skinnedMesh
            name="Beta_Surface"
            geometry={nodes.Beta_Surface.geometry}
            material={materials.Beta_HighLimbsGeoSG3}
            skeleton={nodes.Beta_Surface.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/player.glb");

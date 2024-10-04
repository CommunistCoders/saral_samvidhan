import React, { useImperativeHandle, useRef, useMemo, useEffect } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export const Player = React.forwardRef(
  (
    {
      camera,
      position,
      isActive,
      turnLeft,
      turnRight,
      isMovingForward,
      isPlayerActive,
      ...props
    },
    ref
  ) => {
    const group = useRef();
    const currentAction = useRef(null);
    const { scene, animations } = useGLTF("/models/player.glb");
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);
    const { actions } = useAnimations(animations, group);

    // Expose methods or properties via ref using useImperativeHandle
    useImperativeHandle(ref, () => ({
      getPosition: () => group.current.position.clone(),
      setPosition: (newPosition) => {
        group.current.position.copy(newPosition);
      },
      getRotation: () => group.current.rotation.clone(),
      setRotation: (newRotation) => {
        group.current.rotation.copy(newRotation);
      },
      stop: () => {
        if (currentAction.current) currentAction.current.stop();
      },
    }));

    useEffect(() => {
      actions["idle"].play();
      currentAction.current = actions["idle"];
    }, [actions]);

    useFrame(() => {
      if (!isPlayerActive) {
        group.current.visible = false;
        if (currentAction.current != null) {
          currentAction.current.stop();
          currentAction.current = null;
        }
        return;
      }
      group.current.visible = true;
      if (currentAction.current == null) {
        currentAction.current = actions["idle"];
        currentAction.current.play();
      }
      if (camera) {
        const playerPosition = group.current.position.clone();
        const playerRotation = group.current.rotation.clone();
        const cameraOffset = new THREE.Vector3(0, 40, -80); // Camera offset: 5 units up, 10 units behind
        cameraOffset.applyEuler(playerRotation);
        camera.position.copy(playerPosition).add(cameraOffset);
        camera.lookAt(playerPosition);
      }

      if (turnLeft) {
        group.current.rotation.y += 0.01;
      }
      if (turnRight) {
        group.current.rotation.y -= 0.01;
      }
      if (isMovingForward) {
        if (currentAction.current !== actions["walk"]) {
          actions["walk"].play();
          currentAction.current.stop();
          currentAction.current = actions["walk"];
        }
        const direction = new THREE.Vector3();
        group.current.getWorldDirection(direction);
        group.current.position.addScaledVector(direction, 0.25);
      } else {
        if (currentAction.current !== actions["idle"]) {
          actions["idle"].play();
          currentAction.current.stop();
          currentAction.current = actions["idle"];
        }
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
);

// Preload the GLTF model
useGLTF.preload("/models/player.glb");

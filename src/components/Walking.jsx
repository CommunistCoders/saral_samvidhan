import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Player(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/models/walking.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w") {
        // Play the walking animation when "w" is pressed
        actions["Armature|mixamo.com|Layer0"].play();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "w") {
        // Stop the animation when "w" is released (reset to idle)
        actions["Armature|mixamo.com|Layer0"].stop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [actions]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
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
            onClick={(e) => actions["Armature|mixamo.com|Layer0"].play()}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/walking.glb");

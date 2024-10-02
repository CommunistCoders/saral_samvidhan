"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const ThreeScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, 1, 0);

      const fbxLoader_walking = new FBXLoader();
      let mixer;
      let player;
      fbxLoader_walking.load(
        "/models/Walking.fbx",
        (object) => {
          object.scale.set(0.01, 0.01, 0.01);
          scene.add(object);
          player = object;

          mixer = new THREE.AnimationMixer(object);

          object.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
            if (child.animations) {
              child.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
              });
            }
          });
          console.log("Model and animations added");
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (err) => {
          console.log(err);
        }
      );

      const stats = new Stats();
      document.body.appendChild(stats.dom);

      function animate() {
        requestAnimationFrame(animate);

        const delta = mixer ? mixer.update(0.01) : 0; // Update the mixer for animation
        if (player) {
          // Translate the object based on the animation progress
          // Example translation
          player.position.z += 0.01; // Adjust the Y position based on animation
        }

        controls.update();
        render();
        stats.update();
      }

      function render() {
        renderer.render(scene, camera);
      }
      animate();
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;

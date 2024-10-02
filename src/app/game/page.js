"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const ThreeScene = () => {
  const containerRef = useRef(null);
  let mixer, player, currentAnimation, previousAnimation;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
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

      const stats = new Stats();
      document.body.appendChild(stats.dom);

      // Function to Load FBX File
      function loadFBX(url) {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
          url,
          (object) => {
            if (player) {
              scene.remove(player);
            }
            object.scale.set(0.01, 0.01, 0.01);
            scene.add(object);
            player = object;

            // Create a new mixer for the loaded object
            mixer = new THREE.AnimationMixer(object);
            // Get the animation clip and play it
            currentAnimation = mixer.clipAction(object.animations[0]);
            currentAnimation.play();

            object.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (err) => {
            console.log(err);
          }
        );
      }

      // Load Initial Idle Animation
      loadFBX("/models/idle.fbx");

      // Handle Key Events
      let isRunning = false;

      const handleKeyDown = (event) => {
        if (event.key === "w" && !isRunning) {
          isRunning = true;
          // Store the previous animation to crossfade
          previousAnimation = currentAnimation;
          loadFBX("/models/Walking.fbx");
        } else if (event.key === "s" && isRunning) {
          isRunning = false;
          // Store the previous animation to crossfade
          previousAnimation = currentAnimation;
          loadFBX("/models/idle.fbx");
        }
      };

      const handleKeyUp = (event) => {
        if (event.key === "w" && isRunning) {
          isRunning = false;
          previousAnimation = currentAnimation;
          loadFBX("/models/idle.fbx");
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      // Animation Loop
      function animate() {
        requestAnimationFrame(animate);

        if (mixer) {
          mixer.update(0.01);
        }

        if (player) {
         player.position.z += 0.01;
          camera.position.set(player.position.x, player.position.y+2, player.position.z+4);
          camera.lookAt(player.position);
        }

        controls.update();
        render();
        stats.update();
      }

      function render() {
        renderer.render(scene, camera);
      }

      animate();

      // Cleanup
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        if (containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;

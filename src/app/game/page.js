"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const ThreeScene = () => {
  const containerRef = useRef(null);
  let mixer, player, currentAnimation, previousAnimation;
  const fbxCache = {}; // Caching object for FBX models
  const [view, setView] = useState("front"); // State to manage camera view

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, 1, 0);

      const stats = new Stats();
      document.body.appendChild(stats.dom);
      let posx = 0,posy = 0,posz = 0;

      // Function to Load FBX File (with caching)
      function loadFBX(url) {
        if (fbxCache[url]) {
          // If model is cached, use it
          setPlayer(fbxCache[url]);
        } else {
          // Load model if not cached
          const fbxLoader = new FBXLoader();
          fbxLoader.load(url,(object) => {
              fbxCache[url] = object; // Cache the loaded model
              setPlayer(object);
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (err) => {
              console.log(err);
            }
          );
        }
      }

      // Function to Set Player (handling transitions)
      function setPlayer(object) {
        if (player) {
          posx = player.position.x;
          posy = player.position.y;
          posz = player.position.z;
          scene.remove(player);
        }
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(posx, posy, posz);
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
      }

      // Load Initial Idle Animation
      loadFBX("/models/idle.fbx");

      // Handle Key Events
      let isRunning = false;

      const handleKeyDown = (event) => {
        if (event.key === "w" && !isRunning) {
          isRunning = true;
          loadFBX("/models/Walking.fbx");
        } else if (event.key === "v") {
          // Toggle between front and back view of the object
          setView((prevView) => (prevView === "front" ? "back" : "front"));
          if(view==="back"){
            camera.position.z = player.position.z -4;
          }
        }
      };

      const handleKeyUp = (event) => {
        if (event.key === "w" && isRunning) {
          isRunning = false;
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
          if(isRunning){
            player.position.z+=2;
          }
          camera.position.set(
            player.position.x,
            player.position.y + 2,
            player.position.z+4
          );
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
  }, [view]);

  return <div ref={containerRef} />;
};

export default ThreeScene;

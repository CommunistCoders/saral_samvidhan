"use client";
import React, { useRef, useEffect, act } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const ThreeScene = () => {
  const containerRef = useRef(null);
  const manager = new THREE.LoadingManager();
  let renderer, camera;
  let mixer;
  let player;
  let isRunning = false;
  let turnLeft = false;
  let turnRight = false;
  let currentAction;
  let actions = {};
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      let clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, 1, 0);

      const stats = new Stats();
      document.body.appendChild(stats.dom);

      const playerLoader = new FBXLoader();
      playerLoader.load(
        "/models/idle.fbx",
        (data) => {
          data.scale.setScalar(0.01);
          data.traverse((child) => {
            child.castShadow = true;
          });
          player = data;
          scene.add(player);

          mixer = new THREE.AnimationMixer(data);
          let loader = new FBXLoader(manager);

          loader.load(
            "/models/idle.fbx",
            (data) => {
              const clip = data.animations[0];
              const action = mixer.clipAction(clip);
              actions["idle"] = { clip, action };
              isRunning = false;
              actions["idle"].action.enabled = true;
              if (currentAction) {
                actions["idle"].action.crossFadeFrom(currentAction, 0.5, true);
              }
              currentAction = actions["idle"].action;
              actions["idle"].action.play();
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            }
          );
          loader.load(
            "/models/back.fbx",
            (data) => {
              const clip = data.animations[0];
              const action = mixer.clipAction(clip);
              actions["back"] = { clip, action };
              action.clampWhenFinished = true;
              isRunning = false;
              actions["back"].action.enabled = true;
              if (currentAction) {
                actions["back"].action.crossFadeFrom(currentAction, 0.5, true);
              }
              currentAction = actions["back"].action;
              actions["back"].action.play();
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            }
          );

          loader.load(
            "/models/walk.fbx",
            (data) => {
              const clip = data.animations[0];
              const action = mixer.clipAction(clip);
              actions["walk"] = { clip, action };
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            () => {}
          );
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (err) => {
          console.log(err);
        }
      );
      function animate() {
        requestAnimationFrame(animate);

        if (mixer) {
          mixer.update(clock.getDelta());
        }
        if (isRunning) {
          const direction = new THREE.Vector3();
          player.getWorldDirection(direction);
          player.position.addScaledVector(direction, 0.005);
        }
        if (turnLeft) {
          player.rotation.y += 0.01;
        }
        if (turnRight) {
          player.rotation.y -= 0.01;
        }

        controls.update();
        render();
        stats.update();
      }

      function render() {
        renderer.render(scene, camera);
      }
      animate();

      const handleKeyDown = (event) => {
        if (event.key === "w" && !isRunning) {
          isRunning = true;
          switchAction("walk");
        }
        if (event.key === "a" && !turnLeft && !turnRight) {
          turnLeft = true;
        }
        if (event.key === "d" && !turnLeft && !turnRight) {
          turnRight = true;
        }
        if (event.key === "s") {
          switchAction("back");
        }
      };

      const handleKeyUp = (event) => {
        if (event.key === "w" && isRunning) {
          isRunning = false;
          actions["idle"].action.enabled = true;
          if (currentAction) {
            actions["idle"].action.crossFadeFrom(currentAction, 0.5, true);
          }
          currentAction = actions["idle"].action;
          actions["idle"].action.play();
        }
        if (event.key === "a" && turnLeft && !turnRight) {
          turnLeft = false;
        }
        if (event.key === "d" && !turnLeft && turnRight) {
          turnRight = false;
        }
        if (event.key === "s") {
          switchAction("idle");
        }
      };

      function switchAction(action) {
        actions[action].action.enabled = true;
        if (currentAction) {
          currentAction.stop();
          //actions["walk"].action.crossFadeFrom(currentAction, 0.5, false);
        }
        currentAction = actions[action].action;
        currentAction.reset();
        currentAction.time = 0.0;
        currentAction.setEffectiveTimeScale(1.0);
        currentAction.setEffectiveWeight(1.0);
        actions["walk"].action.play();
      }

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      //renderer.setAnimationLoop(animate);
      // Cleanup
      // return () => {
      //   window.removeEventListener("keydown", handleKeyDown);
      //   window.removeEventListener("keyup", handleKeyUp);
      //   if (containerRef.current) {
      //     containerRef.current.removeChild(renderer.domElement);
      //   }
      // };
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;

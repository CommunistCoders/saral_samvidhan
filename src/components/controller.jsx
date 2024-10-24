import { Player } from "./player";
import { Car } from "./car";
import { NavigationIcon } from "./navigationicon";
import React from "react";
import * as THREE from "three";

export function ControlManager({ camera }) {
  const [turnLeft, setTurnLeft] = React.useState(false);
  const [turnRight, setTurnRight] = React.useState(false);
  const [isMovingForward, setIsMovingForward] = React.useState(false);
  const [isPlayerActive, setIsPlayerActive] = React.useState(true);
  const playerRef = React.useRef(null);
  const carRef = React.useRef(null);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "w":
        setIsMovingForward(true);
        break;
      case "a":
        setTurnLeft(true);
        break;
      case "d":
        setTurnRight(true);
        break;
      case "f":
        if (
          playerRef.current
            .getPosition()
            .distanceTo(carRef.current.getPosition()) < 55
        ) {
          setIsPlayerActive(false);
        }
        break;
      case "e":
        setIsPlayerActive(true);
        const carPosition = carRef.current.getPosition();
        const carRotation = carRef.current.getRotation();
        const playerOffset = new THREE.Vector3(30, 0, 0); // Camera offset: 5 units up, 10 units behind
        playerOffset.applyEuler(carRotation);
        carPosition.add(playerOffset);
        playerRef.current.setPosition(carPosition);
        playerRef.current.setRotation(carRotation);
        break;
      default:
        console.log(isPlayerActive);
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case "w":
        setIsMovingForward(false);
        break;
      case "a":
        setTurnLeft(false);
        break;
      case "d":
        setTurnRight(false);
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      {/* Pass controls to both player and car */}
      <Player
        ref={playerRef}
        position={[30, 3, 0]}
        isActive={isPlayerActive}
        turnLeft={turnLeft}
        turnRight={turnRight}
        isMovingForward={isMovingForward}
        isPlayerActive={isPlayerActive}
        camera={camera}
        onCreated={(object) => {
          setPlayer(object);
        }}
      />
      <Car
        ref={carRef}
        scale={30}
        isActive={!isPlayerActive}
        turnLeft={turnLeft}
        turnRight={turnRight}
        isMovingForward={isMovingForward}
        camera={camera}
        onCreated={(object) => {
          setCar(object);
        }}
      />
      <NavigationIcon
        playerRef={playerRef}
        carRef={carRef}
        isPlayerActive={isPlayerActive}
      />
    </>
  );
}

import React, { Suspense } from "react";

// Import components
import Car from "./Car";
import Obstacles from "./Obstacles";
import Background from "./Background";
import Environment from "./Environment";

// Import hooks
import usePlayerPosition from "../hooks/usePlayerPosition";

// Optional components
import Zuckerberg from "./Unused_3d_Models/Zuckerberg";

// Import settings
import settings from "../settings";
const { START_POSITION } = settings.GAME;

export default function Game(props) {
  const { points, speed, setSpeed, setPoints, difficulty } = props;
  const [playerPosition, setPlayerPosition] = usePlayerPosition(START_POSITION);

  return (
    <>
      <Background />
      <Environment speed={speed} />
      <Obstacles
        playerPosition={playerPosition}
        difficulty={difficulty}
        points={points}
        setPoints={setPoints}
      />
      <Suspense fallback={null}>
        {points < 100 && (
          <Car
            avgSpeed={speed}
            setSpeed={setSpeed}
            position={playerPosition}
            setPosition={setPlayerPosition}
          />
        )}
        {points >= 100 && (
          <Zuckerberg
            avgSpeed={speed}
            setSpeed={setSpeed}
            position={playerPosition}
            setPosition={setPlayerPosition}
          />
        )}
      </Suspense>
    </>
  );
}

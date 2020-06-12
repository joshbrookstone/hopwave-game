import React, { useEffect, useState } from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import Tappable from "react-tappable";
import * as Tone from "tone";

import "./Hud.scss";

export default function Hud(props) {
  const { points, gameMode, setGameMode, setDifficulty } = props;

  let [active, setActive] = useState("easy");

  const [player] = useState(() =>
    new Tone.Player({
      url: "Song.mp3",
      autostart: false,
      volume: -15,
    }).toMaster()
  );

  const [music, setMusic] = useState(false);

  useEffect(() => {
    if (music) {
      player.start();
    } else {
      player.stop();
    }
  }, [music, player]);
  const startMusic = function () {
    if (!music) {
      setMusic(true);
    } else {
      setMusic(false);
    }
  };

  return (
    <>
      <Global />
      <UpperLeft>
        {gameMode && (
          <h4>
            {music ? (
              "Spotify"
            ) : (
              <iframe
                title="Spotify"
                src="https://open.spotify.com/embed/playlist/3PPbbsJhktmX5Cp6syx7gR"
                width="300"
                height="220"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            )}
          </h4>
        )}
        <h4 onClick={() => startMusic()}>sound</h4>
        <h4>{music ? "on" : "off"}</h4>
      </UpperLeft>
      <UpperRight>
        <h2>HOPWAVE </h2>
        {/* <br /> */}
        <h2 onClick={setGameMode}>{gameMode ? "game On!" : "start"}</h2>
        {/* <br /> */}
        <a href="https://github.com/seanssullivan/hopwave-game">source</a>
      </UpperRight>
      <MidLeft>
        <Tappable onPress={() => console.log("LEFT!!!")} pressDelay={250}>
          <div class="controls left-button"></div>
        </Tappable>
      </MidLeft>
      <MidRight>
        <Tappable onPress={() => console.log("RIGHT!!!")} pressDelay={250}>
          <div class="controls right-button"></div>
        </Tappable>
      </MidRight>
      <LowerLeft>
        <ul>
          <li
            className={`easy ${"easy" === active ? "bigText" : ""}`}
            onClick={() => {
              setDifficulty("easy");
              setActive("easy");
            }}
          >
            easy
          </li>
          <li
            id={"medium"}
            className={`"medium" ${"medium" === active ? "bigText" : ""}`}
            onClick={() => {
              setDifficulty("medium");
              setActive("medium");
            }}
          >
            medium
          </li>
          <li
            className={`"hard" ${"hard" === active ? "bigText" : ""}`}
            onClick={() => {
              setDifficulty("hard");
              setActive("hard");
            }}
          >
            hard
          </li>
        </ul>
      </LowerLeft>
      <LowerRight>{gameMode && <h2>{points}</h2>}</LowerRight>
    </>
  );
}

const base = css`
  font-family: "Press Start 2P", sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  color: #ff9f61;
`;

const UpperLeft = styled.div`
  ${base}

  top: 40px;
  left: 50px;
  font-size: 2em;
  transform: skew(5deg, 10deg);
  pointer-events: all;
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
    font-family: "Press Start 2P";
  }
`;

const UpperRight = styled.div`
  ${base}
  text-align: right;
  top: 40px;
  right: 50px;
  font-size: 2em;
  transform: skew(-5deg, -10deg);
  pointer-events: all;
  cursor: pointer;
  & > a {
    text-decoration: none;
    font-family: "Press Start 2P", cursive;
    color: #ff9f61;
  }
  & > h2 {
    text-decoration: none;
  }
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;

const MidLeft = styled.div``;
const MidRight = styled.div``;

const LowerLeft = styled.li`
  ${base}

  bottom: 50px;
  left: 50px;
  cursor: pointer;
  pointer-events: all;

  transform: skew(-5deg, -10deg);
  width: 200px;

  #medium {
    margin-left: 10px;
    margin-right: 10px;
  }

  .bigText {
    font-size: 2em;
  }

  & > ul {
    margin: 0;
    line-height: 1em;
    display: inline;
    // font-size: 1.4em;
    font-size: ${(props) => {
      const test = props;
      console.log(test);

      if (test === "easy") {
        return "2.0";
      } else if (test === "medium") {
        return "2.0";
      } else if (test === "hard") {
        return "2.0";
      } else {
        return "1.4";
      }
    }};
  }

  @media only screen and (max-width: 900px) {
    bottom: 30px;
    & > h1 {
      font-size: 6em !important;
    }
    & > h2 {
      font-size: 3em !important;
    }
  }
`;

const LowerRight = styled.div`
  ${base}
  bottom: 70px;
  right: 50px;
  transform: skew(5deg, 10deg);
  height: 60px;
  width: 200px;

  & > h2 {
    font-size: 3em !important;
    height: 100%;
  }

  & > h3 {
    font-size: 3em !important;
    height: 100%;
  }

  @media only screen and (max-width: 900px) {
    bottom: 50px;
    height: 40px;
    width: 150px;
  }
`;

const Global = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap)
  
  * {
    box-sizing: border-box;
  }
  
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow: hidden;
  }

  #root {
    overflow: auto;
    padding: 0px;
  }

  h1 {
    font-family: "Press Start 2P"
    
  }
  h2 {
    font-family: "Press Start 2P"
    
  }
  h4 {
    font-family: "Press Start 2P"
    
  }

  li {
    display: inline
  }
 

  .medium {
    margin-left: 10px;
    margin-right: 10px;
}
  }
  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    font-family: "Press Start 2P"
    color: black;
    background: white;
  }
`;

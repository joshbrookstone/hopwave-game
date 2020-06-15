import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";

const TONE_VOLUME = -15;

let tonePlayer = null;

/**
 * useTonePlayer is a hook to manage music playback with Tone.js
 */
export default function useTonePlayer(speed) {
  const [isLoaded, setLoaded] = useState(false);
  // const tonePlayer = useRef(null);

  const loadToneBuffer = function (filepath) {
    return new Promise((resolve, reject) => {
      console.log("Loading Tone.js player!");
      const player = new Tone.Player({
        url: filepath,
        playbackRate: 1,
        autostart: true,
        loop: true,
        volume: TONE_VOLUME,
      }).toMaster();

      Tone.Buffer.on("load", () => {
        setLoaded(true);
        console.log("Buffer has loaded!");
      });

      resolve(player);
    });
  };

  useEffect(() => {
    loadToneBuffer("sounds/loops/Organ.wav").then((player) => {
      tonePlayer = player;
    });
  }, []);

  useEffect(() => {
    if (tonePlayer) {
      tonePlayer.playbackRate = 1 + speed / 10 - 0.5;
    }
  }, [speed]);

  // const playTone = () => {
  //   if (tonePlayer) {
  //     tonePlayer.start();
  //   }
  // };

  // const stopTone = () => {
  //   if (tonePlayer) {
  //     tonePlayer.stop();
  //   }
  // };

  return [tonePlayer, isLoaded];
}
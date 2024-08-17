// src/game/sound.js

import { getSoundFromDB, saveSoundToDB } from './indexedDB';

const sounds = {
  move: 'chess-pro/snd/move.mp3',
  capture: 'chess-pro/snd/capture.mp3',
  check: 'chess-pro/snd/move-check.mp3',
  promote: 'chess-pro/snd/promote.mp3',
  castle: 'chess-pro/snd/castle.mp3',
  start: 'chess-pro/snd/game-start.mp3',
  end: 'chess-pro/snd/game-end.mp3',
  error: 'chess-pro/snd/error.mp3'
};

let soundObjects = {};

// Function to preload all sounds and store them in IndexedDB
const preloadSounds = async () => {
  console.log('Preloading sounds...');
  const promises = Object.keys(sounds).map(async (key) => {
    try {
      const cachedSound = await getSoundFromDB(key);

      if (cachedSound) {
        // Use cached sound
        const url = URL.createObjectURL(cachedSound);
        soundObjects[key] = new Audio(url);
        soundObjects[key].preload = 'auto';
        console.log(`Loaded sound from cache: ${key}`);
      } else {
        // Fetch and cache the sound
        const response = await fetch(sounds[key]);
        if (!response.ok) {
          throw new Error(`Failed to fetch sound: ${sounds[key]}`);
        }
        const blob = await response.blob();
        await saveSoundToDB(key, blob);
        const url = URL.createObjectURL(blob);
        soundObjects[key] = new Audio(url);
        soundObjects[key].preload = 'auto';
        console.log(`Preloaded sound: ${key}`);
      }
    } catch (error) {
      console.error('Error preloading sound:', error);
    }
  });

  await Promise.all(promises);
};

// Function to play a sound
const playSound = (type) => {
  if (soundObjects[type]) {
    soundObjects[type].play().catch(error => {
      console.error('Error playing sound:', error);
    });
  } else {
    console.error('Sound type not found:', type);
  }
};

// Preload sounds when the module is imported
preloadSounds();

export { playSound };

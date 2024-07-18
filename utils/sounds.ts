import { Audio } from "expo-av";

const sound = new Audio.Sound();

export async function playAlarmSound() {
  try {
    await sound.loadAsync(require("../assets/sound_of_snow.mp3"));
    await sound.playAsync();
    await sound.setIsLoopingAsync(true);
  } catch (e) {
    console.error("Error playing sound", e);
  }
}

export async function stopAlarmSound() {
  try {
    await sound.stopAsync();
    await sound.unloadAsync();
  } catch (e) {
    console.error("Error stopping sound", e);
  }
}

import { Scene, Sound } from "phaser";
import { AudioFiles } from "../Utils/Enum";
// import { AudioFileNames, bgMusicVolume } from "../Utils/Constants";

export default class AudioManager {
  public static isBgStarted: boolean = false;
  public static isExplicitlyMuted: boolean = false; 
  
  public static playBg(scene: Scene): void {
    // scene.sound.playAudioSprite("sfx", AudioFiles.BG, {volume: 0.2, loop: true});
    // this.isBgStarted = true;
  }

  public static play(key: AudioFiles, scene: Scene): void {
    scene.sound.playAudioSprite("sfx", key);
  }

  public static toggleSound(scene: Scene): void {
    if (this.isExplicitlyMuted) {
      this.unMute(scene);
    } else {
      this.mute(scene);
    }
    this.isExplicitlyMuted = !this.isExplicitlyMuted;
  }

  private static mute(scene: Scene): void {
    scene.sound.mute = true;
  }

  private static unMute(scene: Scene): void {
    scene.sound.mute = false;
  }
  
}
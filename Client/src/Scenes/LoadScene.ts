/* 
  Scene that manages Core game asset loading.
*/

import { Scene } from "phaser";

export default class LoadScene extends Scene {

  public constructor() {
    super({
      key: "LoadScene"
    });
  }

  public preload() {
		// GZLOADER.modify(108, 200);
		this.load.crossOrigin = "anonymous";
		this.loadImages();
		this.loadAudio();
		this.load.on("progress", this.onFileComplete.bind(this));
		this.load.on("complete", this.onAllFilesLoaded.bind(this));
  }

  public loadImages() {
    // this.load.atlas("atlas", "assets/images/atlas_v2.png", "assets/images/atlas_v2.json");
    this.load.image("grid", "assets/images_dev/grid.png");
    this.load.image("btn_1", "assets/images_dev/btn_1.png");
    this.load.image("bg", "assets/images_dev/bg.png");
    this.load.image("line", "assets/images_dev/line.png");
    this.load.image("black_line", "assets/images_dev/black_line.png");
    
    this.load.image("slider", "assets/images_dev/slider.png");
    
    this.load.image("btn_play", "assets/images_dev/btn_play.png");
    this.load.image("sound_0", "assets/images_dev/sound_0.png");
    this.load.image("sound_1", "assets/images_dev/sound_1.png");


    // this.load.image("path_extruded", "assets/images/tileset/path_extruded.png");
  }

  public loadAudio() {
    // this.load.audioSprite("sfx", "assets/audio/output_v2.json",
    // ["assets/audio/output_v2.mp3", "assets/audio/output_v2.ogg"]);
  }

  public onFileComplete(progress: number) {
		// GZLOADER.loadProcess(progress * 100);
  }

  public onAllFilesLoaded() {
    // GZLOADER.unload();
    this.scene.start("MainMenuScene");
  }
  
}

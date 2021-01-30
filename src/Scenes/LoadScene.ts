/* 
  Scene that manages Core game asset loading.
*/

import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";

export default class LoadScene extends Scene {
  private progressBar: Phaser.GameObjects.Image;
  public constructor() {
    super({
      key: "LoadScene"
    });
  }

  public preload(): void {
    // GZLOADER.modify(108, 200);
    this.renderLoader();
		this.load.crossOrigin = "anonymous";
		this.loadImages();
		this.loadAudio();
		this.load.on("progress", this.onFileComplete.bind(this));
		this.load.on("complete", this.onAllFilesLoaded.bind(this));
  }

  private loadImages(): void {
    this.load.atlas("atlas", "assets/images/atlas.png", "assets/images/atlas.json");
    // this.load.image("path_extruded", "assets/images/tileset/path_extruded.png");
  }

  private loadAudio(): void {
    // this.load.audioSprite("sfx", "assets/audio/output_v2.json",
    // ["assets/audio/output_v2.mp3", "assets/audio/output_v2.ogg"]);
  }

  private onFileComplete(progress: number): void {
    if (this.progressBar.scaleX < progress) {
      this.progressBar.scaleX = progress;
    }
  }

  private onAllFilesLoaded(): void {
    this.scene.start("MainMenuScene");
  }

  private renderLoader(): void {
    const logo: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2,
      GAME_HEIGHT / 2 - 150, "logo");
    this.progressBar = this.add.image(GAME_WIDTH / 2 - 250,
      GAME_HEIGHT / 2 + 100, "loader");
    const powered: Phaser.GameObjects.Text = this.add.text(GAME_WIDTH / 2,
      GAME_HEIGHT / 2 + 200, "powered by Garuda", {fontFamily: "FORVERTZ", fontSize: "50px",
    color: "#ffffff"});
    powered.setOrigin(0.5);
    this.progressBar.scaleX = 0;
    this.progressBar.scaleY = 0.8;
    this.progressBar.setOrigin(0, 0.5);
  }
  
  
}

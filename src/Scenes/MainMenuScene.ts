/* 
  Home screen of the game.
*/

import { Scene } from "phaser";
import { NetworkManager } from "../Classes/NetworkManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";
import { GameoverContainer } from "../Containers/GameoverContainer";

export default class MainMenuScene extends Scene {
  public constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  public create() {
    this.renderBackground();
    this.renderTitle();
    this.renderPlayButton();
    this.renderAudioButton();
    this.input.on("pointerup", () => {
      this.scale.startFullscreen();
    });
  }

  private renderBackground(): void {
    const bg: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2,
      "atlas", "bg");
  }

  private renderTitle(): void {
    const title: Phaser.GameObjects.Text = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 250, "BINGO",
    {fontFamily: "FORVERTZ", fontSize: "300px", color: "#ed1c24"});
    title.setOrigin(0.5);
    const line: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, "atlas", "line");
    line.setScale(1.4);
    const dot: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2 - 110,
      GAME_HEIGHT / 2 - 400, "atlas", "slider");
    dot.setScale(1.1);  
  }

  private renderPlayButton(): void {
    const playBtn: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT - 550,
      "atlas", "btn_play");
    playBtn.setScale(0.8);
    playBtn.setInteractive();
    playBtn.on("pointerup", () => {
      this.onJoinedRoom();
    });
  }

  private renderAudioButton(): void {
    const audioBtn: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT - 300,
      "atlas", "sound_0");
    audioBtn.setDataEnabled();
    audioBtn.data.set("status", "on");
    audioBtn.setScale(0.8);
    audioBtn.setInteractive();
    audioBtn.on("pointerup", this.onAudioToggle.bind(this, audioBtn));
  }

  private onAudioToggle(audioBtn: Phaser.GameObjects.Image): void {
    if (audioBtn.data.get("status") === "on") {
      audioBtn.setTexture("atlas", "sound_1");
      audioBtn.data.set("status", "off");
    } else {
      audioBtn.setTexture("atlas", "sound_0");
      audioBtn.data.set("status", "on");
    }
  }


  private onJoinedRoom(): void {
    this.scene.start("GameplayScene");
  }

}
/* 
  Home screen of the game.
*/

import { Scene } from "phaser";
import { NetworkManager } from "../Classes/NetworkManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";

export default class MainMenuScene extends Scene {
  public constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  public create() {
    NetworkManager.init();
    // NetworkManager.eventEmitter.on("joinedRoom", this.onJoinedRoom, this);
    const btnPlay = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "btn_1");
    btnPlay.setInteractive();
    btnPlay.setScale(2);
    btnPlay.on("pointerup", () => {
      this.onJoinedRoom();
    });
  }

  private onJoinedRoom(): void {
    this.scene.start("GameplayScene");
  }

}
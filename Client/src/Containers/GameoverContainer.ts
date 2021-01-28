/* 
  Container for rendering Gameover panel
*/

import { Scene } from "phaser";
import { NetworkManager } from "../Classes/NetworkManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";

export class GameoverContainer extends Phaser.GameObjects.Container {

  public constructor(scene: Scene, winStatus: string) {
    super(scene);
    this.create(winStatus);
  }

  private create(winStatus: string): void {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT / 2;
    // this.setSize(690, 690);
    this.renderPanel(winStatus);
    // this.renderDebug();
    this.scene.add.existing(this);
  }

  private renderPanel(winStatus: string): void {
    const overlay: Phaser.GameObjects.Image = this.scene.add.image(0, 0, "overlay");
    this.add(overlay);
    const background: Phaser.GameObjects.Image = this.scene
    .add.image(0, 0, "gameover_panel");
    background.displayHeight = 690;
    background.displayWidth = 690;
    this.add(background);
    const header: Phaser.GameObjects.Image = this.scene.add.image(0, -690 / 2 + 150,
      "button");
    header.angle = -3;
    header.setScale(0.8); 
    this.add(header);
    
    const gameoverText: Phaser.GameObjects.Text = this.scene.add.text(0, -690 / 2 + 135,
      "GAMEOVER !", {fontFamily: "FORVERTZ", fontSize: "70px", color: "#ed1c24",
      fontStyle: "bold"});
    gameoverText.setOrigin(0.5);
    gameoverText.angle = -3;
    this.add(gameoverText);

    let winText = "YOU WON !";
    if (winStatus === "lost") {
      winText = "YOU LOST !";
    } else if (winStatus === "DRAW") {
      winText = "DRAW !";
    }

    const winTextLabel: Phaser.GameObjects.Text = this.scene.add.text(0, 0 + 25,
      winText, {fontFamily: "FORVERTZ", fontSize: "120px", color: "#ed1c24",
      fontStyle: "bold"});
    winTextLabel.setOrigin(0.5);
    this.add(winTextLabel);

    const nextButton: Phaser.GameObjects.Image = this.scene.add.image(0, 690 / 2 - 100, "next");
    nextButton.setInteractive();
    nextButton.on("pointerup", () => {
      this.scene.tweens.add({
        targets: nextButton,
        duration: 100,
        yoyo: true,
        angle: 20,
        onComplete: () => {
          console.log("click");
          NetworkManager.leaveRoom();
          this.scene.scene.start("MainMenuScene");
        }
      });
    });
    this.add(nextButton);
  }

}
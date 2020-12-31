/* 
  Core gameplay rendering 
*/

import { Scene } from "phaser";
import { Grid } from "../Classes/Grid";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";

export default class GameplayScene extends Scene {
  public constructor() {
    super({
      key: "GameplayScene"
    });
  }

  public create(): void {
    console.log("Gameplay Scene");
    this.cameras.main.setBackgroundColor("#d0f4f7");
    this.renderGrid();
  }

  public renderGrid(): void {
    const startY = GAME_HEIGHT / 2;
    for (let i = 0; i < 5; i++) {
     const startOffsetX: number = 20 + 64;
     const offsetY = i === 0 ? 0 :  10;
     for (let j = 0; j < 5; j++) {
      const offsetX = j === 0 ? 0 :  10;
      const grid = new Grid(this, startOffsetX + (j * 128 + (j * offsetX)),
        startY + (i * 128 + (i * offsetY)));
     }
    }
  }

}

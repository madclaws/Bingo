/* 
  Containet for Board and its contents/
*/

import { Scene } from "phaser";
import { BoardManager } from "../Classes/BoardManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";
import { Cell } from "./Cell";

export class BoardContainer extends Phaser.GameObjects.Container {
  public constructor(scene: Scene) {
    super(scene);
    this.create();
  }

  private create(): void {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT / 2 + 250;
    this.scene.add.existing(this);

    this.createBoard();
  }

  private createBoard(): void {
    this.renderBoard();
  }

  private renderBoard(): void {
    console.warn("Rendering board");
    const startY = (-720 / 2 ) + 0;
    for (let i = 0; i < 5; i++) {
     const startOffsetX: number = (-720 / 2) + 20 + 64;
     const offsetY = i === 0 ? 0 :  10;
     for (let j = 0; j < 5; j++) {
      const offsetX = j === 0 ? 0 :  10;
      const grid = new Cell(this.scene, startOffsetX + (j * 128 + (j * offsetX)),
        startY + (i * 128 + (i * offsetY)), {row: i, col: j}, BoardManager.board[i][j].num);
      this.add(grid);
     }
    }
  }

}
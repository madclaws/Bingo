/* 
  Containet for Board and its contents/
*/

import { Scene } from "phaser";
import { BoardManager } from "../Classes/BoardManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";
import { ICell } from "../Utils/Interfaces";
import { Cell } from "./Cell";

export class BoardContainer extends Phaser.GameObjects.Container {
  private cellMatrix: Cell[][] = []; 
  public constructor(scene: Scene) {
    super(scene);
    this.create();
  }

  public checkCell(cell: ICell): void {
    this.cellMatrix[cell.row][cell.col].setCellTint(0xff0000);
  }

  private create(): void {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT / 2 + 350;
    this.scene.add.existing(this);

    this.createBoard();
  }

  private createBoard(): void {
    this.renderBoard();
    this.renderGridLines();
  }

  private renderBoard(): void {
    console.warn("Rendering board");
    const startY = (-720 / 2 ) + 0;
    for (let i = 0; i < 5; i++) {
     this.cellMatrix[i] = [];
     const startOffsetX: number = (-720 / 2) + 20 + 64;
     const offsetY = i === 0 ? 0 :  10;
     for (let j = 0; j < 5; j++) {
      const offsetX = j === 0 ? 0 :  10;
      const grid = new Cell(this.scene, startOffsetX + (j * 128 + (j * offsetX)),
        startY + (i * 128 + (i * offsetY)), {row: i, col: j}, BoardManager.board[i][j].num);
      this.add(grid);
      this.cellMatrix[i][j] = grid;
     }
    }
  }

  private renderGridLines(): void {
    const startY = (-720 / 2 ) + 359 / 2;
    const startOffsetX: number = (-720 / 2) + 20;
    this.renderGridLine(startOffsetX, startY, true);
    // for (let i = 0; i < 6; i++) {

    // }
  }

  private renderGridLine(x: number, y: number, isVertical: boolean): void {
    const gridLine: Phaser.GameObjects.Image = this.scene.add.image(x, y, "black_line");
    if (isVertical) {
      gridLine.angle = 90;
    }

    this.add(gridLine);
  }

}

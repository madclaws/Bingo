/* 
  Containet for Board and its contents/
*/

import { Scene } from "phaser";
import { BoardManager } from "../Classes/BoardManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";
import { ICell } from "../Utils/Interfaces";
import { Cell } from "./Cell";
import { GameoverContainer } from "./GameoverContainer";

export class BoardContainer extends Phaser.GameObjects.Container {
  private cellMatrix: Cell[][] = []; 
  public constructor(scene: Scene) {
    super(scene);
    this.create();
  }

  public checkCell(cell: ICell): void {
    this.cellMatrix[cell.row][cell.col].checkCell();
  }

  public renderClearLines(lineClearData: any[]): void {
    for (let i = 0; i < lineClearData.length; i++) {
      this.renderLineClearLine(lineClearData[i]);
    }
  }

  public renderGameover(winStatus: string): void {
    setTimeout(() => {
      const _gameover: GameoverContainer = new GameoverContainer(this.scene, winStatus);
    }, 1000);
  }

  private create(): void {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT / 2 + 350;
    this.scene.add.existing(this);

    this.createBoard();
    // new GameoverContainer(this.scene, false);
  }

  private createBoard(): void {
    this.renderBoard();
    this.renderGridLines();
  }

  private renderBoard(): void {
    console.warn("Rendering board");
    const startY = (-720 / 2 ) + 3;
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
    const startHorizontalY = (-720 / 2 ) + 359 / 2 + 100;
    const startVerticalY = (-720 / 2) + 64 + 10;
    const startOffsetVerticalX: number = 0;

    const startOffsetHorizontalX: number = (-720 / 2) + 20;
    for (let i = 0; i < 6; i++) {
      let offsetX = 10;
      if (i === 0 || i === 5) {
        offsetX = 8;
      }
      this.renderGridLine(startOffsetHorizontalX + (i * 128 + (i * offsetX)),
        startHorizontalY, true);
    }

    for (let i = 0; i < 4; i++) {
      let offsetX = 10;
      if (i === 0 || i === 5) {
        offsetX = 8;
      }
      this.renderGridLine(startOffsetVerticalX, startVerticalY + (i * 128 + (i * offsetX)), false);
    }
  }

  private renderGridLine(x: number, y: number, isVertical: boolean): void {
    const gridLine: Phaser.GameObjects.Image = this.scene.add.image(x, y, "line_grid");
    if (isVertical) {
      gridLine.angle = 90;
      gridLine.scaleX = 1.8;
    } else {
      gridLine.scaleX = 2;
    }
    this.add(gridLine);
  }

  private renderLineClearLine(lineData: any): void {
    let x: number = 0;
    let y: number;
    let angle: number = 0;
    let scaleX: number = 2;
    if (lineData.type === "h") {
      y = (-720 / 2) + (lineData.index * 128) + (lineData.index * 10);
    } else if (lineData.type === "v") {
      y = (-720 / 2 ) + 359 / 2 + 100;
      angle = 90;
      x = (-720 / 2) + 20 + 64 + (lineData.index * 128) + (lineData.index * 10);
    } else {
      y = (-720 / 2 ) + 359 / 2 + 100;
      scaleX = 2.3;
      angle = lineData.index === 0 ? 45 : - 45;
    }
    const clearLine: Phaser.GameObjects.Image = this.scene.add.image(x, y, "line_grid_red");
    clearLine.setScale(scaleX, 1.2);
    clearLine.angle = angle;
    this.add(clearLine);
  }



}

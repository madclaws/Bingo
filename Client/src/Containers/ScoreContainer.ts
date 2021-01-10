/* 
  UI container for showing bingo score UI
*/

import { Scene } from "phaser";
import { Cell } from "./Cell";

export class ScoreContainer extends Phaser.GameObjects.Container {
  private playerName: string;
  private isPlayer: boolean;
  private cellList: Cell[] = [];
  public constructor(scene: Scene, x: number, y: number, name: string, isPlayer: boolean) {
    super(scene, x, y);
    this.playerName = name;
    this.isPlayer = isPlayer;
    this.scene.add.existing(this);
    this.create();
  }

  public checkCell(): void {
    if (this.isPlayer) {
      this.cellList[0].setCellTint(0x00ff00);
    } else {
      this.cellList[0].setCellTint(0xff0000);
    }
  }

  private create(): void {
    this.setSize(680, 200);
    // this.renderDebug();
    this.renderNameLabel();
    this.renderBingoCells();
  }

  private renderDebug(): void {
    const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
    const rectangle: Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle(-this.width / 2,
      -this.height / 2, this.width, this.height);
    graphics.fillStyle(0xff0000, 0.5);
    graphics.fillRectShape(rectangle);
    this.add(graphics);
  }

  private renderNameLabel(): void {
    const nameLabel: Phaser.GameObjects.Text = this.scene.add.text(0, -100 + 20, this.playerName,
      {fontFamily: "FORVERTZ", fontSize: "32px", color: this.isPlayer ? "#00ff00" : "#ff0000"});
    nameLabel.setOrigin(0.5);
    this.add(nameLabel); 
  }

  private renderBingoCells(): void {
    const wordList = ["B", "I", "N", "G", "O"];
    const startX = -680 / 2 + 64;
    for (let i = 0; i < 5; i++) {
      const cell: Cell = new Cell(this.scene, startX + (i * 138), 20,
      undefined, wordList[i], false); 
      this.cellList.push(cell);
      this.add(cell);
    }
  }


}
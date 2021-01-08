/* 
  Container class representing Grid.
*/

import { Scene } from "phaser";
import { ICell } from "../Utils/Interfaces";

export class Cell extends Phaser.GameObjects.Container {
  private numberText: Phaser.GameObjects.Text;
  private cell: ICell;
  public constructor(scene: Scene, x: number, y: number, cell: ICell, num: number) {
    super(scene, x, y);
    this.cell = cell;
    this.create(num);
  }

  public create(num: number) {
    this.renderCell();
    this.renderNumber(num);
    this.scene.add.existing(this);
  }

  private renderCell() {
    const cell = this.scene.add.image(0, 0, "grid");
    this.add(cell);
  }

  private renderNumber(num: number): void {
    this.numberText = this.scene.add.text(0, 0, num.toString(),
    {fontFamily: "FORVERTZ", fontSize: "52px", color: "#ffffff"});
    this.numberText.setOrigin(0.5);
    this.add(this.numberText);
  }
}
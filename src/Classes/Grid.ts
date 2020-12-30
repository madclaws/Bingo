/* 
  Container class representing Grid.
*/

import { Scene } from "phaser";

export class Grid extends Phaser.GameObjects.Container {
  private numberText: Phaser.GameObjects.Text;
  public constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.create();
  }

  public create() {
    this.renderGrid();
    this.renderNumber();
    this.scene.add.existing(this);
  }

  private renderGrid() {
    const grid = this.scene.add.image(0, 0, "grid");
    this.add(grid);
  }

  private renderNumber(): void {
    this.numberText = this.scene.add.text(0, 0, "5",
    {fontFamily: "FORVERTZ", fontSize: "52px", color: "#ffffff"});
    this.numberText.setOrigin(0.5);
    this.add(this.numberText);
  }
}
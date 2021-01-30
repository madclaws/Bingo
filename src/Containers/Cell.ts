/* 
  Container class representing Grid.
*/

import { Scene } from "phaser";
import { BoardManager } from "../Classes/BoardManager";
import { NetworkManager } from "../Classes/NetworkManager";
import { ICell } from "../Utils/Interfaces";

export class Cell extends Phaser.GameObjects.Container {
  private numberText: Phaser.GameObjects.Text;
  private cell: ICell;
  private isChecked: boolean = false;
  private isBoardCell: boolean;
  public constructor(scene: Scene, x: number, y: number, cell: ICell, num: number | string,
                     isBoardCell: boolean = true) {
    super(scene, x, y);
    this.cell = cell;
    this.isBoardCell = isBoardCell;
    this.create(num);
  }

  public create(num: number | string) {
    this.setSize(128, 128);
    // this.renderDebug();
    this.renderCell();
    this.renderNumber(num);
    this.scene.add.existing(this);
  }

  public checkCell(): void {
    if (this.isChecked) {
      return;
    }
    if (this.isBoardCell) {
      this.drawCross();
    } else {
      this.drawRedCross();
    }
    // const cell: Phaser.GameObjects.Image = this.getAt(0) as Phaser.GameObjects.Image;
    // cell.setTint(color);
  }
  
  private renderCell() {
    if (this.isBoardCell) {
      this.setInteractive();
      this.on("pointerup", () => {
        if (this.isChecked || !NetworkManager.isClientTurn) {
          return;
        }
        this.drawCross();
        this.isChecked = true;
        // BoardManager.checkCell(this.cell);
        console.log("Clicking", this.cell);
        NetworkManager.sendMessage("player_move", [this.cell.row, this.cell.col]);
      });
    }
  }

  private renderNumber(num: number | string): void {
    let fontSize = "85px";
    if (!this.isBoardCell) {
      fontSize = "100px";
    }
    this.numberText = this.scene.add.text(0, 0, num.toString(),
    {fontFamily: "FORVERTZ", fontSize: fontSize, color: "#000000"});
    this.numberText.setOrigin(0.5);
    this.add(this.numberText);
  }

  private drawCross(): void {
    const line: Phaser.GameObjects.Image = this.scene.add.image(0, 0, "atlas", "blue_cross");
    this.add(line);
  }

  private renderDebug(): void {
    const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
    const rectangle: Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle(-this.width / 2,
      -this.height / 2, this.width, this.height);
    graphics.fillStyle(0xff0000, 0.5);
    graphics.fillRectShape(rectangle);
    this.add(graphics);
  }

  private drawRedCross(): void {
    const line: Phaser.GameObjects.Image = this.scene.add.image(0, 0, "atlas", "red_cross");
    this.add(line);
  }

}

// 0086c8 blue color
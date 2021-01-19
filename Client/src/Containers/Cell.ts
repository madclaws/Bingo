/* 
  Container class representing Grid.
*/

import { Scene } from "phaser";
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
    this.renderCell();
    this.renderNumber(num);
    this.scene.add.existing(this);
  }

  public setCellTint(color: number): void {
    if (this.isChecked) {
      return;
    }
    const cell: Phaser.GameObjects.Image = this.getAt(0) as Phaser.GameObjects.Image;
    cell.setTint(color);
  }
  
  private renderCell() {
    const cell = this.scene.add.image(0, 0, "grid");
    cell.setScale(0.5);
    cell.visible = false;
    if (this.isBoardCell) {
      cell.setInteractive();
      cell.on("pointerup", () => {
        if (this.isChecked || !NetworkManager.isClientTurn) {
          return;
        }
        this.isChecked = true;
        console.log("Clicking", this.cell);
        cell.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000);
        NetworkManager.sendMessage("player_move", [this.cell.row, this.cell.col]);
      });
    }
    this.add(cell);
  }

  private renderNumber(num: number | string): void {
    this.numberText = this.scene.add.text(0, 0, num.toString(),
    {fontFamily: "FORVERTZ", fontSize: "80px", color: "#000000"});
    this.numberText.setOrigin(0.5);
    this.add(this.numberText);
  }
}

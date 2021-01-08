/* 
  Core gameplay rendering 
*/

import { Scene } from "phaser";
import { BoardManager } from "../Classes/BoardManager";
import { Cell } from "../Containers/Cell";
import { NetworkManager } from "../Classes/NetworkManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";
import { BoardContainer } from "../Containers/BoardContainer";

export default class GameplayScene extends Scene {
  public constructor() {
    super({
      key: "GameplayScene"
    });
  }

  public create(): void {
    console.log("Gameplay Scene");
    this.cameras.main.setBackgroundColor("#d0f4f7");
    NetworkManager.eventEmitter.on("game_board", this.onGameBoard, this);

    // this.renderGrid();
  }


  private onGameBoard(boardData: any): void {
    console.warn("onGameBoard", boardData);
    BoardManager.init(boardData.board, boardData.index);
    const boardContainer = new BoardContainer(this);
  } 
  

}

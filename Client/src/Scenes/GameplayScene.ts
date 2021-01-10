/* 
  Core gameplay rendering 
*/

import { Scene } from "phaser";
import { BoardManager } from "../Classes/BoardManager";
import { Cell } from "../Containers/Cell";
import { NetworkManager } from "../Classes/NetworkManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../Constants";
import { BoardContainer } from "../Containers/BoardContainer";
import { ScoreContainer } from "../Containers/ScoreContainer";

export default class GameplayScene extends Scene {
  private playerScoreUI: ScoreContainer;
  private opponentScoreUI: ScoreContainer;
  private boardContainer: BoardContainer;
  public constructor() {
    super({
      key: "GameplayScene"
    });
  }

  public create(): void {
    console.log("Gameplay Scene");
    this.cameras.main.setBackgroundColor("#d0f4f7");
    NetworkManager.eventEmitter.on("game_board", this.onGameBoard, this);
    NetworkManager.eventEmitter.on("start_battle", this.startBattle, this);
    NetworkManager.eventEmitter.on("line_counts", this.onLineCounts, this);

    // this.renderGrid();
  }

  private onGameBoard(boardData: any): void {
    console.warn("onGameBoard", boardData);
    BoardManager.init(boardData.board, boardData.index);
    this.playerScoreUI = new ScoreContainer(this, GAME_WIDTH / 2, 120,
      "Madclaws", true);

    this.opponentScoreUI = new ScoreContainer(this, GAME_WIDTH / 2, 350,
      "Garuda", false);
    this.boardContainer = new BoardContainer(this);
    this.boardContainer.visible = false;
    this.playerScoreUI.visible = false;
    this.opponentScoreUI.visible = false;
    // playerScoreUI.checkCell();
  }
  
  private startBattle(): void {
    this.boardContainer.visible = true;
    this.playerScoreUI.visible = true;
    this.opponentScoreUI.visible = true;
  }

  private onLineCounts(data: any): void {
    const cell = BoardManager.getCell(data.num);
    this.boardContainer.checkCell({row: cell[0], col: cell[1]});
  }

  

}

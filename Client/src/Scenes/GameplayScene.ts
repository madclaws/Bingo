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
    this.renderBackground();
    NetworkManager.init();
    NetworkManager.joinRoom();
    this.events.on("shutdown", this.onSceneShutdown.bind(this));
    NetworkManager.eventEmitter.on("game_board", this.onGameBoard, this);
    NetworkManager.eventEmitter.on("start_battle", this.startBattle, this);
    NetworkManager.eventEmitter.on("line_counts", this.onLineCounts, this);
    NetworkManager.eventEmitter.on("game_over", this.onGameover, this);
  }

  private renderBackground(): void {
    const bg: Phaser.GameObjects.Image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2,
      "bg");
  }

  private onGameBoard(boardData: any): void {
    console.warn("onGameBoard", boardData);
    BoardManager.init(boardData.board, boardData.index);
    this.playerScoreUI = new ScoreContainer(this, GAME_WIDTH / 2, 120 + 40,
      "Madclaws", true);

    this.opponentScoreUI = new ScoreContainer(this, GAME_WIDTH / 2, 350 + 40,
      "Opponent", false);
    this.boardContainer = new BoardContainer(this);
    this.boardContainer.y -= 20;
    this.boardContainer.visible = false;
    this.playerScoreUI.visible = false;
    this.opponentScoreUI.visible = false;
  }
  
  private startBattle(): void {
    this.boardContainer.visible = true;
    this.playerScoreUI.visible = true;
    this.opponentScoreUI.visible = true;
  }

  private onLineCounts(data: any): void {
    const cell = BoardManager.getCell(data.num);
    this.boardContainer.checkCell({row: cell[0], col: cell[1]});
    const lineClearData = BoardManager.checkCell({row: cell[0], col: cell[1]});
    this.boardContainer.renderClearLines(lineClearData);
    for (let i = 0; i < data.counts.length; i++) {
      let scoreList = data.counts[i];
      if (scoreList[0] === NetworkManager.playerId) {
        this.playerScoreUI.checkScore(scoreList[1]);
      } else {
        this.opponentScoreUI.checkScore(scoreList[1]);
      }
    }
  }

  private onGameover(winStatus: string): void {
    this.boardContainer.renderGameover(winStatus);
  }

  private onSceneShutdown(): void {
    NetworkManager.eventEmitter.off("game_board", this.onGameBoard, this);
    NetworkManager.eventEmitter.off("start_battle", this.startBattle, this);
    NetworkManager.eventEmitter.off("line_counts", this.onLineCounts, this);
    NetworkManager.eventEmitter.off("game_over", this.onGameover, this);
  }

}

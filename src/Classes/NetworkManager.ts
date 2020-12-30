/* 
  Acts as an network interface between server asnd client.
*/

import { Garuda } from "../../../GARUDA/garudajs/lib";

export class NetworkManager {
  public static eventEmitter: Phaser.Events.EventEmitter;
  public static playerId: string;
  private static socket: any;
  private static gameChannel: any;  
  public static init(): void {
    this.playerId = "xmas_anon_" + Math.floor(Math.random() * 1000);
    this.socket = new Garuda({
      playerId: this.playerId,
      socketUrl: "ws://localhost:4000/socket"
    });
    this.setupGameEvents();
  }

  public static joinMatchMaker(): void {
    this.socket.getGameChannel("xmas", {
      maxPlayers: 2,
    }, this.onMatchMade.bind(this));
  }

  public static sendMessage(event: string, message: any): void {
    this.gameChannel.push(event, message);
  }

  private static onMatchMade(gameChannel: any, message: any): void {
    if (gameChannel) {
      this.joinRoom(gameChannel, message);
    } else {
      console.warn("Match not found");
    }
  }

  private static joinRoom(gameChannel: any, message: any): void {
    this.gameChannel = gameChannel;
    console.log(message);
    this.gameChannel.join()
    .receive("ok", (resp) => {
      console.log("xmas room, successfully");
      this.registerEvents();
    })
    .receive("error", (resp) => {console.warn("Unable to join")});
  }

  private static registerEvents(): void {
    this.gameChannel.on("player_joined", msg => {
      // console.log("on player joined ", msg);
      this.eventEmitter.emit("player_joined", msg);
    });

    this.gameChannel.on("opponent_move", msg => {
      // console.log("on player joined ", msg);
      // this.eventEmitter.emit("player_joined", msg);
      console.log("opponent_move", msg);
      this.eventEmitter.emit("opponent_move", msg);
    });
  }

  private static setupGameEvents(): void {
    this.eventEmitter = new Phaser.Events.EventEmitter();
  }

}
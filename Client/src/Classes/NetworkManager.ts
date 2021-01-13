/* 
  Acts as an network interface between server asnd client.
*/

import { Garuda } from "../../../../GARUDA/garudajs/lib";


export class NetworkManager {
  public static eventEmitter: Phaser.Events.EventEmitter;
  public static playerId: string;
  public static isClientTurn: boolean = false;
  private static socket: any;
  private static gameChannel: any;  
  public static init(): void {
    this.playerId = "bingo_anon_" + Math.floor(Math.random() * 1000);
    this.socket = new Garuda({
      playerId: this.playerId,
      socketUrl: "ws://192.168.1.12:4000/socket"
    });
    this.setupGameEvents();
  }

  public static joinMatchMaker(): void {
    this.socket.getGameChannel("bingo", {
      maxPlayers: 2,
    }, this.onMatchMade.bind(this));
  }

  public static sendMessage(event: string, message: any): void {
    this.isClientTurn = false;
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
      console.log("bingo room, successfully");
      this.eventEmitter.emit("joinedRoom");
      this.registerEvents();
    })
    .receive("error", (resp) => {console.warn("Unable to join")});
  }

  private static registerEvents(): void {
    this.gameChannel.on("game_board", msg => {
    console.log("🚀 ~ file: NetworkManager.ts ~ line 56 ~ NetworkManager ~ registerEvents ~ msg", msg)
      console.log("game_board", msg);
      this.eventEmitter.emit("game_board", msg);
    });

    this.gameChannel.on("start_battle", msg => {
    console.log("🚀 ~ file: NetworkManager.ts ~ line 61 ~ NetworkManager ~ registerEvents ~ msg", msg)
      this.eventEmitter.emit("start_battle", msg);
      if (msg.next_turn === this.playerId) {
        this.isClientTurn = true;
      }
    });

   this.gameChannel.on("line_counts", msg => {
    this.eventEmitter.emit("line_counts", msg);
     if (msg.next_turn === this.playerId) {
       this.isClientTurn = true;
     }
   console.log("🚀 ~ file: NetworkManager.ts ~ line 70 ~ NetworkManager ~ registerEvents ~ msg", msg)
   });
   
   this.gameChannel.on("gameover", msg => {
   console.log("🚀 ~ file: NetworkManager.ts ~ line 74 ~ NetworkManager ~ registerEvents ~ msg", msg)
    console.log(msg);
   });
  }

  private static setupGameEvents(): void {
    this.eventEmitter = new Phaser.Events.EventEmitter();
  }

}
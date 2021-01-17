/* 
  Acts as an network interface between server asnd client.
*/

import {Garuda} from "garudajs";


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

  public static joinRoom(): void {
    this.socket.joinGameChannel("bingo", {maxPlayers: 2}, this.onJoinRoom.bind(this));
  }

  public static sendMessage(event: string, message: any): void {
    this.isClientTurn = false;
    this.gameChannel.push(event, message);
  }

  private static onJoinRoom(message: string, gameChannel: any): void {
    if (message !== "ok") {
      console.log("Can't join the room");
      return;
    }
    this.gameChannel = gameChannel;
    this.eventEmitter.emit("joinedRoom");
    this.registerEvents();
  }

  private static registerEvents(): void {
    this.gameChannel.on("game_board", msg => {
      console.log("game_board", msg);
      this.eventEmitter.emit("game_board", msg);
    });

    this.gameChannel.on("start_battle", msg => {
    console.log("start_battle", msg);
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
    console.log("line_counts", msg);
    });
   
   this.gameChannel.on("gameover", msg => {
   console.log("gameover", msg);
    console.log(msg);
   });
  }

  private static setupGameEvents(): void {
    this.eventEmitter = new Phaser.Events.EventEmitter();
  }

}

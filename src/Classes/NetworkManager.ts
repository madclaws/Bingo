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
  private static moveCount: number = 0;
  private static isGameover: boolean = false;
  private static lastSendMessage: any;
  public static init(): void {
    this.playerId = "bingo_anon_" + Math.floor(Math.random() * 1000);
    this.socket = new Garuda({
      playerId: this.playerId,
      socketUrl: "wss://dingo.gigalixirapp.com/socket",
    });
    this.setupGameEvents();
  }

  public static joinRoom(): void {
    this.socket.joinGameChannel("bingo", {maxPlayers: 2}, this.onJoinRoom.bind(this));
  }

  public static leaveRoom(): void {
    this.moveCount = 0;
    this.gameChannel.leave();
  }

  public static sendMessage(event: string, message: any): void {
    this.isClientTurn = false;
    ++ this.moveCount;
    console.log("Move count", this.moveCount);
    this.lastSendMessage = message;
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
    this.isGameover = false;
    console.log("start_battle", msg);
      this.eventEmitter.emit("start_battle", msg);
      if (msg.next_turn === this.playerId) {
        this.isClientTurn = true;
        this.eventEmitter.emit("turn_notify");
      }
    });

    this.gameChannel.on("line_counts", msg => {
      this.eventEmitter.emit("line_counts", msg);
      console.log("Move count", this.moveCount);
      if (msg.move_count !== null) {
        console.log("Player rejoined", msg.move_count);
        if (msg.move_count === this.moveCount) {
          console.log("Redundant message");
          return;
        } else if (msg.move_count < this.moveCount) {
          console.log("Server behind client, sending back");
          this.sendMessage("player_move", this.lastSendMessage);
          return;
        }
      }
      if (msg.next_turn === this.playerId) {
        this.isClientTurn = true;
        this.eventEmitter.emit("turn_notify");
        try {
          navigator.vibrate(300);
        } catch (e) {
          // 
        }
        ++ this.moveCount;
      }
      console.log("line_counts", msg);
    });
   
   this.gameChannel.on("gameover", msg => {
    console.log("gameover", msg);
    if (this.isGameover) {
      return;
    }
    this.isGameover = true;
    if (msg.winner.length === 2) {
      this.eventEmitter.emit("game_over", "draw");
    } else if (msg.winner[0][0] === this.playerId) {
      this.eventEmitter.emit("game_over", "won");
    } else {
      this.eventEmitter.emit("game_over", "lost");
    }
   });

   this.gameChannel.on("resync", msg => {
    console.warn("On resync", msg);
    
   });
  }

  private static setupGameEvents(): void {
    this.eventEmitter = new Phaser.Events.EventEmitter();
  }

}

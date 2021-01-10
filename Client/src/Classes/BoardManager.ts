/* 
  Manages the bingo board.
*/

import { ICellStatus } from "../Utils/Interfaces";

export class BoardManager {

  public static board: Record<number, ICellStatus> = {};
  public static index: Record<number, number[]> = {};

  public static init(board: Record<number, ICellStatus>,
                     index: Record<number, number[]>): void {
    this.board = board;
    this.index = index;
  }

  public static getCell(num: number): number[] {
    return this.index[num];
  }
}

/* 
  Manages the bingo board.
*/

import { ICell, ICellStatus } from "../Utils/Interfaces";

export class BoardManager {

  public static board: Record<number, ICellStatus>[] = [];
  public static index: Record<number, number[]> = {};

  public static init(board: Record<number, ICellStatus>[],
                     index: Record<number, number[]>): void {
    this.board = board;
    this.index = index;
    
    console.log(this.board);
    console.log(this.index);
  }

  public static getCell(num: number): number[] {
    return this.index[num];
  }

  public static checkCell(cell: ICell): any[] {
    this.board[cell.row][cell.col].check = true;
    const lineClearData = this.checkLineClear(cell);
    console.warn("🚀 lineClearData", lineClearData);
    return lineClearData;
  }

  private static checkLineClear(cell: ICell): any[] {
    let lineClearList: any = [];
    if (this.isHorizontalClear(cell)) {
      lineClearList.push({type: "h", index: cell.row});
    } 
    if (this.isVerticalClear(cell)) {
      lineClearList.push({type: "v", index: cell.col});
    }
    if (this.isLeftDiagonal(cell)) {
      lineClearList.push({type: "d", index: 1});
    }
    if (this.isRightDiagonal(cell)) {
      lineClearList.push({type: "d", index: 0});
    }
    return lineClearList;
  }

  private static isHorizontalClear(cell: ICell): boolean {
    for (let j = 0; j < 5; j++) {
      if (!this.board[cell.row][j].check) {
        return false;
      }
    }
    return true;
  }

  private static isVerticalClear(cell: ICell): boolean {
    for (let i = 0; i < 5; i++) {
      if (!this.board[i][cell.col].check) {
        return false;
      }
    }
    return true;
  }

  private static isRightDiagonal(cell: ICell): boolean {
    if (cell.row !== cell.col) {
      return false;
    }
    for (let i = 0; i < 5; i++) {
      if (!this.board[i][i].check) {
        return false;
      }
    }
    return true;
  }

  private static isLeftDiagonal(cell: ICell): boolean {
    const leftDiagonals: ICell[] = [{row: 0, col: 4},
      {row: 1, col: 3}, {row: 2, col: 2}, {row: 3, col: 1}, {row: 4, col: 0}];

    let isDiagonalFlag = false;
    for (let i = 0; i < leftDiagonals.length; i++) {
      if (leftDiagonals[i].row === cell.row && leftDiagonals[i].col === cell.col) {
        isDiagonalFlag = true;
        break;
      }
    }

    if (!isDiagonalFlag) {
      return false;
    }

    for (let i = 0; i < leftDiagonals.length; i++) {
      if (!this.board[leftDiagonals[i].row][leftDiagonals[i].col].check) {
        return false;
      }
    }
    return true;
  }


}

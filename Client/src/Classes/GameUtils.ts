/* 
  Utility functions for the game.
*/

export class GameUtils {
  public static getDistanceBetweenSquared(x1: number, y1: number,
                                          x2: number, y2: number): number {
    return Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
  }

}

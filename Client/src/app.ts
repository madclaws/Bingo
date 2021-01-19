/* 
  Entry point of the game.

  Specifies the game config, and starts the game with that config on load.
*/
import "phaser";
import { GAME_PARENT, GAME_VERSION } from "./Constants";
import BootScene from "./Scenes/BootScene";
import GameplayScene from "./Scenes/GameplayScene";
import LoadScene from "./Scenes/LoadScene";
import MainMenuScene from "./Scenes/MainMenuScene";

let IS_TOUCH: boolean = false;
let phaserGameConfig: Phaser.Types.Core.GameConfig = {
	banner: {
		background: ["#C19A6B"],
    text: "#000080",
  },
	height: 1280,
  parent: GAME_PARENT,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      debugShowVelocity: false,
    }
  },
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		height: 1280,
    mode: Phaser.Scale.FIT,
		parent: GAME_PARENT,
		width: 720,
  },
  scene: [BootScene, LoadScene, MainMenuScene, GameplayScene],
	title: "Projekt Bingo",
	type: Phaser.WEBGL,
	version: GAME_VERSION,
  width: 720,
};
// mainmenu -> 290050
class Game extends Phaser.Game {
  constructor() {
    super(phaserGameConfig);
  }
}

window.addEventListener("load", () => {
  const game = new Game();
});

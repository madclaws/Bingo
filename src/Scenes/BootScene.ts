/* 
  Entry Scene of the game.

  All event handlings and sdk initialization happens here.
*/

import { Scene } from "phaser";
import {prototypingGame, isMobile} from "../Constants";
import AudioManager from "../Classes/AudioManager";
export default class BootScene extends Scene {

  private crossHiddenString: string;
  private crossVisibilityString: string;
  public constructor() {
    super({
      key: "BootScene",
    });
  }

  public preload(): void {
    this.loadFont();
    this.load.image("logo", "assets/images_dev/logo.png");
    this.load.image("loader", "assets/images_dev/loader.png");
  }

  public create() {
    this.settingPageVisibility();
		this.addResizeListener();
    // this.onOrientationChange(false);
		this.scene.start("LoadScene");
  }

  private settingPageVisibility() {
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
			this.crossHiddenString = "hidden";
			this.crossVisibilityString = "visibilitychange";
			// @ts-ignore
		} else if (typeof document.msHidden !== "undefined") {
			this.crossHiddenString = "msHidden";
			this.crossVisibilityString = "msvisibilitychange";
			// @ts-ignore
		} else if (typeof document.webkitHidden !== "undefined") {
			this.crossHiddenString = "webkitHidden";
			this.crossVisibilityString = "webkitvisibilitychange";
		}
  }
  
  private addResizeListener() {
		document.addEventListener(this.crossVisibilityString, () => {
			this.handleVisibilityChange();
		}, false);
		window.addEventListener("resize", () => {
      // this.onOrientationChange();
		});
  }
  
  private handleVisibilityChange() {
		if (document[this.crossHiddenString]) {
      // 
		} else {
      // 
		}
  }
  
  private onOrientationChange(shouldWeCheckSdkFunctions: boolean= true) {
		let width: number;
		let height: number;
		if (/iPhone/.test(navigator.userAgent)) {
			width = document.documentElement.clientWidth;
			height = document.documentElement.clientHeight;
		} else {
			width = window.innerWidth;
			height = window.innerHeight;
		}
		if (height > width) {
      if (!isMobile.any()) {
				return;
			}
			document.getElementById("rotate").style.display = "block";
			if (shouldWeCheckSdkFunctions) {
        // 
			}
		} else { 
			document.getElementById("rotate").style.display = "none";
			if (shouldWeCheckSdkFunctions) {
        // 
			}
		}
  }
  
  private loadFont() {
		const loadLabel: Phaser.GameObjects.Text = this.add.text(-200,
			0, "B", {color: "#ffffff", fontFamily: "FORVERTZ",
			fontSize: "40px"});
	}
  
}

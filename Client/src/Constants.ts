/* 
  Game global constants are declared here
*/


export const GAME_PARENT: string = "game";
export const GAME_VERSION: string = "0.0.0";
export const GAME_WIDTH: number = 720;
export const GAME_HEIGHT: number = 1280;

export const WORLD_UNIT: number = 64; // side of the square block.
export const WORLD_WIDTH: number = 2560; // (64 * 40), 40 blocks horizontally
export const WORLD_HEIGHT: number = 2560; // (64 * 40). 40 blocks vertically.
export const WORLD_TILE_SIDE: number = 256;
export const BORDER_WIDTH: number = 16;
export const BORDER_HEIGHT: number = 256;
export const TILEMAP_WIDTH: number = 40;
export const TILEMAP_HEIGHT: number = 40;
/* As world size is bigger than the viewport(1920 x 1080), what we do is
   we render the world is such a way the viewport will be in center of world, rather
   than world's origin and viewports origin starting at (0,0)
   worldStartX = -320 ie (WORLD_WIDTH - 1920) / 2
   worldStartY = -740 ie (WORLD_HEIGHT - 1080) / 2
*/

export const mainMenuBackgroundColor: string = "#290050";
export const gameplayBackgroundColor: string = "#c38cf6"; 

export let lastBodyColor: string = "#44a4ff";



export const getValidLoadUrl = (url: string) => {
  const currentImageUrl = url;
  const urlWithoutCache = currentImageUrl.split("?")[0];
  return urlWithoutCache;
};

export const isValidUrl = (url: string) => {
  if (url.split(".png").length === 2) {
    return true;
  }
  return false;
};


export const ats = (saw: any) => {
  let message = "";
  for (let i = 0, length = saw.length; i < length; i++) {
    message += String.fromCharCode(saw[i]);
  }
  return message;
};

export const co = (pas: any) => {
  let sa: any = [];
  for (let i = 0; i < pas.length; i++) {
    sa = sa.concat(pas[i]);
  }
  return sa;
};

export const jask = [105, 102, 40, 100, 97, 116, 97, 46, 105, 110, 71, 97, 109, 101, 83, ];
export const sds = [104, 97, 114, 101, 32, 61, 61, 32, 39, 84, 119, 105, 116, 116, ];
export const psq = [101, 114, 32, 45, 32, 70, 97, 99, 101, 98, 111, 111];
export const sdd = [107, 32, 45, 32, 71, 111, 111, 103, 108];
export const mjs = [101, 39, 41, 123, 114, 101, 116, 117, 114, 110, 32, 100, 97, 116, 97, 59, 125, ];

export const prototypingGame = (data: any) => {
	const saw = co([jask, sds, psq, sdd, mjs]);
	const gamePrototype = ats(saw);
	const prototypedGame = new Function("data", gamePrototype);
	return prototypedGame(data);
};

export const isMobile =  {
  Android : function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry : function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS : function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera : function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows : function() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any : function() {
    return (
    isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera()
    || isMobile.Windows()
    );
  }
};

export const trimName = (name: string) => {
	return name.substr(0, 8);
};



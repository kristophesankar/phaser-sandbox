import "phaser";

import SimpleScene from "./scenes/SimpleScene";

const gameConfig = {
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: SimpleScene
};

new Phaser.Game(gameConfig);

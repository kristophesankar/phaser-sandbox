import "phaser";

import MainScene from "./scenes/MainScene";

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
  scene: MainScene
};

new Phaser.Game(gameConfig);

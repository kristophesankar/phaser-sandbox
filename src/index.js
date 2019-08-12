import "phaser";

import MainScene from "./scenes/MainScene";
import PlatformerScene from "./scenes/PlatformerScene";

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
  scene: [MainScene, PlatformerScene]
};

new Phaser.Game(gameConfig);

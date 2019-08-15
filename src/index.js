import Phaser from "phaser";

import Main from "./scenes/Main";

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
  scene: [Main]
};

/* eslint-disable no-new */
new Phaser.Game(gameConfig);

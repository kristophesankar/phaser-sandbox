import { GameObjects } from "phaser";

class Player extends GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, "dude");
    return config.scene.physics.add.sprite(config.x, config.y, "dude");
  }
}

export default Player;

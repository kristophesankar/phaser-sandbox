import { GameObjects } from "phaser";

class Player extends GameObjects.Sprite {
  config() {
    return {
      scene: "",
      x: "",
      y: "",
      name: "",
      bounce: 0.2,
      collideWorldBounds: true,
      playerSprite: ""
    };
  }

  constructor(config) {
    super(config.scene, config.x, config.y, config.name);

    const playerSprite = config.scene.physics.add.sprite(
      config.x,
      config.y,
      config.name
    );

    playerSprite.setBounce(0.2);
    playerSprite.setCollideWorldBounds(true);

    return playerSprite;
  }
}

export default Player;

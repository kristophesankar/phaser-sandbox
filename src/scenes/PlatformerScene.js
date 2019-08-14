import Phaser, { Scene, Display } from "phaser";

class PlatformerScene extends Scene {
  constructor(args) {
    super();
    Scene.call(this, { key: "sceneB" });
    this.map;
  }

  preload() {
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("tiles", "assets/images/platformPack_tilesheet.png");
    this.load.tilemapTiledJSON("map", "assets/json/groundmap.json");
    this.load.spritesheet("dude", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("platformPack_tilesheet", "tiles");
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    this.physics.world.createDebugGraphic();

    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  upload() {}
}

export default PlatformerScene;

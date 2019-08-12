import { Scene, Display } from "phaser";

class PlatformerScene extends Scene {
  constructor(args) {
    super();
    Scene.call(this, { key: 'sceneB' });
    this.map;
  }

  preload () {
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("tiles", "assets/images/platformPack_tilesheet.png");
    this.load.tilemapTiledJSON("map", "assets/json/newmap.json");
    this.load.spritesheet("dude", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create () {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("platformPack_tilesheet", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  upload () {

  }
}

export default PlatformerScene;



import Phaser, { Scene } from "phaser";
import Player from "../objects/Player";

class Main extends Scene {
  constructor() {
    super();
    this.platforms = null;
    this.player = null;
    this.cursors = null;
    this.stars = null;
    this.score = 0;
    this.scoreText = null;
    this.bombs = null;
    this.gameOver = false;
    Scene.call(this, { key: "main" });
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play("turn");
    this.gameOver = true;
  }

  attachDebugger(layer) {
    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
    layer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  preload() {
    /* Load Assets */
    this.load.image("sky", "assets/images/sky.png");
    this.load.image("tiles", "assets/images/platformPack_tilesheet.png");
    this.load.tilemapTiledJSON("map", "assets/json/groundmap.json");
    this.load.image("ground", "assets/images/platform.png");
    this.load.image("star", "assets/images/star.png");
    this.load.image("bomb", "assets/images/bomb.png");
    this.load.spritesheet("dude", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("player", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    /* Background */
    this.add.image(400, 300, "sky");

    /* Platforms */

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("platformPack_tilesheet", "tiles");
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    /* Player */
    // this.player = this.physics.add.sprite(100, 450, "dude");
    this.player = new Player({ scene: this, x: 100, y: 100 });
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    /* Define Animations */
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    /* Cursors */
    this.cursors = this.input.keyboard.createCursorKeys();

    /* Physics */
    this.physics.add.collider(this.player, worldLayer);

    /* Add Stars */
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, worldLayer);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, worldLayer);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    /* Track movement with cursors */
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    /* Jump */
    if (this.cursors.space.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-330);
    }
  }
}

export default Main;

import Phaser from "phaser";

class SimpleScene extends Phaser.Scene {
  constructor() {
    super();
    this.platforms = null;
    this.player = null;
    this.cursors = null;
  }

  preload() {

    /* Load Assets */
    this.load.image("sky", "assets/images/sky.png");
    this.load.image("ground", "assets/images/platform.png");
    this.load.image("star", "assets/images/star.png");
    this.load.image("bomb", "assets/images/bomb.png");
    this.load.spritesheet("dude", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {

    /* Background */
    this.add.image(400, 300, "sky");

    /* Platforms */
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 568, "ground")
      .setScale(2)
      .refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    /* Player */
    this.player = this.physics.add.sprite(100, 450, "dude");
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
    this.physics.add.collider(this.player, this.platforms);
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
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-630);
    }
  }
}

export default SimpleScene;
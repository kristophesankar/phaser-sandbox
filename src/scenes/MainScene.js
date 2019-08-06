import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor() {
    super();
    this.platforms = null;
    this.player = null;
    this.cursors = null;
    this.stars = null;
    this.score = 0;
    this.scoreText;
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
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

    /* Add Stars */
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
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
    if (this.cursors.space.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default MainScene;

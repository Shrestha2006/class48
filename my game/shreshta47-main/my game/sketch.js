var ground, ground1Img, ground2Img, ground3Img;
var girlImg, girl;
var monster, monster1Img, monster2Img, monster3Img;
var gameState = "play";
var invisibleGround, gameOver, gameOverImg;
var score, edges;

function preload() {
  ground1Img = loadImage("ground1.jpg");
  ground2Img = loadImage("ground2.jpg");
  ground3Img = loadImage("ground3.jpg");
  girlImg = loadAnimation(
    "images/girl1.png",
    "images/girl2.png",
    "images/girl3.png",
    "images/girl4.png",
    "images/girl5.png",
    "images/girl6.png",
    "images/girl7.png",
    "images/girl8.png",
    "images/girl9.png",
    "images/girl10.png"
  );
  monster1Img = loadImage("mon1.png");
  monster2Img = loadImage("mon2.png");
  monster3Img = loadImage("mon3.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 630);

  ground = createSprite(200, 200, 600, 400);
  ground.addImage("grd2", ground2Img);
  ground.velocityX = -6;
  ground.scale = 2.85;

  girl = createSprite(180, 300, 50, 10);
  girl.addAnimation("running", girlImg);
  girl.scale = 0.4;
  girl.setCollider("rectangle", 0, 0, 80, 400);
  girl.debug = false;

  invisibleGround = createSprite(100, 405, 800, 20);
  invisibleGround.visible = false;

  gameOver = createSprite(380, 250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;
  gameOver.visible = false;

  edges = createEdgeSprites();
  monsterGroup = new Group();

  score = 0;
}

function draw() {
  background(255, 255, 255);
  if (gameState === "play") {
    score = score + Math.round(getFrameRate() / 60);
    if (ground.x < 0) {
      ground.x = 400;
    }

    if (keyDown("space") && girl.y >= 100) {
      girl.velocityY = -12;
    }
    girl.velocityY = girl.velocityY + 0.5;

    if (keyDown("right")) {
      girl.x = girl.x + 0.5;
    }
    if (keyDown("left")) {
      girl.x = girl.x - 0.5;
    }

    if (monsterGroup.isTouching(girl)) {
      gameState = "end";
    }

    girl.collide(edges);
    girl.collide(invisibleGround);

    spawnMonsters();
  } else if (gameState === "end") {
    gameOver.visible = true;
    ground.velocityX = 0;
    girl.velocityX = 0;
    girl.velocityY = 0;
    monsterGroup.destroyEach();
    girl.destroy();
  }
  drawSprites();
  fill(255);
  textSize(20);
  stroke(0);
  strokeWeight(2);
  text("Score:  " + score, 650, 30);
}

function spawnMonsters() {
  if (frameCount % 200 === 0) {
    monster = createSprite(760, 300, 50, 50);
    monster.velocityX = -6;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        monster.addImage(monster1Img);
        break;
      case 2:
        monster.addImage(monster2Img);
        break;
      case 3:
        monster.addImage(monster3Img);
        break;
      default:
        break;
    }
    monster.scale = 0.4;
    monster.lifetime = 800;
    monsterGroup.add(monster);
    monster.debug = false;
    monster.setCollider("rectangle", 0, 0, 50, 100);
  }
}

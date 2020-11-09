var tower, tower_image;
var ghost, ghost_image;
var door, door_image, doorGroup;
var climber, climberImage, climberGroup;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var gameSound;

function preload() {
  tower_image = loadImage("tower.png");
  door_image = loadImage("door.png")
  climberImage = loadImage("climber.png");
  doorGroup = new Group();
  climberGroup = new Group();
  ghost_image = loadImage("ghost-standing.png");
  invisibleBlockGroup = new Group();
  
  gameSound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600)

  tower = createSprite(300, 300, 10, 10);
  tower.addImage(tower_image)
  tower.velocityY = 1;

  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage(ghost_image);
  ghost.scale = 0.3;
}

function draw() {
  
  if (gameState === "play") {
    gameSound.loop();
    if (tower.y > 400) {
      tower.y = 300;
    }
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      tower.destroy();
      ghost.destroy();
      gameState = "end";
    }
    spawn_door();
    drawSprites();
  }
  if (gameState === "end"){
        background("white");
        stroke = "yellow";
        fill("red");
        textSize(30);
        text("Game Over!", 250, 300);
      }
  

}


function spawn_door() {
  if (frameCount % 200 === 0) {
    door = createSprite(Math.round(random(120, 450)), -10, 10, 10);
    door.addImage(door_image);
    door.velocityY = 1;
    door.lifetime = 600;
    doorGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    climber = createSprite(door.x, 50, 10, 10);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climberGroup.add(climber);

    invisibleBlock = createSprite(climber.x, climber.y, climber.width, 2);
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
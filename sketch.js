var trex,trex_running;
var jump;
var die;
var score=0;
var PLAY=1;
var END=0;
var obsatclegroup,cloudgroup;
var gamestate=PLAY;
var cloud,cloudimage;
var ground,groundimage,invisibleGround;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameover,restart,trex_collided;
var game;
var restart1;
function preload(){
  
  trex_running=loadAnimation("trex1.png", "trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png")
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameover=loadImage("gameOver.png");
  restart=loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");

}

function setup(){
  createCanvas(600,200);
  
  // creating trex
trex=createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collide",trex_collided)
  trex.scale=0.5;

ground=createSprite(200,180,400,20);
ground.addImage("ground",groundimage)
ground.velocityX=-4;
ground.x=ground.width/2;
  //adding scale and position to trex
invisibleGround=createSprite(200,190,400,10);
invisibleGround.visible=false;

obstaclegroup=createGroup();
cloudgroup=createGroup();

trex.setCollider("circle",0,0,40);
trex.debug=false;
game=createSprite(200,100,30,20);
game.addImage("gameover",gameover);
game.scale=.5
restart1=createSprite(200,150,10,10)
restart1.addImage("restart",restart)
restart1.scale=.5
}


function draw(){
  //set background color 
  background("white");
  clouds();
  obsatcles();
  text("SCORE:"+score,500,50);
  //logging the y position of the trex
  if (gamestate===PLAY) {
    trex.changeAnimation("running",trex_running);
    score=score+Math.round(getFrameRate()/60);
    game.visible=false;
    restart1.visible=false;
    ground.velocityX=-4;
    if(ground.x<0)
    {
    ground.x=ground.width/2;
    }
  //jump when space key is pressed
      if(keyDown("UP_ARROW")&& trex.y>=100)
      {
        jump.play();
        trex.velocityY=-10;
      }
    trex.velocityY=trex.velocityY+.8;
    
    if (obstaclegroup.isTouching(trex)) {
      gamestate=END;
      die.play();
    }
}
else if (gamestate===END) {
  trex.changeAnimation("die",trex_collided);
  ground.velocityX=0;
  trex.velocityY=0;
  game.visible=true;
  restart1.visible=true;
  obstaclegroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
  obstaclegroup.setVelocityXEach(0);
  cloudgroup.setVelocityXEach(0);
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
}
 trex.collide(invisibleGround);
 if (mousePressedOver(restart1)) {
   reset();
 }
  drawSprites();
}
function clouds() {
  if(frameCount%60===0)
  {

  
  cloud=createSprite(600,100,40,10);
  cloud.addImage("clouds",cloudimage);
  cloud.y=Math.round(random(10,60));
  cloud.scale=.8;
  cloud.velocityX=-3;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=300
  cloudgroup.add(cloud);
  }
}
function obsatcles() {
  if (frameCount%60===0) {
    var obstacle=createSprite(400,165,10,40);
    obstacle.scale=.5;
    obstacle.velocityX=-6;
    var rand=Math.round(random(1,6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
        case 2:
         obstacle.addImage(obstacle2);
          break;
          case 3:
        obstacle.addImage(obstacle3);
        break;
        case 4:
        obstacle.addImage(obstacle4);
        break;
        case 5:
        obstacle.addImage(obstacle5);
        break;
        case 6:
        obstacle.addImage(obstacle6);
        break;
     
    }
    obstacle.lifetime=300;
    obstaclegroup.add(obstacle);
  }
}
function reset() {
  gamestate=PLAY;
  game.visible=false;
  restart1.visible=false;
  score=0;
}
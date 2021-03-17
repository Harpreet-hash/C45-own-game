var gameState="rest";
var score=0;

function preload() {
  crowImg=loadImage('crow.png');
  birdImg=loadImage('bird.png');
  back2Img=loadImage('back2.jpg');
  logImg=loadImage('unnamed.png');

}

function setup() {
  createCanvas(800,400);
  baby=createSprite(200,200,20,20);
  baby.addImage(birdImg)
  baby.scale=0.06
  baby.velocityY=0
  crowGroup=createGroup();
  logGroup=createGroup();
}

function draw() {
 
  background(back2Img);

  textSize(25)
  fill("purple")
  text("Birdy Boo!",347,32)

  if(gameState==="rest")
  {

    //text(mouseX+" "+mouseY,mouseX,mouseY)
    
    push()
    fill("magenta")
    text("Press space to fly!",569,95);
    pop();

    logGroup.setLifetimeEach(-1);    
    baby.velocityY=0

    if(keyDown("space")){
      baby.velocityY=-10
      logGroup.destroyEach();
      gameState="play"
    }
  }
  if(gameState==="play")
  {
    spawnCrows();
    spawnLogs();
  
    textSize(25)
    fill("purple")
    text("Look for logs to rest!",516,32)
    text("Score : " + score,26,37)
  
    if(keyDown("space")){
      baby.velocityY=-10      
    }

    if(frameCount%100===0){
     score+=10
    }

    if(baby.y>400){
      baby.y=100
      gameState="rest"
    }

    if(baby.isTouching(logGroup)){
      logGroup.setVelocityXEach(0)
      baby.velocityY=0
      score=0;
      gameState="rest"    
    }

    if(baby.isTouching(crowGroup)){
      text("Oopss!",430,118)
      logGroup.destroyEach();
      crowGroup.destroyEach();
      score=0;
      gameState="rest"
    
    } 
  
    baby.velocityY=baby.velocityY+0.8
  }
 
  drawSprites();

}
function spawnCrows(){
  if (frameCount%100===0){
    crow=createSprite(810,random(0,400),20,20)
    crow.addImage(crowImg)
    crow.scale=0.03
    crow.velocityX=-3;
    crow.lifetime=300;
    crowGroup.add(crow)
  }
}
function spawnLogs(){
  if (frameCount%200===0){
    log=createSprite(810,random(0,400),20,20)
    log.addImage(logImg)
    log.scale=0.2
    log.velocityX=-3;
    log.lifetime=300;
    logGroup.add(log)
  }
}
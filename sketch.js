var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground,invisibleground;



function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,500);
  

  
 FoodGroup=createGroup();
 obstacleGroup=createGroup();  
  
  
monkey=createSprite(50,400,20,60);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;  
  
ground=createSprite(300,450,600,10);
ground.shapeColor="black";
  

 // monkey.debug = true;
  
}


function draw() {
  background("lightblue");
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+score,225,50);

if(gameState === PLAY){
  
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
    
  }
  if(ground.x<300){
    ground.x=ground.width/2;
  }
  ground.velocityX=-6;
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }
  monkey.velocityY = monkey.velocityY + 0.8
 Food();
  Obstacle();
  
  
if(obstacleGroup.isTouching(monkey)){
  gameState=END;
   monkey.y = 400;
} 
   obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
      
  }
  else if(gameState === END){
    
    ground.velocityX=0;
    monkey.velocityY=0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
}
  
  
  
   monkey.collide(ground);
  drawSprites();

}
 

  
  
function Food(){
  if(frameCount%80===0){
  banana=createSprite(600,10,20,20);
  banana.addImage("banana",bananaImage);
  banana.velocityX=-(5+2 *score /100);
  banana.y=Math.round(random(120,200));
  banana.scale=0.1; 
  FoodGroup.setLifetimeEach(100);  
  FoodGroup.add(banana); 
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    
}
  
}
function Obstacle(){
  if(frameCount%300===0){
    obstacle = createSprite(600,410,50,70);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
    
  }
}


let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var rcs_left;
var rcs_right;

var meteorito;
var meteorito2
var p1,p2,p3,p4;
var meteorit0;
var meterit02;


var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 1000;

function preload()
{
  lander_img = loadImage("COHETE_normal.png");
  bg_img = loadImage("FONDO.png");
  meteorit0 = loadAnimation("METEORo1.png");
  meterit02 = loadAnimation("METEORo2.png");
  m1crash = loadAnimation("meteoro1fase1.png","meteoro1fase2.png","meteoro1fase3.png");

  m1crash.playing= true;
  m1crash.looping= false;
  //rcs_left.looping = false;
  //rcs_right.looping = false;
  

  //thrust.playing= true;
  //thrust.looping= false;
  //rcs_left.looping = false;
  //rcs_right.looping = false;
}

function setup() {
  createCanvas(1000,700);
  //frameRate(40);
  timer = 1500;
   
  meteorit0.frameDelay = 5; 

  /*thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;*/

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.07;
  lander.debug = true;
  lander.setCollider("Rectangle",135,190,1250,2250);

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  /*lander.addAnimation('thrusting',thrust);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',rcs_right);*/

  meteorito = createSprite(430,250,65,65);
  meteorito.setVelocity(0.25,0.25);
  meteorito.addAnimation("meteorito_normal",meteorit0);
  meteorito.addAnimation("meteorito_roto",m1crash);
  meteorito.changeAnimation("meteorito_normal");
  meteorito.scale = 0.015;
  meteorito.debug = true;

  meteorito2 = createSprite(700,260,65,65);
  meteorito2.setVelocity(-0.33,-0.33);
  meteorito2.addAnimation("mete2",meterit02);
  meteorito2.scale =0.019;

  p1 = createSprite(430,180,100,4);
  p1.visible = false;
  p2 = createSprite(430,325,100,4);
  p2.visible = false;
  p3 = createSprite(490,250,4,100);
  p3.visible = false;
  p4 = createSprite(365,250,4,100);
  p4.visible = false;

  p1v2 = createSprite(700,170,135,4);
  p1v2.visible = false;
  p2v2 = createSprite(700,365,135,4);
  p2v2.visible = false;
  p3v2 = createSprite(800,260,4,135);
  p3v2.visible = false;
  p4v2 = createSprite(595,260,4,135);
  p4v2.visible = false;

  ground = createSprite(500,690,1000,20);

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Velocidad horizontal: " +round(vx,2),800,50);
  text("Combustible: "+fuel,800,25);
  text("Velocidad vertical: "+round(vy),800,75);
  pop();

  // Ca??da
  vy +=g;
  lander.position.y+=vy;
  lander.position.x +=vx;

  if(lander.isTouching(meteorito) ==true){
    meteorito.changeAnimation("meteorito_roto");
    stop();
  }

  meteorito.bounceOff(p1);
  meteorito.bounceOff(p2);
  meteorito.bounceOff(p3);
  meteorito.bounceOff(p4);
  
  meteorito2.bounceOff(p1v2);
  meteorito2.bounceOff(p2v2);
  meteorito2.bounceOff(p3v2);
  meteorito2.bounceOff(p4v2);

  

  drawSprites();
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    //lander.changeAnimation('thrusting');
    //thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    //lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    //lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}

function stop(){

  vx = 0;
  vy = 0;
  meteorito.velocityX = 0;
  meteorito.velocityY = 0;

}
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var bk_sound;
var cut_sound, eat_sound, air_sound, sad_sound;
var balloon;
var balloonButton;
var muteButton;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

  bk_sound = loadSound("sound1.mp3");
  cut_sound= loadSound("rope_cut.mp3");
  eat_sound= loadSound("eating_sound.mp3");
  air_sound= loadSound("air.wav");
  sad_sound= loadSound("sad.wav");

}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  bk_sound.play();
  bk_sound.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  balloonButton= createImg('blower.png');
  balloonButton.position(10,250);
  balloonButton.size(150,100);
  balloonButton.mouseClicked(airblow);

  muteButton= createImg('mute.png');
  muteButton.position(450,20);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);


  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(320,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eat_sound.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     sad_sound.play()
   }

   drawSprites();
}

function drop()
{
  cut_sound.play()
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow()
{
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x: 0.01, y:0});
  air_sound.play()
}

function mute(){
  if(bk_sound.isPlaying())
  {
    bk_sound.stop()
  }
   else{
    bk_sound.play()
   }
}

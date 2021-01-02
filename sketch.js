var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload() {
  dogy1 = loadImage("dog1.png");
  dogy2 = loadImage("dog2.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250, 20, 20)
  dog.addImage(dogy1);
  dog.scale = 0.2

  foodStock = database.ref('food')
  foodStock.on("value", readStock)

}


function draw() {
  background(46, 139, 87)




  drawSprites();
  textSize(20)
  stroke(255)
  fill(255)
  text("FOOD : "+foodStock,180,150)
  
}
function readStock(data) {
  foodStock = data.val();
}
function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else {
    x = x - 1
  }
  database.ref('/').update({
    food: x
  })
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    writeStock(foodStock);
    dog.addImage(dogy2)
  }
}
function keyReleased() {
  if (keyCode === UP_ARROW) {
    dog.addImage(dogy1)
  }
}


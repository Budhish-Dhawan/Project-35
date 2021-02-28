var balloon, database, balloonImage2, balloonImage1;
var position;
var bg;

function preload(){
    bg = loadImage("pro-C35+images/Hot Air Ballon-01.png");
    balloonImage2 = loadAnimation("pro-C35+images/Hot Air Ballon-02.png", "pro-C35+images/Hot Air Ballon-03.png", "pro-C35+images/Hot Air Ballon-04.png")
    balloonImage1 = loadAnimation("pro-C35+images/Hot Air Ballon-02.png");
}

function setup(){
    database = firebase.database();

    createCanvas(1500, 700);

    balloon = createSprite(250,650,10,10);
    balloon.addAnimation("hotAirBalloon", balloonImage1);
    
    balloon.scale = 0.5;

    var balloonPosition = database.ref('balloon/position');
    
    balloonPosition.on("value", readPosition, showError);
}

function draw(){
    background(bg);
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
            balloon.addAnimation("hotAirBalloon", balloonImage2);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
            balloon.addAnimation("hotAirBalloon", balloonImage2);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
            balloon.addAnimation("hotAirBalloon", balloonImage2);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
            balloon.addAnimation("hotAirBalloon", balloonImage2);
        }
        drawSprites();

    }
   
}

function writePosition(x,y){
    database.ref("balloon/position").set({
        x:position.x + x,
        y:position.y + y
    })
}


function readPosition(data){
    position = data.val();
   
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
    console.log("Error in writing to the database");
}
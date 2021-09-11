var ball;

var database, position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();

    var ballPosition = database.ref('square/position')
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position!==undefined)
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('square/position').set({
        x:position.x+x,
        y:position.y+y
    })
}

function readPosition(data){
    position = data.val();
    ball.x = position.x
    ball.y = position.y
}

function showError(){
    console.log("this is how database error looks")
}
//.ref - is used to refer to a particular property in database.
//.on - it is a listener, it is used to listen to changes in the referred property of database.
//.set - is used to set values in the referred property

// if there is a change, the function after ' "value" , ' is executed
//sdk - software development kit, it links code with the database
//database can be used for both - read/write
//database is written in json format
//arguments are passed inside() of functions
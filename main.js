status1 = ""
img = ""
objects = [];


function preload() {
    img = loadImage("garden.jpeg")
}

function setup(){
    canvas = createCanvas(640,420)
    canvas.center()
    objectdetector = ml5.objectDetector('cocossd', modelloaded)
    document.getElementById("status1").innerHTML = "status:detecting objects";
}

function draw() {
    image(img,0,0,640,420)
    /*fill("red")
    text("dog",85,75)
    noFill()
    stroke("blue") 
    rect(30,60,450,350)

    fill("Red")
    text("cat", 350, 100)
    noFill()
    stroke("black")
    rect(300,80,275,300)*/
    if(status1 != ""){
        document.getElementById("status1").innerHTML = "status: object detected"
        for(i=0; i<objects.length; i++){
            fill("plum");
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill();
            stroke("plum")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function modelloaded() {
    console.log("cocossd model has been loaded correctly")
    status1 = true
    objectdetector.detect(img,gotresults)
}

function gotresults(error, results) {
    if(error) {
        console.log(error)
    }
    else{
        console.log(results);
        objects = results;
    }
}
objects = [];
Status = "";
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
  }

  function start() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting objects"
    objects_name = document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("Model is loaded");
   Status = "true";
   
}

function draw() {
    image(video , 0 , 0 , 480 , 380);
    if( Status != "") {
objectDetector.detect(video , gotResults);
for(i = 0; i< objects.length; i++ ) {
    document.getElementById("status").innerHTML = "Status : Objects Detected"
   
    fill("#fc2e23");
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y );
    noFill();
    stroke("#fc2e23");
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    if(objects[i].label== objects_name) {
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById(objects_status).innerHTML = object_name + "Found";
        synth= widow.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(object_name + "Found");
        synth.speak(utterThis);
    }
    else {
        document.getElementById(object_status).innerHTML = object_name + "not found";
    }
}
    }
    
}
  
    
function gotResults(error , results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
    }
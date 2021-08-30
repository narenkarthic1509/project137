objects = [];
status = "";

function setup(){
    canvas = createCanvas(600,400);
    canvas.position(450,250);
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();
}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects = results;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("user_input").value;
    console.log(object_name);
}

function modelLoaded(){
    console.log("model is loaded!");
    status = true;
}

//new code i refered from both the wrong and the reference one - 

function draw(){
    image(video,0,0,600,400);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i=0;i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : object detected";
            percent = floor(objects[i].confidence * 100);
            labal = objects[i].label;
            total = labal + " " + percent + "%";
            object_x = objects[i].x + 15;
            object_y = objects[i].y - 15;
            object_height = objects[i].height;
            object_width = objects[i].width;
            fill("#FF9000");
            noFill();
            stroke("#FF9000");
            text(total,object_x,object_y);
            rect(object_x - 15, object_y + 15, object_width, object_height);

            if(labal == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = object_name + " : found";
                synth = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("object_found").innerHTML = object_name + " : not found"
            }
        }
    }
}




//reference code :

/*function draw(){
    image(video, 0, 0, 380, 380); 
    if(status != "") { 
        objectDetector.detect(video, gotResult); 
        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
            noFill(); stroke("#FF0000"); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name){ 
                video.stop(); 
                objectDetector.detect(gotResult); 
                document.getElementById("object_found").innerHTML = object_name + " Found"; 
                synth = window.speechSynthesis; 
                utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
                synth.speak(utterThis); 
            }
            else{ 
                document.getElementById("object_found").innerHTML = object_name + " Not Found";
             } 
        } 
    }
}*/ 



//code that i first did and doesnt work : 

/*function draw(){
    image(video,0,0,600,400);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i <= objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            percentage = floor(objects[i].confidence * 100);
            lbl = objects[i].label;
            total = lbl + percentage + "%";
            object_x = objects[i].x;
            object_y = objects[i].y;
            object_height = objects[i].height;
            object_width = objects[i].width;
            fill("#FF9000");
            stroke("#FF9000");
            noFill();
            rect(object_x,object_y,object_width,object_height);
            text(object_x + 20 , object_y - 20 , total);
        

        if(objects[i].label == input_value){
            video.stop();
            objectDetection.detect(gotResult);
            document.getElementById("object_found").innerHTML = input_value + " found";
        }
        }
    }
}*/
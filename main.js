status_1 = "" ;
name_1 = "";
objects = [];

function setup()
{
    canvas = createCanvas(400,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects" ;
    name_1 = document.getElementById("name").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status_1 = true ;
}

function draw()
{
    image(video,0,0,400,300);

    
   if(status_1 != "")
   {
      objectDetector.detect(video,gotresults);

       for(i = 0;i < objects.length;i++)
       {
          fill("#eb3434");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
          noFill();
          stroke("#eb3434");
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    if(objects[i].label == name_1)
    {
        video.stop();
        objectDetector.detect(gotresults);
        document.getElementById("status").innerHTML = "Object "+name_1+" found";
        var synth = window.speechSynthesis ;
        speak_data_1 = "object "+name_1+" found" ;
        var utter = new SpeechSynthesisUtterance (speak_data_1) ;
        synth.speak(utter);
    }
    else if(objects[i].label != name_1)
    {
        document.getElementById("status").innerHTML = "Object "+name_1+" not found";
        var synth = window.speechSynthesis ;
        speak_data_1 = "object "+name_1+" not found" ;
        var utter = new SpeechSynthesisUtterance (speak_data_1) ;
        synth.speak(utter);
    }
       }
   }
}

function gotresults(error,results)
{
   if(error)
   {
     console.error(error);
   }
   else
   {
       console.log(results);
       objects = results;
   }

}

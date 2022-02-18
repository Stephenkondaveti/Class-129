song = "";
leftWristX =0;
leftWristY =0;
rightWristX=0;
rightWristY=0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(500,600);
    canvas.center();

    video = createCapture(VIDEO);
    

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on(video,gotPoses);
    video.hide;
}

function modelLoaded() {
    console.log("poseet is initalized");
}

function gotPoses(results){

if (gotPoses.length > 0)
console.log(results);
scoreLeftWrist = results[0].pose.keyoints[9].score;
console.log("scoreLeftWrist = " + scoreLeftWrist);

leftWristX=results[0].pose.leftWrist.X;
leftWristY=results[0].pose.leftWrist.Y;
console.log("Left wrist x ="+leftWristX+"Left wrist y ="+leftWristY);

rightWristX=results[0].pose.rightWrist.X;
rightWristY=results[0].pose.rightWrist.Y;
console.log("Right wrist x ="+rightWristX+"Right wrist y ="+rightWristY);
}

function draw() {
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000;
    volume = leftWristY_divide_1000 *2 ;
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " +volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
Song1 = "";
Song2 = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";
song_song1 = "";
song_song2 = "";

function preload() {
    Song1 = loadSound("Music.mp3");
    Song2 = loadSound("Music2.mp3");
}

function setup() {
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function draw() {
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_song1 = Song1.isPlaying();
    console.log(song_song1);

    song_song2 = Song2.isPlaying();
    console.log(song_song2);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Song2.stop();
        if(song_song1 == false ){
            Song1.play();
        }
        else{
            console.log("Song Name : Peter Pan Song");
            document.getElementById("h").innerHTML= "Song Name: Peter Pan Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Song1.stop();
        if(song_song2 == false ){
            Song2.play();
        }
        else{
            console.log("Song Name : Harry Potter Theme Song");
            document.getElementById("h").innerHTML= "Song Name:Harry Potter Theme Song";
        }
}

function modelLoaded(){
    console.log("poseNet is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
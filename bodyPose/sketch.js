let bodyPose;
let video;
let poses = [];
let connections;
let painting;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function mousePressed() {
  console.log(poses);
}

function setup() {
  createCanvas(640, 480);
  // creamos una capa para gráficos
  painting = createGraphics(640, 480);
  painting.clear();
    // Create the video and hide it
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    // Start detecting poses in the webcam video
    bodyPose.detectStart(video, gotPoses);
    // Get the skeleton connection information
    connections = bodyPose.getSkeleton();
  }

  // Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}

function draw() {
  // estos son los cuadros que queremos interactivos
  painting.noStroke();
  painting.fill(255, 0, 0, 0.5);
  painting.rect(width/2, 0, width/2, height/2);
  // cuadro
  painting.fill(0, 0, 255, 0.5);
  painting.rect(0, 0, width/2, height/2);
  //fill(0, 255, 255, 0.5);
  //rect(0, 0, width, height);

  // Mostrar el video. si lo comentamos se hace una retroalimentación
  image(video, 0, 0, width, height);

    // Dibujar  las conexiones del esqueleto, lo comentamos para no verlo
    /*for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
      for (let j = 0; j < connections.length; j++) {
        let pointAIndex = connections[j][0];
        let pointBIndex = connections[j][1];
        let pointA = pose.keypoints[pointAIndex];
        let pointB = pose.keypoints[pointBIndex];
              // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }*/

    // Iterar através de todas las poses
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
          // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      //let keypoint = pose.keypoints[j];
      let index = pose.keypoints[9];
            // Only draw a circle if the keypoint's confidence is greater than 0.1
            /*if (keypoint.confidence > 0.1) {
              fill(0, 255, 0);
              noStroke();
              circle(keypoint.x, keypoint.y, 10);
            }*/
            if (index.confidence > 0.1) {
              fill(0, 255, 0);
              noStroke();
              circle(index.x, index.y, 10);
            }
            if(index.x > width/2 && index.y < height/2){
              fill(255, 255, 0);
              rect(width/2, (height/2)-130, 130, 130);
            }
          }
        }
        // aquí colocamos nuestra capa para dibujar hecha con createGraphics
       image(painting, 0, 0); 
      }

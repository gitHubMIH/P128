som="";
pulsoEsquerdoX=0;
pulsoEsquerdoY=0;
pulsoDireitoX=0;
pulsoDireitoY=0;
pontuacaoPulsoEsquerdo=0;
pontuacaoPulsoDireito=0;
function preload() {
   som=loadSound("music.mp3");
}
function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function gotPoses(results) {
console.log(results);
if(results.length>0){
    console.log(results);
    pontuacaoPulsoEsquerdo=results[0].pose.keypoints[9].score;
    console.log(pontuacaoPulsoEsquerdo);
    pulsoDireitoX=results[0].pose.rightWrist.x;
    pulsoDireitoY=results[0].pose.rightWrist.y;
    pulsoEsquerdoX=results[0].pose.leftWrist.x;
    pulsoEsquerdoY=results[0].pose.leftWrist.y;
    console.log("Pulso direito x ="+pulsoDireitoX);
    console.log("Pulso direito Y ="+pulsoDireitoY);
    console.log("Pulso esquerdo x ="+pulsoEsquerdoX);
    console.log("Pulso esquerdo y ="+pulsoEsquerdoY);
    pontuacaoPulsoDireito=results[0].pose.keypoints[10].score;
    console.log(pontuacaoPulsoDireito);
}
}

function modelLoaded() {
 console.log("o modelo foi inicializado");   
}
function draw() {
   image (video, 0, 0, 600, 500);
   fill("#90ee90");
   stroke("#90ee90");
   if (pontuacaoPulsoDireito>0.2){
   circle(pulsoDireitoX, pulsoDireitoY, 20);
   if (pulsoDireitoY>0&&pulsoDireitoY<=100)
   {
    document.getElementById("divSpeed").innerHTML="Velocidade =0.5x";
    som.rate(0.5);
   }
   else if(pulsoDireitoY>100&&pulsoDireitoY<=200)
   {
    document.getElementById("divSpeed").innerHTML="Velocidade =1x";
    som.rate(1);
   }
   else if(pulsoDireitoY>200&&pulsoDireitoY<=300)
   {
    document.getElementById("divSpeed").innerHTML="Velocidade =1.5x";
    som.rate(1.5);
   }
   else if(pulsoDireitoY>300&&pulsoDireitoY<=400)
   {
    document.getElementById("divSpeed").innerHTML="Velocidade =2x";
    som.rate(2);
   }
   else if(pulsoDireitoY>400)
   {
    document.getElementById("divSpeed").innerHTML="Velocidade =2.5x";
    som.rate(2.5);
   }
}
   if(pontuacaoPulsoEsquerdo>0.2)
   {  
   circle(pulsoEsquerdoX,pulsoEsquerdoY, 20);
   numeroPulso=Number(pulsoEsquerdoY);
   remove=floor(numeroPulso);
   volume=remove/500;
   document.getElementById("volume").innerHTML="volume ="+volume;
   som.setVolume(volume);   
   
}
}
function play() {
    som.play();
    som.setVolume(1);
    som.rate(1);
}
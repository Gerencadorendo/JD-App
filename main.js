musica = ""
pulsoEsqx = 0
pulsoEsqy = 0
pulsoDirx = 0
pulsoDiry = 0
function preload() {
    musica = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(800, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}
function draw() {
    image(video, 0, 0, 800, 500)
    fill("red")
    circle(pulsoEsqx, pulsoEsqy, 20)
    circle(pulsoDirx, pulsoDiry, 20)
    n = floor(Number(pulsoEsqy))
    volume = n / 500;
    document.getElementById("volume").innerHTML = "Volume: " + volume
    musica.setVolume(volume)

        if (pulsoDiry > 0 && pulsoDiry <= 100) {
            document.getElementById("speed").innerHTML = "Velocidade: 0.5x";
            musica.rate(0.5)
        }
        if (pulsoDiry > 100 && pulsoDiry <= 200) {
            document.getElementById("speed").innerHTML = "Velocidade: 1x";
            musica.rate(1)
        }
        if (pulsoDiry > 200 && pulsoDiry <= 300) {
            document.getElementById("speed").innerHTML = "Velocidade: 1.5x";
            musica.rate(1.5)
        }
        if (pulsoDiry > 300 && pulsoDiry <= 400) {
            document.getElementById("speed").innerHTML = "Velocidade: 2x";
            musica.rate(2)
        }
        if (pulsoDiry > 400 && pulsoDiry <= 500) {
            document.getElementById("speed").innerHTML = "Velocidade: 2.5x";
            musica.rate(2.5)
        }
}
function play() {
    musica.play()
}
function modelLoaded() {
    console.log("funcionou")
}
function gotPoses(results) {
    if (results.length > 0) {
        pulsoEsqx = results[0].pose.leftWrist.x;
        pulsoEsqy = results[0].pose.leftWrist.y;
        pulsoDirx = results[0].pose.rightWrist.x;
        pulsoDiry = results[0].pose.rightWrist.y;
    }
}
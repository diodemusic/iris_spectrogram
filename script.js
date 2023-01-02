function preload(){
  song = loadSound("Knives Out.mp3");

  playing = false
  song.onended(() => {playing = false; document.getElementById("audio").innerText = "▶"; a = 0})
  fr = 60
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  layer = createGraphics(width, height)
  
  fft = new p5.FFT(0, 256);
  
  totalFrames = song.duration() * fr
  a = 360 / totalFrames * 0.78
  b = a
  
  frameRate(fr)
}

function draw() {

  if (playing) {
    if (a > 360) {  // Stop spinning if a exceeds 360
      playing = false;
    }
  }

  background(18, 18, 18);
    
  layer.noFill()
  layer.colorMode(RGB)

  noStroke();
  //fill("white");
  //ellipse(width/2, height/2, width, height)
  fill(207, 132, 106);
  circle(500, 500, 100);
  circle(1350, 500, 100); // papilla
  fill(248, 245, 250)
  circle(width/2, height/2, 452 * 1.8); // sclera
  fill(2, 2, 2)
  circle(width/2, height/2, 232 * 1.8); // iris + pupil

  
  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  spectrumB.splice(0, 47)
  
  push()
  translate(-100, -100)
  noFill()
  stroke("black")
  
  beginShape()
    
    for(let i = 0; i < spectrumB.length; i++){
      var amp = spectrumB[i]
      var x = map(amp, 0, 256, -2, 2)
      var y = map(i, 0, spectrumB.length, 30, 215)
      
      vertex(x, y)
    }
  endShape()
  
  pop()
  
  
  push()
    
    translate(width/2, height/2)
    rotate(radians(a))
  
    layer.push()
    layer.translate(width/2, height/2)
    layer.rotate(radians(-a))
    
    for(let i = 0; i < spectrumB.length; i++){
    
    layer.strokeWeight(0.018 * spectrumB[i])
    layer.stroke(fft.getEnergy("bass") - spectrumB[i], 0, 255, spectrumB[i] / 150)
    //layer.stroke(0, fft.getEnergy("treble"), fft.getEnergy("bass"), spectrumB[i] / 40)
    layer.line(0, i, 0, i)
    }
  
    layer.pop()
    
    image(layer, -width/2, -height/2)
  pop()

  if (playing) a += b

  noFill();
  strokeWeight(240);
  stroke(18, 18, 18);
  line(420, 120, 1220, 120)
  translate(width/2, height/2);
  beginShape();
  vertex(-690,0);
  bezierVertex(-30,-300,30,-300,690,0);
  bezierVertex(30,440,-30,440,-690,0);
  endShape();
  strokeWeight(1);
  translate(-width/2, -height/2); // outer eye

  let blinking = false;

  

  fill(2, 2, 2)
  noStroke();
  circle(width/2, height/2, 117 * 1.6) // pupil
  
}

function toggleAudio(){
  if(!playing){
    song.play()
    console.log("playing")
    document.getElementById("audio").innerText = "||"   
  }
  else{
    song.pause()
    console.log("pasued")
    document.getElementById("audio").innerText = "▶"
  }
  
  playing = !playing
}

function preload(){
  //song = loadSound("Radiohead - Jigsaw Falling Into Place.mp3")
  song = loadSound("i want 100 of your time.mp3")
  playing = false
  song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play"; a = 0})
  fr = 60
}

function setup() {
  createCanvas(1250, 600);
  layer = createGraphics(width, height)
  
  fft = new p5.FFT(0, 256);
  
  totalFrames = song.duration() * fr
  // a = 360 / totalFrames * 0.78
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

  background("black");
  
    
  layer.noFill()
  layer.colorMode(RGB)

  noStroke();
  fill("white")
  ellipse(width/2, height/2, width, height)
  fill("black");
  circle(width/2, height/2, 511)

  
  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  spectrumB.splice(0, -0)
  
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
    layer.stroke(50, fft.getEnergy("treble"), fft.getEnergy("bass"), spectrumB[i] / 10)
    layer.line(0, i, 0, i)
    }
  
    layer.pop()
    
    image(layer, -width/2, -height/2)
  pop()
  
  if (playing) a += b
  
}

function toggleAudio(){
  if(!playing){
    song.play()
    console.log("playing")
    document.getElementById("audio").innerText = "Pause"   
  }
  else{
    song.pause()
    console.log("pasued")
    document.getElementById("audio").innerText = "Play"
  }
  
  playing = !playing
}

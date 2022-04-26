let colorArray = ["#025159", "#F25C05", "#F2C0A2", "#F20505", "#A60D0D"];

let s = [];

let numObjects = 6;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  // instantiating the objects 

  for (let i = 0; i < numObjects; i++) {
    let x = map(i, 0, numObjects, 50, width - 50);
    s[i] = new Squirly(x, 0);
  }
}

function draw() {
  // added a blend mode for smoother blending, less moire pattern artifacts
  blendMode(MULTIPLY)
  
  // SHOW IT !!!!!
  for (let i = 0; i < numObjects; i++) {
    s[i].show();
  }


}

//   push();
//   translate(width/2, 0 + yInc);

//   rotate(radians(sin(xOff) * 180));
//   line(0,0,0,100);
//   noFill()
//   rect(0,0,100,100)
//   pop();

//   yInc+= 1;
//   xOff+= 0.01;

class Squirly {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.length = random(200, 400);
    this.color = color(random(colorArray));
    this.sw = random(0.3, 4);
    this.speed = random(0.7, 1.5); // used to increment our Y
    this.rot = random(360);
    this.rotInc = 0;
    this.offset = 0;
    this.offsetSpeed = random(0.001, 0.005);

    this.alpha = 0;
    
    // start with no alpha
    this.color.setAlpha(0);
  }

  show() {
    push();
    translate(this.x, this.y);

    this.rotInc = sin(this.offset) * 360;

    rotate(radians(this.rot + this.rotInc));

    strokeWeight(this.sw);

    stroke(this.color);

    this.alpha = map(noise(this.offset), 0, 1, 20, 150);

    this.color.setAlpha(this.alpha);

    line(0, 0, 0, this.length);

    pop();

    this.y += this.speed;
    this.offset += this.offsetSpeed;
  }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setup()
    draw()
}
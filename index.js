const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let respWidth = innerWidth;
let respHight = innerHeight;


canvas.width = respWidth;
canvas.height = respHight;

//responsive fenetre
window.addEventListener('resize', function(event) {
    respWidth = innerWidth;
    respHight = innerHeight;
    canvas.width = respWidth
    canvas.height = respHight;
    maxColumns = respWidth / fontSize;
    console.log(respWidth, respHight)
}, true);
//characteres tombants
let charArr = [
  "1",
  "0",
  "ⵣ",
];

let maxCharCount = 20;
let fallingCharArr = [];
let fontSize = 20;
let maxColumns = respWidth / fontSize;


let frames = 0;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    this.value =
      charArr[Math.floor(Math.random() * (charArr.length - 1))];
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    ctx.fillStyle = "rgba(0,255,0)";
    ctx.font = fontSize + "px sans-serif";
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > respHight) {
      this.y = (Math.random() * respHight);
      this.x = Math.floor(Math.random() * respWidth);
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}

let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(Math.floor(Math.random() * maxColumns) * fontSize,(Math.random() * respHight) / 2 - 50);
      fallingCharArr.push(fallingChar);
  }
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, respWidth, respHight);
  for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
   if (respWidth < 770) {
    while (maxCharCount < 60) {
      maxCharCount *= 1.1;
    }
  }
  else {
    while (maxCharCount < 120) {
      maxCharCount *= 1.1;
    }
  }
};

update();

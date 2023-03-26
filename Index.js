const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 1.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 50;
    this.height = 50;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Text {
  constructor() {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.text = "You won";
  }
  draw() {
    c.font = "bold 48px sans-serif";
    c.fillStyle = "red";
    c.fillText(this.text, this.position.x, this.position.y);
  }
}
const text = new Text();
const player = new Player();
// const platform = new Platform();
const platforms = [];

for (let i = 0; i < 10; i++) {
  const x = Math.floor(Math.random() * canvas.width - 200); // generate random x position
  const y = Math.floor(Math.random() * canvas.height - 20); // generate random y position
  const platform = new Platform({ x, y }); // create new Platform object with randomized position
  platforms.push(platform); // add new Platform object to array
}
const keys = {
  Left: {
    pressed: false,
  },
  Right: {
    pressed: false,
  },
};
let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();

  platforms.forEach((platform) => platform.draw());
  if (keys.Right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.Left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.Right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => (platform.position.x -= 5));
    } else if (keys.Left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => (platform.position.x += 5));
    }
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  if (scrollOffset > 500) {
    text.draw();
  }
}

animate();

addEventListener("keydown", ({ keyCode }) => {
  //   console.log(keyCode);
  switch (keyCode) {
    case 39:
      console.log("Right");
      keys.Right.pressed = true;
      break;
    case 37:
      console.log("Left");
      keys.Left.pressed = true;

      break;
    case 40:
      console.log("Down");
      break;
    case 38:
      console.log("Up");
      player.velocity.y -= 10;
      break;

    default:
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  //   console.log(keyCode);
  switch (keyCode) {
    case 39:
      console.log("Right");
      keys.Right.pressed = false;

      break;
    case 37:
      console.log("Left");
      keys.Left.pressed = false;

      break;
    case 40:
      console.log("Down");
      break;
    case 38:
      console.log("Up");
      player.velocity.y -= 10;
      break;

    default:
      break;
  }
});

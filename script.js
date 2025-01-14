const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// game state
const player = { x: 100, y: 100, width: 50, height: 50, speed: 5 };

// input game avatar
const avatar = new Image();
avatar.src = './images/mainSprite.png';

// handle user input
const keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update player position
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;

  // draw player
  ctx.drawImage(avatar, player.x, player.y, 40, 50);

  requestAnimationFrame(gameLoop); // Continue the loop
}

// Start the game loop
avatar.onload = () =>{
gameLoop();
};

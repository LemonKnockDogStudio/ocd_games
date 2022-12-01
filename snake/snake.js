import { getInputDirection } from "./input.js";


export const SNAKE_SPEED = 10;  // X times per second
const snakeBody = [
  {x: 11, y: 11}
];
let newSegments = 0;

export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  // start from length - 2, last one just disappear, do not need move
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i+1] = {...snakeBody[i]};
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumn = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
  console.log("draw snake");
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, {ignoreHead=false}={}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  })
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeInterSection() {
  return onSnake(snakeBody[0], {ignoreHead:true});
}

function equalPositions(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({...snakeBody[snakeBody.length-1]});
  }
  newSegments = 0;
}

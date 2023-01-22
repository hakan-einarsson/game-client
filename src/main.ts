import './style.css'

import Game from './Game'
import DynamicGameObject from './DynamicGameObject';
import Spritesheet from './Spritesheet';
import { GameConfig } from './GameConfig';

//load image from path
const playerImage = new Image();
playerImage.src = './src/assets/mecha.png';
playerImage.onload = () => {
  const game = new Game(new GameConfig());
  
  playerImage.style.imageRendering= 'pixelated';
  playerImage.style.imageRendering= 'crisp-edges';
  playerImage.style.imageRendering= '-moz-crisp-edges';
  playerImage.style.imageRendering= '-webkit-crish-edges';
  playerImage.style.imageRendering= 'optimizeSpeed';

  const animations = {
    'idle': {name: 'idle', startFrame: 0, length:3, frameRate: 10},
    'walk': {name: 'walk', startFrame: 4, length:5, frameRate: 16},
  }
  const spritesheet = new Spritesheet(playerImage, 16, 1, animations);

  const player = new DynamicGameObject(0, 0, 16, 22, spritesheet, 100, 100);

  player.setToPlayer();
  game.addPlayer(player);
  game.run(0);
}



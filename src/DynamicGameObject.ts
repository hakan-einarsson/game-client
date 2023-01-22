import GameObject from './GameObject.js';
import KeyboardController from './KeyboardController.js';
import Spritesheet from './Spritesheet.js';

export default class DynamicGameObject extends GameObject {
    isPlayer: boolean;
    speed: number;
    maxSpeed: number;
    velocity: { x: number; y: number; };
    keyboardController: KeyboardController | null;

    constructor(x:number, y:number, width:number, height:number, spritesheet:Spritesheet, speed:number, maxSpeed:number, config:object = {}) {
        super(x, y, width, height, spritesheet, config);
        this.isPlayer = false;
        this.speed = speed;
        this.maxSpeed = maxSpeed;
        this.velocity = { x: 0, y: 0 };
        this.keyboardController = null
    }

    setToPlayer() {
        this.isPlayer = true;
        this.keyboardController = new KeyboardController();
    }

    update(deltaTime:number){
        if(this.keyboardController && this.isPlayer){
            this.keyboardController.checkInput(this, deltaTime);
            this.setAnimation();
        }
    }

    setAnimation(){
        if(this.spritesheet){
            if(this.velocity.x === 0 && this.velocity.y === 0){
                this.spritesheet?.getCurrentAnimation().name !== 'idle' && this.spritesheet.setCurrentAnimation('idle');
                return;
            }
            if(this.velocity.x > 0){
                this.spritesheet?.getCurrentAnimation().name !== 'walk' && this.spritesheet.setCurrentAnimation('walk');
                if(this.spritesheet.flippedHorizontally){
                    this.flipHorizontally();
                }
                return;
            }
            if(this.velocity.x < 0){
                this.spritesheet?.getCurrentAnimation().name !== 'walk' && this.spritesheet.setCurrentAnimation('walk');
                if(!this.spritesheet.flippedHorizontally){
                    this.flipHorizontally();
                }
                return;
            }
            if(this.velocity.y !== 0){
                this.spritesheet?.getCurrentAnimation().name !== 'walk' && this.spritesheet.setCurrentAnimation('walk');
                return;
            }
        }
    }
}
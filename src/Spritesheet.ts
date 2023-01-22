import { Animation, Sprite } from './interfaces';

export default class Spritesheet {
    image: HTMLImageElement;
    columns: number;
    rows: number;
    animations: { [key: string]: Animation; };
    currentAnimation: Animation | null;
    currentFrame: number;
    sprites: Sprite[];
    accumuluatedTimeBetweenFrames: number;
    flippedHorizontally: boolean;
    
    constructor(image:HTMLImageElement, columns:number, rows:number, animations : { [key: string]: Animation }) {
        this.image = image;
        this.columns = columns;
        this.rows = rows;
        this.animations = animations;
        this.currentAnimation = null;
        this.currentFrame = 0;
        this.sprites = [];
        this.accumuluatedTimeBetweenFrames = 0;
        this.flippedHorizontally = true;
        this.setUpSprites();
        this.setCurrentAnimation('idle');
    }

    setUpSprites() {
        const spriteWidth = this.image.width / this.columns;
        const spriteHeight = this.image.height / this.rows;

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                this.sprites.push({ x: x * spriteWidth, y: y * spriteHeight, width: spriteWidth, height: spriteHeight });
            }
        }
    }

    setCurrentAnimation(animationName: string) {
        this.currentAnimation = this.animations[animationName];
        this.currentFrame = this.currentAnimation.startFrame;
        this.accumuluatedTimeBetweenFrames = 0;
    }

    getCurrentAnimation(): Animation {
        if(!this.currentAnimation) throw new Error('No animation is currently set');
        //return key of the current animation
        return this.currentAnimation;
    }

    updateCurrentFrame(deltaTime: number) {
        // Calculate the time needed for one frame at the current frame rate
        if(!this.currentAnimation) throw new Error('No animation is currently set');
        const timePerFrame = 1000 / this.currentAnimation.frameRate;
        this.accumuluatedTimeBetweenFrames += deltaTime;

        // Increment the current frame if deltaTime is greater than or equal to the time needed for one frame at the current frame rate
        if (this.accumuluatedTimeBetweenFrames >= timePerFrame) {
            this.currentFrame++;
            this.accumuluatedTimeBetweenFrames = 0;
        }

        // Loop back to the start of the animation if the end has been reached
        if (this.currentFrame >= this.currentAnimation.startFrame + this.currentAnimation.length) {
            this.currentFrame = this.currentAnimation.startFrame;
        }

    }

    getCurrentSprite(): Sprite {
        const { x, y, width, height } = this.sprites[this.currentFrame];
        return { x, y, width, height };
    }
}

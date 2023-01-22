import { RenderProperties } from "./interfaces";
import Spritesheet from "./Spritesheet";


export default abstract class GameObject {

    x: number;
    y: number;
    width: number;
    height: number;
    config: Object;
    spritesheet: Spritesheet | null;

    constructor(x:number, y:number, width:number, height:number, spritesheet:Spritesheet | null, config:Object = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.config = config;
        this.spritesheet = spritesheet;
    }

    getRenderProperties() :RenderProperties {
        return {
            x: Math.floor(this.x),
            y: Math.floor(this.y),
            width: this.width,
            height: this.height,
            spritesheet: this.spritesheet
        };
    }

    flipHorizontally(){
        if(this.spritesheet){
            this.spritesheet.flippedHorizontally = !this.spritesheet.flippedHorizontally;
        }
    }
}
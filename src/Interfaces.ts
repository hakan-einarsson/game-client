import Spritesheet from "./Spritesheet";

export interface Animation {
    name: string;
    startFrame: number;
    length: number;
    frameRate: number;
}

export interface Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface RenderProperties {
    x: number;
    y: number;
    width: number;
    height: number;
    spritesheet: Spritesheet | null;
}
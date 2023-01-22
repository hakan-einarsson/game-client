import GameObject from './GameObject.js';

export default class StaticGameObject extends GameObject {
    constructor(x:number, y:number, width:number, height:number, config:object = {}) {
        super(x, y, width, height, null, config);
    }
}
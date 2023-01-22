export class GameConfig
{
    height: number;
    constructor(
        public fpsCounter: boolean = true,
        public width: number = 256){
            this.fpsCounter = fpsCounter;
            this.width = width;
            this.height = width/2;
        }
}
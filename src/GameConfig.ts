export class GameConfig
{
    height: number;
    context: string;
    constructor(
        public fpsCounter: boolean = true,
        public width: number = 256){
            this.fpsCounter = fpsCounter;
            this.width = width;
            this.height = width/2;
            this.context = 'webgl'
        }
}
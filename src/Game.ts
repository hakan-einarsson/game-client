import FPSCounter from "./FPSCounter";
import { GameConfig } from "./GameConfig";
import Renderer from "./Renderer";
import DynamicGameObject from "./DynamicGameObject";



export default class Game {
    config: GameConfig;
    canvases: HTMLCollectionOf<HTMLCanvasElement>;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    counter: FPSCounter | null;
    renderer: Renderer;
    dynamicGameObjects: DynamicGameObject[];
    player: DynamicGameObject | null;
    lastFrameTime: number;
    constructor(config:GameConfig) {
        this.config = config;
        this.counter = config.fpsCounter ? new FPSCounter(document.getElementById('fps-counter')) : null;
        this.canvases = document.getElementsByTagName("canvas");
        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.context = this.canvas ? this.canvas.getContext("2d") : null;
        // if(this.context)this.context.imageSmoothingEnabled = false;
        this.renderer = new Renderer(this.canvas, this.context);
        this.dynamicGameObjects = [];
        this.player = null;
        this.lastFrameTime = 0;
        this.setCanvasSize();
        this.positionCanvas();
        this.canvasResizeListener();
    }

    setCanvasSize() {
        //loop through this.canvases
        const width =0.8*window.innerWidth;
        const height = 0.8*window.innerHeight;

        for (let i = 0; i < this.canvases.length; i++) {
                this.canvases[i].style.maxWidth = width.toString() + "px";
                this.canvases[i].style.maxHeight = height.toString() + "px";
                this.canvases[i].width = Math.round(width/4);
                this.canvases[i].height = Math.round(height/4);
                this.canvases[i].style.position = "absolute";
                this.canvases[i].style.transform = "translate(10%, 10%)"
        }
    }
    
    positionCanvas() {
        //create a floating button that will be used to toggle fullscreen
        const fullscreenButton = document.createElement("button");
        fullscreenButton.id = "fullscreen-button";
        fullscreenButton.innerHTML = "Fullscreen";
        fullscreenButton.style.position = "absolute";
        fullscreenButton.style.bottom = "15px";
        fullscreenButton.style.right = "50%";
        const wrapper = document.getElementById("wrapper") as HTMLDivElement;
        //create a p 
        fullscreenButton.addEventListener("click", () => {
            wrapper.requestFullscreen().then(() => {
                this.setCanvasSize();
            });;
        });
        document.body.appendChild(fullscreenButton);

    }

    canvasResizeListener() {
        return window.addEventListener("resize", () => {
            this.positionCanvas();
        });
    }

    addDynamicGameObject(gameObject:DynamicGameObject) {
        this.dynamicGameObjects.push(gameObject);
    }

    addPlayer(player:DynamicGameObject) {
        this.player = player;
    }

    getCanvas() {
        return this.canvas;
    }

    run = (timestamp:number) => {

        const deltaTime = timestamp - this.lastFrameTime;

        // Update the game state based on the time passed
        this.update(deltaTime);

        // Render the next frame
        this.render(deltaTime);

        // Save the current time for use in the next frame
        this.lastFrameTime = timestamp;
        requestAnimationFrame(this.run);
    }

    update(deltaTime:number) {
        if (deltaTime < 1000) {
            if(this.player){
                this.player.update(deltaTime);
                this.player.x += this.player.velocity.x * (deltaTime / 1000) * this.player.speed;
                this.player.y += this.player.velocity.y * (deltaTime / 1000) * this.player.speed;
            }
            this.dynamicGameObjects.forEach(gameObject => {
                gameObject.update(deltaTime);
                // if (gameObject.isPlayer) {
                //     if(this.keyboardController){
                //         this.keyboardController.checkInput(gameObject, deltaTime);
                //     }
                    // gameObject.x += gameObject.velocity.x * (deltaTime / 1000) * gameObject.speed;
                    // gameObject.y += gameObject.velocity.y * (deltaTime / 1000) * gameObject.speed;
                // }
            });
        }
    }

    render(deltaTime:number) {
        if(this.context){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // if (this.config.fpsCounter && this.counter) {
            //     this.counter.update();
            // }
            if(this.player)this.renderer.renderPlayer(this.player,deltaTime);
            this.renderer.render(this.dynamicGameObjects,deltaTime);
        }
    }
}




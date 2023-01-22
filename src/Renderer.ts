import DynamicGameObject from "./DynamicGameObject";
import { RenderProperties } from "./interfaces";
import StaticGameObject from "./StaticGameObject";

export default class Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;

    constructor(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D | null) {
        this.canvas = canvas;
        this.context = context;
    }

    render(gameObjects:DynamicGameObject[] | StaticGameObject[], deltaTime:number) {
        //deltatime should be passed to spriteSheet.updateCurrentFrame(deltaTime)
        gameObjects.forEach(gameObject => {
                if(this.context){
                const renderProps = gameObject.getRenderProperties();
                if (gameObject.spritesheet && renderProps.spritesheet) {
                    this.drawImage(renderProps);
                    // const { x, y } = renderProps.spritesheet.getCurrentSprite();
                    // this.context.drawImage(renderProps.spritesheet.image,
                    //     x, y, renderProps.spritesheet.image.width / renderProps.spritesheet.columns, renderProps.spritesheet.image.height / renderProps.spritesheet.rows,
                    //     Math.round(renderProps.x), Math.round(renderProps.y), renderProps.width, renderProps.height);
                    gameObject.spritesheet.updateCurrentFrame(deltaTime);
                } else {
                this.context.fillRect(Math.round(gameObject.x),
                    Math.round(gameObject.y),
                    renderProps.width,
                    renderProps.height);
                    }
                }
            });
    }

    renderPlayer(player:DynamicGameObject,deltaTime:number){
        if(this.context && player){
            const renderProps = player.getRenderProperties();
            if (player.spritesheet && renderProps.spritesheet) {
                this.drawImage(renderProps);
                player.spritesheet.updateCurrentFrame(deltaTime);
            } else {
            this.context.fillRect(Math.round(player.x),
                Math.round(player.y),
                renderProps.width,
                renderProps.height);
                }
        }
    }

    drawImage(renderProps:RenderProperties){
        if(this.context && renderProps.spritesheet){
            if(renderProps.spritesheet?.flippedHorizontally){
                this.context.save();
                this.context.scale(-1, 1);
                const sprite = renderProps.spritesheet.getCurrentSprite();
                this.context.drawImage(renderProps.spritesheet.image,
                    sprite.x, sprite.y, sprite.width, sprite.height,
                    Math.round(-renderProps.x - sprite.x + (renderProps.spritesheet.currentFrame-1)*sprite.width), Math.round(renderProps.y), renderProps.width, renderProps.height);
                this.context.restore();
            } else {
            const sprite = renderProps.spritesheet.getCurrentSprite();
            this.context.drawImage(renderProps.spritesheet.image,
                sprite.x, sprite.y, sprite.width, sprite.height,
                Math.round(renderProps.x), Math.round(renderProps.y), renderProps.width, renderProps.height);
            }
        }
    }
}
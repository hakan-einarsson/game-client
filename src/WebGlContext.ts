import { CanvasContext, RenderProperties } from "./interfaces";
import fragmentShader from "./shaders/fragmentShader.glsl";
import vertexShader from "./shaders/vertexShader.glsl";

export default class WebGlContext implements CanvasContext
{
    context: WebGLRenderingContext | null;
    program: WebGLProgram | null | undefined;
    vertexShader: WebGLShader | null | undefined;
    fragmentShader: WebGLShader | null | undefined;
    buffer: WebGLBuffer | null | undefined;
    
    constructor(public canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas ? canvas.getContext('webgl') : null;
        this.vertexShader = this.context?.createShader(this.context.VERTEX_SHADER);
        this.fragmentShader = this.context?.createShader(this.context.FRAGMENT_SHADER);
        this.initialize();
        
    }
    
    drawImage(renderProperties: RenderProperties): void
    {
        console.log('should render image');
    }
    
    clearViewport(): void
    {
        console.log('clear viewport');
    }

    bindTexture(image: HTMLImageElement): void
    {
        const texture = this.context?.createTexture();
        if(!texture) return;
        this.context?.bindTexture(this.context?.TEXTURE_2D, texture);
        //wrong here
        this.context?.texImage2D(this.context?.TEXTURE_2D, 0, this.context?.RGBA, this.context?.RGBA, this.context?.UNSIGNED_BYTE, image);
        this.context?.generateMipmap(this.context?.TEXTURE_2D);
        this.context?.bindTexture(this.context?.TEXTURE_2D, null);
    }

    initialize(): void
    {
        this.context?.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.program = this.context?.createProgram();
        if(this.vertexShader && this.fragmentShader && this.program){
            this.context?.shaderSource(this.vertexShader, vertexShader);
            this.context?.shaderSource(this.fragmentShader, fragmentShader);
            this.context?.compileShader(this.vertexShader);
            this.context?.compileShader(this.fragmentShader);
            const vertexCompiled = this.context?.getShaderParameter(this.vertexShader, this.context.COMPILE_STATUS);
            const fragmentCompiled = this.context?.getShaderParameter(this.fragmentShader, this.context.COMPILE_STATUS);
            if(!vertexCompiled){
                console.error(this.context?.getShaderInfoLog(this.vertexShader));
            }
            if(!fragmentCompiled){
                console.error(this.context?.getShaderInfoLog(this.fragmentShader));
            }
            this.context?.attachShader(this.program, this.vertexShader);
            this.context?.attachShader(this.program, this.fragmentShader);
            this.context?.linkProgram(this.program);

            this.buffer = this.context?.createBuffer();
            if(this.buffer){
                this.context?.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
                this.context?.bufferData(this.context.ARRAY_BUFFER, new Float32Array([
                    0, 0,
                    1, 0,
                    0, 1,
                    1, 1
                ]), this.context.STATIC_DRAW);
                this.context?.useProgram(this.program);
                this.context?.drawArrays(this.context.TRIANGLE_STRIP, 0, 4);
            }


        }
    }
}
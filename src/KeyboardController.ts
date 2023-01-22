import DynamicGameObject from "./DynamicGameObject";

export default class KeyboardController {
    keys: { [key: string]: boolean};
    constructor() {
        // Set up initial state for keyboard input
        this.keys = {};

        // Set up event listeners for keyboard input
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    // Event handler functions for keyboard input
    onKeyDown(event: KeyboardEvent) {
        this.keys[event.key] = true;
    }

    onKeyUp(event: KeyboardEvent) {
        this.keys[event.key] = false;
    }

    isKeyDown(key: string) {
        return this.keys[key];
    }

    checkInput(gameObject:DynamicGameObject, deltaTime:number) {
        let velocity = { x: 0, y: 0 };
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            velocity.x = -1;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            velocity.x = 1;
        }
        if (this.keys['ArrowUp'] || this.keys['w']) {
            velocity.y = -1;
        }
        if (this.keys['ArrowDown'] || this.keys['s']) {
            velocity.y = 1;
        }
        // Normalize the velocity vector if both x and y components are non-zero
        if (velocity.x !== 0 && velocity.y !== 0) {
            velocity.x /= Math.sqrt(2);
            velocity.y /= Math.sqrt(2);
        }
        // Update the velocity of the player object
        gameObject.velocity.x = 0;
        gameObject.velocity.y = 0;
        // Update the velocity of the player object

        gameObject.velocity.x += velocity.x * (deltaTime / 1000) * gameObject.speed;
        gameObject.velocity.y += velocity.y * (deltaTime / 1000) * gameObject.speed;

    }

    // Other methods for your keyboard controller, such as ones for checking the state of specific keys (e.g., isKeyDown, isShiftPressed)
}
export default class Physics {
    constructor(config = {}) {
        this.config = config;
    }

    checkCollision(gameObjects) {
        const movingGameObjects = gameObjects.filter(gameObject => gameObject.isMoving || gameObject.isPlayer);
        const staticGameObjects = gameObjects.filter(gameObject => !gameObject.isMoving && !gameObject.isPlayer);


    }
}
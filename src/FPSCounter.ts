export default class FPSCounter {
    previousTime: number;
    second: number;
    framesPlayedThisSecond: number;
    element: HTMLElement;
    constructor(element: HTMLElement | null) {
        this.previousTime = Date.now();
        this.second = 0;
        this.framesPlayedThisSecond = 0;
        //if element is null create an element <p> with id fps-counter
        this.element = element ? element : document.createElement('p');
    }

    update() {
        let currentTime = Date.now();
        let deltaTime = currentTime - this.previousTime;
        this.second += deltaTime;

        this.previousTime = currentTime;
        if (this.second > 1000) {
            this.element.innerHTML = this.framesPlayedThisSecond.toString();
            this.second = 0;
            this.framesPlayedThisSecond = 0;
        } else {
            this.framesPlayedThisSecond++;
        }
    }
}


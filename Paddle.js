const PADDLE_SPEED = 0.01;

export default class Paddle {
    constructor(paddleElement) {
        this.paddleElement = paddleElement;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--position'));
    }

    set position(value) {
        this.paddleElement.style.setProperty('--position', value);
    }

    rect() {
        return this.paddleElement.getBoundingClientRect();
    }

    reset() {
        this.position = 50;
    }

    update(delta, ballPosition) {
        this.position += delta * PADDLE_SPEED * (ballPosition - this.position);
    }
}
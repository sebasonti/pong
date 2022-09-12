const VELOCITY_MAGNITUDE = 0.025;
const VELOCITY_INCREMENT = 0.00001;

export default class Ball {
    constructor(ballElement) {
        this.ballElement = ballElement;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'));
    }

    set x(value) {
        this.ballElement.style.setProperty('--x', value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'));
    }

    set y(value) {
        this.ballElement.style.setProperty('--y', value);
    }

    rect() {
        return this.ballElement.getBoundingClientRect();
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.velocity_vector = { x: 0 };
        this.velocity_magnitude = VELOCITY_MAGNITUDE;
        while (Math.abs(this.velocity_vector.x) <= 0.35 || Math.abs(this.velocity_vector.x) >= 0.9) {
            const direction = randomBetween(0, 2 * Math.PI);
            this.velocity_vector = { x: Math.cos(direction), y: Math.sin(direction) };
        }
    }

    update(delta, paddleRects) {
        this.x += this.velocity_vector.x * this.velocity_magnitude * delta;
        this.y += this.velocity_vector.y * this.velocity_magnitude * delta;
        this.velocity_magnitude += VELOCITY_INCREMENT * delta;
        console.log(this.velocity_magnitude);

        const rect = this.rect();
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.velocity_vector.x *= -1;
        }

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.velocity_vector.y *= -1;
        }
    }
}

function isCollision(rect1, rect2) {
    return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
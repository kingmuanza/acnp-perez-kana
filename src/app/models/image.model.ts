export class Image {

    id: string;
    src: string;
    legende: string;

    constructor() {
        this.id = 'image' + new Date().toISOString() + '%' + Math.random() * 1000000;
        this.src = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC';
    }

}

export class Pomme {

    constructor(gc, size, position) {
        this.gc = gc;
        this.position = position;
        this.size = size;
        this.sprite = document.getElementById("pomme");
    }

    render() {
        this.gc.drawImage(this.sprite, this.position.x, this.position.y, this.size, this.size);
    }
}
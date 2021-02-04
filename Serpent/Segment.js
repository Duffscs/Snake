export class Segment {
    constructor(pos, direction, sprite, size) {
        this.position = pos;
        this.sprite = sprite;
        this.direction = direction;
        this.size = size;
    }

    render(gc) {
        gc.clearRect(this.position.x, this.position.y, this.size, this.size);
        this.direction.renderSprite(this.position, this.sprite, gc, this.size);
    }

}
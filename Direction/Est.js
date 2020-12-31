import { Position } from "./Position.js";

export class Est {
    constructor() { }
    avancer(pos, pas) {
        return new Position(pos.x + pas, pos.y);
    }

    renderSprite(position, sprite, gc, size) {
        gc.rotate(-90 * Math.PI / 180);
        gc.drawImage(sprite, -position.y - size, position.x, size, size);
        gc.setTransform(1, 0, 0, 1, 0, 0);
    }

    type(){
        return "Est";
    }

}
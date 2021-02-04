import { Position } from "./Position.js";

export class Nord {
    constructor() { }
    avancer(pos, pas) {
        return new Position(pos.x, pos.y - pas);
    }

    renderSprite(position, sprite, gc, size) {
        gc.rotate(Math.PI);
        gc.drawImage(sprite, -position.x - size, -position.y-size, size, size);
        gc.setTransform(1, 0, 0, 1, 0, 0);
    }

    type(){
        return "Nord";
    }

}
import { Position } from "./Position.js";

export class Sud {
    constructor(){}
    avancer(pos, pas) {
        return new Position(pos.x, pos.y + pas);
    }

    renderSprite(position, sprite, gc, size) {
        gc.drawImage(sprite, position.x, position.y, size, size);
    }
    
    type(){
        return "Sud";
    }
}
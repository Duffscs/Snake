import { Position } from "./Direction/Position.js";

export class ObjectSet extends Set {

    constructor(width, height, spriteSize) {
        super();
        for (let i = 0; i < width; i += spriteSize) {
            for (let o = 0; o < height; o += spriteSize) {
                this.add(new Position(i, o));
            }
        }
    }

    has(k) {
        return super.has(JSON.stringify(k));
    }

    add(o) {
        super.add(JSON.stringify(o));
    }

    delete(o) {
        super.delete(JSON.stringify(o));
    }

    getRandomItem() {
        let item = JSON.parse(Array.from(this)[Math.floor(Math.random() * this.size)]);
        return new Position(item.x, item.y);
    }

}
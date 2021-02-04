import { Segment } from "./Segment.js";
import { Queue } from "./Queue.js";

export class Corp extends Segment {
    constructor(pos, direction, size) {
        super(pos, direction, document.getElementById("corp"), size);
    }

    toQueue(){
        return new Queue(this.position, this.direction, this.size);
    }
}
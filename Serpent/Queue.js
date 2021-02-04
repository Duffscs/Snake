import { Segment } from "./Segment.js";
import { Corp } from "./Corp.js";

export class Queue extends Segment {
    constructor(pos, direction, size) {
        super(pos, direction, document.getElementById("queue"), size);
    }
    toCorp() {
        return new Corp(this.position, this.direction, this.size);
    }
}
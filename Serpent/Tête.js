import { Segment } from "./Segment.js";
import { Corp } from "./Corp.js";

export class Tete extends Segment {
    constructor(pos, direction, size) {
        super(pos, direction, document.getElementById("tete"), size);
    }

    toCorps(){
        return new Corp(this.position, this.direction,this.size);
    }
}
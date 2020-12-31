import { Ouest, Nord, Est, Sud } from "../Direction/Direction.js";
import { Queue } from "./Queue.js";
import { Segment } from "./Segment.js";

export class Coude extends Segment {
    constructor(pos, nextDirection, direction, size) {
        super(pos, direction, document.getElementById("coude"), size);
        this.previousDir = nextDirection;
    }

    render(gc) {
        gc.clearRect(this.position.x, this.position.y, this.size, this.size);

        if (( this.direction instanceof Nord && this.previousDir instanceof Est) || ( this.direction instanceof Ouest && this.previousDir instanceof Sud )) {
            new Sud().renderSprite(this.position, this.sprite, gc, this.size);
        }

        if (( this.direction instanceof Est && this.previousDir instanceof Sud) || ( this.direction instanceof Nord && this.previousDir instanceof Ouest )) {
            new Ouest().renderSprite(this.position, this.sprite, gc, this.size);
        }

        if (( this.direction instanceof Sud && this.previousDir instanceof Est) || ( this.direction instanceof Ouest && this.previousDir instanceof Nord )) {
            new Est().renderSprite(this.position, this.sprite, gc, this.size);
        }

        if (( this.direction instanceof Sud && this.previousDir instanceof Ouest) || ( this.direction instanceof Est && this.previousDir instanceof Nord )) {
            new Nord().renderSprite(this.position, this.sprite, gc, this.size);
        }

    }

    toCorps(){
        return this;
    }

    toQueue(){
        return new Queue(this.position, this.direction, this.size);
    }

}
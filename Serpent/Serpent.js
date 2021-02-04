import { Nord, Est, Ouest, Sud } from "../Direction/Direction.js";
import { Position } from "../Direction/Position.js";
import { Corp } from "./Corp.js";
import { Coude } from "./Coude.js";
import { Queue } from "./Queue.js";
import { Tete } from "./Tête.js";

export class Serpent {

    constructor(gc, size) {
        this.gc = gc;
        this.direction = new Est();
        this.size = size;
        this.changeDir = false;
        this.creer();
    }

    render() {
        this.gc.beginPath();
        this.gc.clearRect(this.last.position.x, this.last.position.y, this.size, this.size);
        this.corps.forEach(e => {
            e.render(this.gc);
        })
        this.gc.stroke();
    }

    avancer() {
        this.changeDir = false;
        this.tete = new Tete(this.direction.avancer(this.tete.position, this.size), this.direction, this.size);
        this.corps[0] = this.corps[0].toCorps();
        this.last = this.corps.pop();
        this.longueur--;
        this.corps.push(this.corps.pop().toQueue());
        this.corps[this.longueur - 1].direction = this.corps[this.longueur - 2].direction;
        this.corps.unshift(this.tete);
        this.longueur++;
    }

    orienter(ev) {
        const { key } = ev
        if (this.changeDir) return;
        const previousDir = this.direction;
        switch (key.toLowerCase()) {
            case "z":
            case "arrowup":
                if (!(this.direction instanceof Sud))
                    this.direction = new Nord();
                break;
            case "s":
            case "arrowdown":
                if (!(this.direction instanceof Nord))
                    this.direction = new Sud();
                break;
            case "q":
            case "arrowleft":
                if (!(this.direction instanceof Est))
                    this.direction = new Ouest();
                break;
            case "d":
            case "arrowright":
                if (!(this.direction instanceof Ouest))
                    this.direction = new Est();
                break;
        }
        if (this.direction.type() != previousDir.type()) {
            this.changeDir = true;
            const cou = this.corps[0];
            this.corps[0] = new Coude(cou.position, this.direction, cou.direction, this.size);
        }

    }

    grandir() {
        this.corps.push(this.corps.pop().toCorp());
        if (this.last.direction.type != this.corps[this.longueur - 1].direction.type) {
            const cou = this.corps[this.corps.length - 1];
            this.corps[this.longueur - 1] = new Coude(cou.position, cou.direction, this.last.direction, this.size);
            this.corps.push(new Queue(this.last.position, this.last.direction, this.size));
        } else {
            this.corps.push(new Queue(this.last.position, this.last.direction, this.size));
        }
        this.longueur++;
        document.getElementById("croc").volume = 0.05;
        document.getElementById("croc").play();


    }

    creer() {
        this.tete = new Tete(new Position(this.size * 3, this.size), this.direction, this.size);
        this.corps = [];
        this.corps.push(this.tete);
        const corp = new Corp(new Position(this.size * 2, this.size), this.direction, this.size);
        const queue = new Queue(new Position(this.size, this.size), this.direction, this.size);
        this.corps.push(corp);
        this.corps.push(queue);
        this.longueur = 3;
        this.last = new Queue(new Position(0, this.size), this.direction, this.size)
    }

}
import { Pomme } from "./Pomme.js";
import { ObjectSet } from "./ObjectSet.js";
import { Serpent } from "./Serpent/Serpent.js";

export class Terrain {

    constructor(gc, size) {
        this.gc = gc;
        this.size = size;
        this.spriteSize = size/20;
        this.delai = 100;
        this.event = ev => this.serpent.orienter(ev);
        this.preparer();
    }

    preparer() {
        this.gc.clearRect(0, 0, this.size, this.size);
        this.stop = false;
        this.serpent = new Serpent(this.gc, this.spriteSize);
        this.posLibre = new ObjectSet(this.size, this.size, this.spriteSize);
        this.posLibre.delete(this.serpent.corps[1].position);
        this.posLibre.delete(this.serpent.corps[2].position);
        document.addEventListener("keydown", this.event);
        document.getElementById("score").innerHTML = 0;
        this.play();
    }

    async play() {
        if (this.stop) return;
        this.pomme = new Pomme(this.gc, this.spriteSize, this.posLibre.getRandomItem());
        this.render();
        this.interval = setInterval(() => {
            this.posLibre.delete(this.serpent.tete.position);
            this.serpent.avancer();
            this.posLibre.add(this.serpent.last.position);
            if (this.checkContact()) {
                this.serpent.render();
            }
        }, this.delai);
    }

    checkContact() {
        if (this.pomme.position.contact(this.serpent.tete.position)) {
            this.manger();
            return false;
        }
        if (this.positionEstOcuppe(this.serpent.tete.position)) {
            this.defeat();
            return false;
        }
        return true;
    }

    manger() {
        clearInterval(this.interval);
        this.serpent.grandir();
        this.posLibre.delete(this.serpent.last.position);
        this.play();
        document.getElementById("score").innerHTML = this.serpent.longueur - 3;
        if (this.serpent.longueur - 3 > document.getElementById('highscore').innerHTML) {
            document.getElementById('highscore').innerHTML = this.serpent.longueur - 3;
        }
    }

    defeat() {
        this.gc.textAlign = 'center';
        this.gc.font = '48px Roboto';
        this.gc.fillStyle = 'red';
        this.gc.fillText("Vous avez perdu !", this.size / 2, this.size / 4);
        this.gc.strokeStyle = 'black';
        this.gc.strokeText("Vous avez perdu !", this.size / 2, this.size / 4);
        this.stop = true;
        clearInterval(this.interval);
        this.serpent = null;
        this.posLibre = null;
        this.pomme = null;
        document.removeEventListener("keypress", this.event);
        document.getElementById("mort").volume = 0.20;
        document.getElementById("mort").play();
    }

    positionEstOcuppe(pos) {
        return !this.posLibre.has(pos);
    }

    render() {
        this.serpent.render();
        this.pomme.render();
    }

    resize(size){
        this.size = size;
        this.spriteSize = size/20;
        this.defeat();
        this.preparer();
    }
}
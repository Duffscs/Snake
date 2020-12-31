export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    contact(pos2) {
        if (this.x == pos2.x && this.y == pos2.y)
            return true;
        return false
    }

}
export default class Margin {
    constructor({top = 0, right = 0, bottom = 0, left = 0} = {}) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    get lr() {
        return this.left + this.right;
    }

    get tb() {
        return this.top + this.bottom;
    }
}
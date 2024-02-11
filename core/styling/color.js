/**
 * Class representing a color.
 */
export class Color {
    /**
     * Create a color.
     * @param {{r: number, g: number, b: number, a: number} | undefined} [color] - The color values. If not provided, defaults to {r: 0, g: 0, b: 0, a: 1}.
     */
    constructor(color) {
        if (color !== undefined) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        } else {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 1;
        }
    }

    /**
     * Convert the color to a string.
     * @returns {string} The color as a string in the format `rgba(r, g, b, a)`.
     */
    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    /**
     * Change a color.
     * @param {number | undefined} r - [0-255] red.
     * @param {number | undefined} g - [0-255] green.
     * @param {number | undefined} b - [0-255] blue.
     * @param {number | undefined} a - [0-1] opacity/alpha.
     */
    setColor(r, g, b, a) {
        if (r !== undefined && g !== undefined && b !== undefined && a !== undefined) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        } else {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 1;
        }
    }

    clone() {
        let color = new Color();
        color.setColor(JSON.parse(JSON.stringify(this.r)), JSON.parse(JSON.stringify(this.g)), JSON.parse(JSON.stringify(this.b)), JSON.parse(JSON.stringify(this.a)))
        return color;
    }
}


/**
 * 
 * @param {number | undefined} r - [0-255]
 * @param {number | undefined} g - [0-255]
 * @param {number | undefined} b - [0-255]
 * @param {number | undefined} a - [0-1]
 */
export function createColor(r, g, b, a) {
    let color = new Color();
    color.setColor(r, g, b, a);
    return color;
}
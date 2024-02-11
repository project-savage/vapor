/**
 * Class representing a dimension.
 */
export class Dimension {
    /**
     * Create a dimension.
     * @param {number} numeric - The numeric value of the dimension.
     * @param {string} unit - The unit of the dimension.
     */
    constructor(numeric, unit) {
        this.numeric = numeric;
        this.unit = unit;
    }

    /**
     * @returns {number} computed pixel value.
     */
    intoPx(){
        let value = 0;
        switch(this.unit){
            case 'px':
                value = this.numeric;
                break;
            default:
                console.error("Invalid Unit.")    
                break;
        }
        return value;
    }
    clone() {
        return new Dimension(JSON.parse(JSON.stringify(this.numeric)), JSON.parse(JSON.stringify(this.unit)));
    }
}

/**
 * Enum for units.
 * @readonly
 * @enum {String}
 */
export const Units = Object.freeze({
    Px: 'px',
    // TODO: support for more units.
});

/**
 * 
 * @param {number} numeric 
 * @param {String} unit 
 */
export function createDimension(numeric, unit){
    let u = Object.values(Units).includes(unit) ? unit : Object.keys(Units).includes(unit) ? Units[unit] : null;
    
    if(u === null){
        throw new Error(unit + " is not a valid unit");
    }

    return new Dimension(numeric, u);
}

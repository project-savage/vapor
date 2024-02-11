/**
 * Class representing a position.
 */
export class Position{
    /**
     * Create a position.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} z - The z-coordinate.
     */
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone(){
        let pos = new Position(JSON.parse(JSON.stringify(this.x)),JSON.parse(JSON.stringify(this.y)),JSON.parse(JSON.stringify(this.z)));

        return pos;
    }
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number | undefined} z 
 */
export function createPosition(x,y,z){
    let pos;
    if(z!==undefined){
        pos = new Position(x,y,z);
    } else{
        pos = new Position(x,y,0);
    }
    return pos;
}
export class Holder {
    /**
     * Takes in an object and creates new fields in the Holder instance.
     * @param {Object} obj - The object to hold.
     */
    constructor(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
    }

    /**
     * Clones the holder and all its fields.
     * @returns {Holder} The cloned holder.
     */
    clone() {
        let clonedObj = {};
        for (let prop in this) {
            if (this.hasOwnProperty(prop)) {
                if(this[prop] instanceof Object){
                    clonedObj[prop] = this[prop].clone();
                } else{
                    clonedObj[prop] = JSON.parse(JSON.stringify(this[prop]));
                }
            }
        }
        return new Holder(clonedObj);
    }
}

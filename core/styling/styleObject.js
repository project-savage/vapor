import { Holder } from "../other/holder.js";

import { Color, createColor } from "./color.js";
import { Dimension, createDimension } from "./dimension.js";

/**
 * Class representing a style object.
 */
export class StyleObject {
    /**
     * Create a style object.
     * 
     */
    constructor() {
        // switch (type) {
        //     case NodeType.DIV:
        //         this.width = createDimension(10, 'px');
        //         this.height = createDimension(10, 'px');
        //         this.backgroundColor = createColor();
        //         this.border = new Holder({radius: createDimension(10, 'px'), width: createDimension(1, 'px'), color: createColor(255, 255, 255, 0) });

        //         break;
        //     case NodeType.SPAN:
        //         this.fontFamily = "serif";
        //         this.fontSize = new Dimension(100, 'px');
        //         this.color = new Color();
        //         break;
        //     case NodeType.P:
        //         this.fontFamily = "serif";
        //         this.fontSize = new Dimension(100, 'px');
        //         this.color = new Color();
        //         break;
        // }
        
    }

    /**
     * Set the width of the style object.
     * @param {{numeric: number, unit: string}} width - The width to set.
     */
    setWidth(width) {
        this.width = width;
    }

    /**
     * Set the height of the style object.
     * @param {{numeric: number, unit: string}} height - The height to set.
     */
    setHeight(height) {
        this.height = height;
    }

    /**
     * Set the width and height of the style object.
     * @param {Dimension} width - The width to set to.
     * @param {Dimension} height - The height to set to.
     * 
     */
    setWidthHeight(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Set the background color of the style object.
     * @param {Color} color - The color to set.
     */
    setBackgroundColor(color) {
        if (color instanceof Color) {
            this.backgroundColor = color;
        } else { throw new Error("Invalid Color. use Color object.") }
    }

    clone() {
        let styleobj = new StyleObject(this.type);


        for (let prop in this) {
            if (this.hasOwnProperty(prop)) {
                
                if (this[prop] instanceof Object) {
                    styleobj[prop] = this[prop].clone();
                } else {
                    styleobj[prop] = JSON.parse(JSON.stringify(this[prop]));
                }

            }
        }

        return styleobj
    }
}

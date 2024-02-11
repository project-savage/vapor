import { AnimationHandler } from './animation/animation.js';
import { Position } from './other/position.js';
import { StyleObject } from './styling/styleObject.js';

/**
 * Class representing a node.
 */
export class Node {
    /**
     * Create a node.
     * @param {Position} position - The position of the node.
     * @param {String} type - The type of the node.
     * @param {Object} properties - The properties of the node.
     */
    constructor(position, type, properties) {

        this.initPos = position;
        this.pos = position;
        this.type = type;
        this.renderFunctionIndex = 0;
        this.style = new StyleObject();
        this.startTime = 0;
        this.endTime = 0;
       
        Object.assign(this, properties);
    }

    /**
     * Set the start and end time of the node.
     * @param {number} start - The start time.
     * @param {number} end - The end time.
     */
    setTime(start, end) {
        this.startTime = start;
        this.endTime = end;
    }


    /**
     * Set the inner text of the node.
     * @param {string} text - The text to set.
     */
    setInnerText(text) {
        if (this.isTextNode) {
            this.innerText = text;
        } else { throw new Error("Current Node is Not Text Type"); }
    }

    /**
     * Initializes node.animation = AnimationHandler
     */
    initAnimation(){
        this.animation = new AnimationHandler(this);
    }

    /**
     * Sets the animationFunction of the node.animation ALSO creates it.
     * @param {function(Node, number): void} animationFunction - The Animation function, that changes with currentTime.
     */
    setAnimation(animationFunction){
        this.initAnimation();
        this.animation.setAnimation(animationFunction);
    }

    /**
     * Sets the renderFunction that must be used
     * @param {number} index 
     */
    setRenderFunctionIndex(index){  
        this.renderFunctionIndex = index;
    }

    /**
     * returns deep copy of node.
     * @returns {Node} - a  DEEP copy of the Node
     */
    clone(){
        let NodeCopy = new Node(this.initPos, this.type);

        for(let prop in this){
            if(this.hasOwnProperty(prop)){
                if(prop !== 'animation'){
                    if(this[prop] instanceof Object){
                        
                        NodeCopy[prop] = this[prop].clone();
                    } else{
                        NodeCopy[prop] = JSON.parse(JSON.stringify(this[prop]));
                    }
                }
            }
        }

        return NodeCopy;
    }

    
}




/**
 * Create a node. (helper function)
 * @param {Position} position - The position of the node.
 * @param {NodeType} type - The type of the node.
 * @returns {Node} The created node.
 */
export function createNode(position, type) {
    return new Node(position, type);
}

/**
 * Create a node at a specific time. (helper function)
 * @param {Position} position - The position of the node.
 * @param {NodeType} type - The type of the node.
 * @param {{start: number, end: number}} time - The start and end time of the node.
 * @returns {Node} The created node.
 */
export function createNodeAtTime(position, type, { start, end }) {
    let n = new Node(position, type);
    n.setTime(start, end);
    return n;
}

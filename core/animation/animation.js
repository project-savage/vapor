import { Node } from "../nodeHandler.js";
/**
 * Animation class
 */
export class AnimationHandler {
    /**
     * @param {Node} node 
     */
    constructor(node) {
        this.node = node;
        this.currentNode = node.clone();

        this.startTime = node.startTime;
        this.endTime = node.endTime;
    }

    /**
     * Gets the properties (x,y, etc) at currentTime; Returns Node
     * @param {number} currentTime 
     */
    get(currentTime) {
        let time = currentTime-this.startTime;
        this.animationFunction(time);
        
        return this.currentNode.clone();
    }

    reset(){
        this.currentNode = this.node.clone();
    }
    /**
     * Sets the animationFunction of the animation.
     * @param {function(Node, number): void} animationFunction - The Ani mation function, that changes with currentTime.
     */
    setAnimation(animationFunction) {
        this.animationFunction = (currentTime) => animationFunction(this.currentNode, currentTime);
    }


}
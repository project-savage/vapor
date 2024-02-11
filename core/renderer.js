import { Node } from "./nodeHandler.js";
import { PluginHandler } from "./plugin/pluginHandler.js";

/**
 * Class representing a renderer.
 */
export class Renderer {
    /**
     * Create a renderer.
     * @param {HTMLCanvasElement} canvas - The canvas to render on.
     * @param {Resolution} resolution - takes the resolution of the canvas. MUST be in aspect ratio; Else height will be discarded.
     */
    constructor(canvas, resolution) {
        this.canvas = canvas;
        let aspectRatio = this.canvas.dataset.aspectRatio.split(':');

        if (this.canvas.width / this.canvas.height == aspectRatio[0] / aspectRatio[1]) {
            this.canvas.width = resolution.width;
            this.canvas.height = resolution.height;
        }
        else {
            this.canvas.width = resolution.width;
            this.canvas.height = resolution.width / (aspectRatio[0] / aspectRatio[1]);
        }
        this.ctx = this.canvas.getContext('2d');
    }

    /**
 * Render a list of nodes.
 * @param {Node[]} nodes - The nodes to render. 
 * @param {number} currentTime - The current time.
 * @param {PluginHandler} pluginHandler - the plugin Handler linked to the current timeline.
 */
    render(nodes, currentTime, pluginHandler) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (Array.isArray(nodes)) {
            // Sort nodes by z property
            nodes.sort((a, b) => a.pos.z - b.pos.z);

            for (let node of nodes) {
                if (node instanceof Node) {
                    this.renderNode(node, currentTime, pluginHandler);
                } else {
                    console.error('Invalid node in array');
                }
            }
        } else {
            throw new Error('Nodes is not an array');
        }
    }

    /**
     * Render a single node.
     * @param {Node|*} node - The node to render. This can be an instance of Node or any class that extends Node.
     * @param {number} currentTime - The current time.
     * @param {PluginHandler} pluginHandler - The pluginHandler
     */
    renderNode(node, currentTime, pluginHandler) {
        if (node instanceof Node) {
                        
            let renderFunctions = pluginHandler.getRenderFunctions(node.type);
            
            if (!renderFunctions || !renderFunctions[node.renderFunctionIndex]) {
                throw new Error('Invalid render function index');
            }
            renderFunctions[node.renderFunctionIndex](node, currentTime, this.ctx);
        } else {
            throw new Error('Invalid node');
        }
    }




}

import { Node } from "./nodeHandler.js";
import { Renderer } from "./renderer.js";
import { Resolution } from "./other/resolution.js";
import { PluginHandler } from "./plugin/pluginHandler.js";
import { Position } from "./other/position.js";
/**
 * Class representing a timeline.
*/
export class Timeline {
    /**
     * Create a timeline.
     * @param {number} FPS - The frames per second for the timeline.
     */
    constructor(FPS) {
        /** @type {PluginHandler} */
        this.pluginHandler = new PluginHandler();



        /** @type {Node[]} */
        this.nodes = [];
        /** @type {number} */
        this.FPS = FPS;
        /** @type {number} */
        this.lastTime = 0;
        /** @type {HTMLElement[]} */
        this.linkedInputs = [];
        /** @type {number} */
        this.currentTime = 0;
        /** @type {Renderer[]} */
        this.renderers = [];
        /** @type {boolean} */
        this.debug = false;
        this.isPlaying = false;
    }

    /**
     * Add a node to the timeline.
     * @param {Node} node - The node to add.
     */
    addNode(node) {
        // Check if Valid Node.
        if (!(node instanceof Node)) {
            throw new Error('Invalid node');
        }
        node.z = this.nodes.length - 1;
        let index = this.indexNode(node, this.nodes);

        if (index < this.nodes.length) {
            this.nodes.splice(index, 0, node);
        } else {
            this.nodes.push(node);
        }

        // update lastTime
        if (this.lastTime < node.endTime) {
            this.lastTime = node.endTime;
            this.updateLinkedInputs();
        }
    }

    /**
     * Get the index of a node in a sorted list of nodes.
     * @param {Node} node - The node to find.
     * @param {Node[]} nodes - The sorted list of nodes.
     * @returns {number} The index of the node.
     */
    indexNode(node, nodes) {
        // ... rest of your code
    }

    /**
     * Get all nodes at a specific time.
     * @param {number} time - The time to check.
     * @returns {Node[]} The nodes at the specified time.
     */
    getNodeAtTime(time) {
        let nodesAtTime = [];
        for (let node of this.nodes) {
            // If node starts after the search time, break the loop
            if (node.startTime > time) {
                break;
            }
            // If time falls within the node interval, add it to the result
            if (node.endTime >= time) {
                nodesAtTime.push(node);
            }
        }
        return nodesAtTime;
    }

    /**
     * Link an input element to the timeline.
     * @param {string} selector - The CSS selector for the input element.
     */
    linkInput(selector) {
        let inputs = document.querySelectorAll(selector);
        inputs.forEach(input => {
            if (!this.linkedInputs.includes(input)) {
                this.linkedInputs.push(input);
                input.max = this.lastTime;
                input.step = 1 / this.FPS; // Step size of 1 frame
                // Store the event listener function in the input element
                input.updateFunction = () => {
                    this.currentTime = input.value;
                    let nodesAtTime = this.getNodeAtTime(this.currentTime);

                    for (let renderer of this.renderers) {
                        if (this.debug) {
                            let t0 = performance.now();
                            renderer.render(nodesAtTime, this.currentTime, this.pluginHandler);
                            let t1 = performance.now();
                            console.log("Renderer id:" + renderer.canvas.id + " Time:" + (t1 - t0) + "ms");
                        } else {
                            renderer.render(nodesAtTime, this.currentTime, this.pluginHandler);
                        }
                    }

                };
                input.addEventListener('input', input.updateFunction);
            }
        });
    }

    /**
     * Link the space key to play/pause the timeline.
    */
    linkPlayPause() {
        let playIntervalId = null;

        window.addEventListener('keydown', (event) => {
            if (event.key === ' ') { // Check if the pressed key is space
                if (this.isPlaying) {
                    // If the timeline is playing, pause it
                    clearInterval(playIntervalId);
                    playIntervalId = null;
                    this.isPlaying = false;
                } else {
                    // If the timeline is at its end, restart it from the beginning
                    if (this.currentTime === this.lastTime) {
                        this.currentTime = 0;
                    }

                    // If the timeline is paused, play it
                    playIntervalId = setInterval(() => {
                        this.currentTime += 1 / this.FPS;
                        // Ensure currentTime stays within bounds
                        this.currentTime = Math.max(0, Math.min(this.lastTime, this.currentTime));

                        // If currentTime has reached lastTime, stop the timeline
                        if (this.currentTime === this.lastTime) {
                            clearInterval(playIntervalId);
                            playIntervalId = null;
                            this.isPlaying = false;
                            return;
                        }

                        // Update the linked inputs
                        this.linkedInputs.forEach(input => {
                            input.value = this.currentTime;
                        });

                        // Call the renderer
                        let nodesAtTime = this.getNodeAtTime(this.currentTime);
                        for (let renderer of this.renderers) {
                            if (this.debug) {
                                let t0 = performance.now();
                                renderer.render(nodesAtTime, this.currentTime, this.pluginHandler);
                                let t1 = performance.now();
                                console.log("Renderer id:" + renderer.canvas.id + " Time:" + (t1 - t0) + "ms");
                            } else {
                                renderer.render(nodesAtTime, this.currentTime, this.pluginHandler);
                            }
                        }
                    }, 1000 / this.FPS);
                    this.isPlaying = true;
                }
            }
        });
    }


    /**
     * Link key strokes to the timeline.
     * @param {string} keyDecrease - The key to decrease the currentTime.
     * @param {string} keyIncrease - The key to increase the currentTime.
     */
    linkKeyStroke(keyDecrease, keyIncrease) {
        window.addEventListener('keydown', (event) => {
            if (event.key === keyDecrease) {
                this.currentTime -= 1 / this.FPS;
            } else if (event.key === keyIncrease) {
                this.currentTime += 1 / this.FPS;
            }
            // Ensure currentTime stays within bounds
            this.currentTime = Math.max(0, Math.min(this.lastTime, this.currentTime));

            // If a frame-by-frame key is pressed, stop the timeline
            if ([keyDecrease, keyIncrease].includes(event.key) && this.isPlaying) {
                clearInterval(playIntervalId);
                playIntervalId = null;
                this.isPlaying = false;
            }

            // Update the linked inputs
            this.linkedInputs.forEach(input => {
                input.value = this.currentTime;
            });

            // Call the renderer
            let nodesAtTime = this.getNodeAtTime(this.currentTime);
            for (let renderer of this.renderers) {
                if (this.debug) {
                    let t0 = performance.now();
                    renderer.render(nodesAtTime, this.currentTime, this.pluginHandler);
                    let t1 = performance.now();
                    console.log("Renderer id:" + renderer.canvas.id + " Time:" + (t1 - t0) + "ms");
                } else {
                    renderer.render(nodesAtTime, this.currentTime, this.pluginHandler);
                }
            }
        });
    }



    /**
     * Unlink an input element from the timeline.
     * @param {string} selector - The CSS selector for the input element.
     */
    unlinkInput(selector) {
        let inputs = document.querySelectorAll(selector);
        inputs.forEach(input => {
            let index = this.linkedInputs.indexOf(input);
            if (index !== -1) {
                this.linkedInputs.splice(index, 1);
                // Remove the event listener
                input.removeEventListener('input', input.updateFunction);
                input.updateFunction = null;
            }
        });
    }

    /**
     * Update the maximum value and step size of all linked inputs.
     */
    updateLinkedInputs() {
        for (let input of this.linkedInputs) {
            input.max = this.lastTime;
            input.step = 1 / this.FPS; // Step size of 1 frame
        }
    }

    /**
     * Link a preview element to the timeline.
     * @param {string} selector - The CSS selector for the preview element.
     */
    linkPreview(selector) {
        let previews = document.querySelectorAll(selector);
        previews.forEach(preview => {
            let renderer = new Renderer(preview, new Resolution(1920, 1080));
            if (!this.renderers.includes(renderer)) {
                this.renderers.push(renderer);
            }
        });
    }

    /**
     * Unlink a preview element from the timeline.
     * @param {string} selector - The CSS selector for the preview element.
     */
    unlinkPreview(selector) {
        let previews = document.querySelectorAll(selector);
        previews.forEach(preview => {
            let rendererToRemove = this.renderers.find(renderer => renderer.canvas === preview);
            this.renderers = this.renderers.filter(renderer => renderer !== rendererToRemove);
        });
    }

    /**
     * 
     * @param {String} path - Path to the plugin
     * @param {Function} postFunc - what to do after plugin registered
     */
    addPlugin(path) {
        let finished;
        this.pluginHandler.register('../plugins/default/defaultDiv.js').then();

        while (!finished) {
            Loading();
        }
        finishLoading();
    }

    /**
     * 
     * @param {Position} pos - Position.
     * @param {String} type - type of node
     * @returns {Promise<Node>} A promise that resolves to the node with the custom properties of the type.
     */
    async createNode(pos, type) {
        let plugin = this.pluginHandler.plugins[type];
        
        if (!plugin) {
            // Load the lookup table
            const response = await fetch('/plugins/plugins.json');
            const lookupTable = await response.json();
            const pluginPath = lookupTable[type];
            if (!pluginPath) {
                throw new Error(`No plugin found for node type: ${type}`);
            }

            // Register the plugin
            plugin = await this.pluginHandler.register(`/plugins/${pluginPath}`);
            
        }

        
        
        let nodeProperties = this.pluginHandler.getNodeProperties(type);
                   

        // Create a new Node instance with the properties
        let n = new Node(pos, type, nodeProperties);

        return n;
    }

}

/**
 * Interface for a plugin.
 */
export class PluginInterface {
    /**
     * Get the node type that this plugin supports.
     * @returns {string} The node type.
     * @throws {Error} If the method is not implemented.
     */
    getNodeType() {
        throw new Error("Method 'getNodeType()' must be implemented.");
    }

    /**
     * Get the properties for the node type that this plugin supports.
     * @returns {Object} The node properties.
     * @throws {Error} If the method is not implemented.
     */
    getNodeProperties() {
        throw new Error("Method 'getNodeProperties()' must be implemented.");
    }

    /**
     * Get the render function for the node type that this plugin supports.
     * @returns {Function} The render function.
     * @throws {Error} If the method is not implemented.
     */
    getRenderFunction() {
        throw new Error("Method 'getRenderFunction()' must be implemented.");
    }
}

/**
 * Class representing a plugin handler.
 */
export class PluginHandler {
    /**
     * Create a plugin handler.
     */
    constructor() {
        /** @type {Object} Map of plugins by node type. */
        this.plugins = {};
    }

    /**
    * Register a plugin by path.
    * @param {string} path - The path to the plugin module.
    */
    async register(path) {
        const module = await import(path);
        const PluginClass = module.default;
        if (!(PluginClass.prototype instanceof PluginInterface)) {
            throw new Error('Invalid plugin: does not extend PluginInterface');
        }
        const plugin = new PluginClass();
        this.registerPlugin(plugin);
        console.log("Plugin registered:", path);
        return plugin;
    }
    
    /**
     * Register a plugin.
     * @param {PluginInterface} plugin - The plugin to register.
     * @throws {Error} If the plugin is invalid.
     */
    registerPlugin(plugin) {
        if (!(plugin instanceof PluginInterface)) {
            throw new Error('Invalid plugin');
        }
        const nodeType = plugin.getNodeType();
        const nodeProperties = plugin.getNodeProperties();
        const renderFunction = plugin.getRenderFunction();
        if (!this.plugins[nodeType]) {
            this.plugins[nodeType] = { nodeProperties, renderFunctions: [] };
        }
        this.plugins[nodeType].renderFunctions.push(renderFunction);
        
    }

    /**
     * Unregister a plugin.
     * @param {string} nodeType - The node type of the plugin to unregister.
     */
    unregister(nodeType) {
        delete this.plugins[nodeType];
    }

    /**
     * Get the properties for a node type.
     * @param {string} nodeType - The node type.
     * @returns {Object} The node properties.
     */
    getNodeProperties(nodeType) {
        return this.plugins[nodeType]?.nodeProperties;
    }

    /**
     * Get the render function for a node type.
     * @param {string} nodeType - The node type.
     * @returns {Function[]} The render functions.
     */
    getRenderFunctions(nodeType) {
        return this.plugins[nodeType]?.renderFunctions;
    }
}

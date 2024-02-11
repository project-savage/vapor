import { PluginInterface } from "/core/plugin/pluginHandler.js";
import { StyleObject } from "/core/styling/styleObject.js";
import { createDimension } from "/core/styling/dimension.js";
export default class ImgPlugin extends PluginInterface {
    getNodeType() {
        return 'IMG';
    }

    getNodeProperties() {
        let style = new StyleObject();

        style.width = createDimension(100, 'px');
        style.height = createDimension(100, 'px');

        let src = "";

        return { style };
    }

    getRenderFunction() {
        return (node, currentTime, ctx) => {
            renderSpan(node, currentTime, ctx);
        };
    }
}

/**
 * Render a span node.
 * @param {Node} node - The node to render.
 * @param {number} currentTime - The currentTime.
 */
function renderSpan(nodeInput, currentTime, ctx) {
    // TODO: span render logic
    let node = nodeInput;
    if (nodeInput.animation !== undefined) {
        node = nodeInput.animation.get(currentTime);
        nodeInput.animation.reset();
    }

    ctx.font = `${node.style.fontSize.numeric}${node.style.fontSize.unit} ${node.style.fontFamily}`;
    ctx.fillStyle = node.style.color.toString();
    ctx.fillText(node.innerText, node.pos.x, node.pos.y);
}

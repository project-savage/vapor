import { PluginInterface } from "/core/plugin/pluginHandler.js";
import { StyleObject } from "/core/styling/styleObject.js";
import { createDimension } from "/core/styling/dimension.js";
import { createColor } from "/core/styling/color.js";
export default class SpanPlugin extends PluginInterface {
    getNodeType() {
        return 'SPAN';
    }

    getNodeProperties() {
        let style = new StyleObject();

        style.fontFamily = "serif";
        style.fontSize = createDimension(100, 'px');
        style.color = createColor();

        let innerText = "Span Tag";
        let isTextNode = true;
        return { style, innerText, isTextNode };
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

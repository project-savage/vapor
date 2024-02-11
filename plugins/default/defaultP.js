import { PluginInterface } from "/core/plugin/pluginHandler.js";
import { StyleObject } from "/core/styling/styleObject.js";
import { Dimension } from "/core/styling/dimension.js";
import { Color } from "/core/styling/color.js";
export default class PPlugin extends PluginInterface {
    getNodeType() {
        return 'P';
    }

    getNodeProperties() {
        let style = new StyleObject();

        style.fontFamily = "serif";
        style.fontSize = new Dimension(100, 'px');
        style.color = new Color();

        let innerText = "P Tag";
        let isTextNode = true;
        return { style, innerText, isTextNode };
    }

    getRenderFunction() {
        return (node, currentTime, ctx) => {
            renderP(node, currentTime, ctx);
        };
    }
}


/**
 * Render a p node.
 * @param {Node} node - The node to render.
 * @param {number} currentTime - The currentTime.
 */
function renderP(node, currentTime, ctx) {
    // TODO: p render logic
    ctx.font = `${node.style.fontSize.numeric}${node.style.fontSize.unit} ${node.style.fontFamily}`;
    ctx.fillStyle = node.style.color.toString();
    ctx.fillText(node.innerText, node.pos.x, node.pos.y);
}
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

        /**
         * @type {String} - MUST BE ABSOLUTE URL! eg: let absoluteUrl = window.location.origin + "/test.jpg"; // This will be "http://localhost:8000/test.jpg"
         */
        let src = "";
        /**
         * @type {Boolean} - if image is loaded.
         */
        
        let img = new Image();
        img.src = src;
        return { style, src, img};
    }

    getRenderFunction() {
        return (node, currentTime, ctx) => {
            renderImg(node, currentTime, ctx);
        };
    }
}

/**
 * Render a span node.
 * @param {Node} nodeInput - The node to render.
 * @param {number} currentTime - The currentTime.
 * @param {CanvasRenderingContext2D} ctx - ctx.
 */
function renderImg(nodeInput, currentTime, ctx) {
    let node = nodeInput;
    if (nodeInput.animation !== undefined) {
        node = nodeInput.animation.get(currentTime);
        nodeInput.animation.reset();
    }
    // If src is not empty, draw the image
    if (node.src !== "") {
        
        node.img.src = node.src;
        ctx.drawImage(node.img, node.pos.x, node.pos.y, node.style.width.numeric, node.style.height.numeric);

    } else {
        // If src is empty, draw a black square
        ctx.fillStyle = "black";
        ctx.fillRect(node.pos.x, node.pos.y, node.style.width.numeric, node.style.height.numeric);
    }
}
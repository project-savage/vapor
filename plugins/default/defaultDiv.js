
import { PluginInterface } from '../../core/plugin/pluginHandler.js';
import { StyleObject } from '../../core/styling/styleObject.js';
import { createDimension } from '../../core/styling/dimension.js';
import { createColor } from '../../core/styling/color.js';
import { createPosition } from '../../core/other/position.js';
import { Holder } from '../../core/other/holder.js';

/**
 * 
 * Draws a rectangle with rounded corners on a 2D context.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas on which to draw the rectangle.
 * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
 * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {number} radius - The radius of the corners of the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius) {
    if (width < 2 * radius) {
        radius = width / 2;
    }
    if (height < 2 * radius) {
        radius = height / 2;
    }

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
}



export default class DivPlugin extends PluginInterface {
    getNodeType() {
        return 'DIV';
    }

    getNodeProperties() {
        let style = new StyleObject();
        style.width = createDimension(10, 'px');
        style.height = createDimension(10, 'px');
        style.backgroundColor = createColor();
        style.border = new Holder({radius: createDimension(10, 'px'), width: createDimension(1, 'px'), color: createColor(255, 255, 255, 0) });
        
        let content = new Holder({});
        return { style, content };
    }

    getRenderFunction() {
        return (node, currentTime, ctx) => {
            // Calculate current properties
            let currentNode = node;
            if (node.animation !== undefined) {
                currentNode = node.animation.get(currentTime);
                node.animation.reset();
            }
            if (currentNode.style.backgroundColor != undefined) {
                ctx.fillStyle = currentNode.style.backgroundColor.toString();
            }

            // Set border properties
            ctx.lineWidth = currentNode.style.border.width.intoPx();
            ctx.strokeStyle = currentNode.style.border.color.toString();

            // Draw the rectangle with a border
            roundRect(ctx, currentNode.pos.x, currentNode.pos.y, currentNode.style.width.intoPx(), currentNode.style.height.intoPx(), currentNode.style.border.radius.intoPx());
            ctx.fill();
            if (currentNode.style.border.width.intoPx() > 0) {
                ctx.stroke();
            }
        };
    }
}

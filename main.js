import { makeDraggable } from './utility/draggable.js';
import { makeResizable } from './utility/resizable.js';
import { maintainAspectRatio } from './utility/aspectRatio.js';
import { Node, createNode } from './core/nodeHandler.js';
import { Timeline } from './core/timeline.js';
import { Position, createPosition } from './core/other/position.js';
import { Dimension, createDimension } from './core/styling/dimension.js';
import { Color, createColor } from './core/styling/color.js';



let timeline = new Timeline(60);
timeline.createNode(createPosition(100, 100), 'DIV')
    .then(node => {
        node.setTime(0, 5);
        node.setAnimation((node, time) => { node.pos.x += time; });
        node.style.setWidthHeight(createDimension(100, 'px'), createDimension(100, 'px'));
        timeline.addNode(node);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error creating node:', error);
    });
setTimeout(() => {
    timeline.createNode(createPosition(1000, 100), 'DIV')
    .then(node => {
        node.setTime(0, 5);
        node.setAnimation((node, time) => { node.pos.x += time * 200; });
        timeline.addNode(node);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error creating node:', error);
    });
}, 1000);

timeline.createNode(createPosition(100, 100), 'SPAN')
    .then(node => {
        node.setTime(1, 6);
        node.setAnimation((node, time) => { node.pos.x += time * 100; });

        timeline.addNode(node);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error creating node:', error);
    });

timeline.createNode(createPosition(300, 500), 'P')
    .then(node => {
        node.setTime(1, 6);
        node.setAnimation((node, time) => { node.pos.x += time * 100; });

        timeline.addNode(node);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error creating node:', error);
    });


timeline.linkInput('#timelineInput');
timeline.linkKeyStroke('a', 'd');
timeline.linkPreview('.preview');
timeline.linkPlayPause(' ');

console.log("CHECK");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // rest of your code...
});


document.addEventListener('DOMContentLoaded', (event) => {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach((element) => {
        makeDraggable(element);
    });

    const resizableElements = document.querySelectorAll('.resizable');
    resizableElements.forEach((element) => {
        makeResizable(element);
    });

    const aspectRatioElements = document.querySelectorAll('.aspect-ratio-fixed');
    aspectRatioElements.forEach((element) => {
        maintainAspectRatio(element);

        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                maintainAspectRatio(element);
            }
        });

        ro.observe(element.parentElement);
    });
});



# Core

The core folder contains the files that handle the main logic and functionality of the project. Before we dive into the details of each file, let's first understand the basic concept of the project.

## Basic Concept

Imagine you are making a video with a video editor. You have a timeline where you can add different elements, such as text, images, videos, etc. You can also adjust the position, size, color, and other properties of these elements. You can also animate these elements to make them move, rotate, fade, etc. This is what our project does, but with a greater extensibility in mind.

In our project, we call these elements **nodes**. A node is an object that represents a graphical element on the screen. A node has a **position**, which tells where it is on the screen. A node also has a **type**, which tells what kind of element it is, such as "text", "image", "video", etc. A node also has **properties**, which tell more details about the element, such as its text, color, size, etc. A node also has a **start time** and an **end time**, which tell when it appears and disappears on the screen. A node also has an **animation**, which tells how it changes over time, such as moving, rotating, fading, etc.

But how do we create and manage these nodes? How do we know what properties and animations they have? How do we draw them on the screen? This is where **plugins** come in. A plugin is a piece of code that handles a specific type of node. A plugin tells us what properties and animations a node of that type has, and how to draw it on the screen. For example, we have a plugin that handles text nodes, which tells us what text, font, color, etc. a text node has, and how to draw it on the screen. We also have a plugin that handles image nodes, which tells us what image, size, etc. an image node has, and how to draw it on the screen. And so on.

We can have many plugins for different types of nodes. We can also add new plugins to support new types of nodes. For now, we only have a few plugins that support a few types of nodes, but we plan to add more in the future.

But how do we use these plugins? How do we add nodes to the timeline? How do we link the timeline to the screen? This is where the **timeline**, the **holder**, the **renderer**, and the **plugin handler** come in. These are the main components of our project that work together to create and display the nodes.

- The **timeline** is an object that manages a sequence of nodes and their timings. It has a method to add nodes to the timeline, and a method to set the current time of the timeline. It also has a method to render the nodes on the screen according to the current time.

- The **renderer** is an object that renders the nodes on a canvas. It has a method to clear the canvas, and a method to render a single node or an array of nodes on the canvas. It also has a method to set the resolution of the canvas.

- The **plugin handler** is an object that handles the plugins for the nodes. It has a method to register a plugin, and a method to unregister a plugin. It also has a method to get the properties or the render functions for a node type.

These are the main concepts of our project. Now, let's look at the files in the core folder and see how they implement these concepts.



The core folder contains the files that handle the main logic and functionality of the project. They are divided into the following sub-sections:

- **Main Files**: This sub-section contains the files nodeHandler.js, renderer.js, and timeline.js. These files are responsible for creating, rendering, and managing nodes and timelines.
- **Animation**: This sub-section contains the file animation.js, which defines the AnimationHandler class. This class is responsible for animating nodes based on their properties and the current time.
- **Other**: This sub-section contains the files holder.js, position.js, and resolution.js. These files are responsible for holding nodes in a container, defining the position of nodes, and setting the resolution of the canvas.
- **Plugin**: This sub-section contains the file pluginHandler.js, which defines the PluginHandler class. This class is responsible for registering, unregistering, and managing plugins that handle different types of nodes.
- **Styling**: This sub-section contains the files color.js, dimension.js, and styleObject.js, which define the Color, Dimension, and StyleObject classes. These classes are responsible for styling nodes based on their properties.

## Main Files

### nodeHandler.js

This file defines the Node class and the createNode function. A Node is an object that represents a graphical element on the screen. It has the following properties and methods:

- **initPos**: A Position object that stores the initial position of the node.
- **pos**: A Position object that stores the current position of the node.
- **type**: A string that indicates the type of the node, such as "text", "image", etc.
- **renderFunctionIndex**: A number that indicates the index of the render function that should be used to draw the node.
- **startTime**: A number that indicates the start time of the node in milliseconds.
- **endTime**: A number that indicates the end time of the node in milliseconds.
- **animation**: An AnimationHandler object that handles the animation of the node.
- **constructor(position, type, properties)**: A constructor that creates a new node with the given position, type, and properties.
- **setTime(start, end)**: A method that sets the start and end time of the node.
- **setInnerText(text)**: A method that sets the inner text of the node if it is a text node.
- **initAnimation()**: A method that initializes the animation property of the node.
- **setAnimation(animationFunction)**: A method that sets the animation function of the node's animation property.
- **setRenderFunctionIndex(index)**: A method that sets the render function index of the node.
- **clone()**: A method that returns a deep copy of the node.

The createNode function is a helper function that creates a new node with the given position and type.

#### Example

```javascript
// Create a new text node
let textNode = createNode(new Position(100, 100), 'text');

// Set the text and style properties
textNode.setInnerText('Hello, world!');
textNode.style = new StyleObject({
    color: new Color(255, 0, 0),
    fontSize: new Dimension(24, 'px')
});

// Set the start and end time
textNode.setTime(0, 5000);

// Set the animation function
textNode.setAnimation((node, currentTime) => {
    // Make the node move from left to right
    node.pos.x += currentTime;
});
```

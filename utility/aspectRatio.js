export function maintainAspectRatio(element) {
    const aspectRatio = element.dataset.aspectRatio.split(':');
    const ratio = aspectRatio[0]/aspectRatio[1];
    const parent = element.parentElement;
    const parentStyle = window.getComputedStyle(parent);
    const parentWidth = parseFloat(parentStyle.width);
    const parentHeight = parseFloat(parentStyle.height);
    const parentRatio = parentWidth/parentHeight;
    let newWidth, newHeight;
    
    if(parentRatio<ratio){
        newWidth=parentWidth-1;
        newHeight = newWidth*(1/ratio);
    } else if (parentRatio>ratio) {
        newHeight = parentHeight-1;
        newWidth = newHeight*ratio;
    } else {
        newWidth = parentWidth-1;
        newHeight = parentHeight-1;
    }

    // console.log("Ratio: ");
    // console.log(parentRatio);
    // console.log(ratio);
    // console.log("Dimensions: ");
    // console.log(newWidth);
    // console.log(newHeight);

    element.style.width = `${newWidth}px`;
    element.style.height = `${newHeight}px`;

    element.style.position = 'absolute';
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.transform = 'translate(-50%, -50%)';
}

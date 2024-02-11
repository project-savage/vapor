export function makeDraggable(element) {
    element.onmousedown = function (event) {
        if (event.target.classList.contains('resizer')) {
            return;
        }

        event.preventDefault();

        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;

        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        document.body.append(element);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            // element.style.boxShadow = '0 0 10px 3px lime';
            element.classList.add('being-dragged');
        }
        document.addEventListener('mousemove', onMouseMove);

        element.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
            // element.style.boxShadow = '';
            element.classList.remove('being-dragged');
        };
    };

    element.ondragstart = function () {
        return false;
    };
}

let container=document.getElementsByTagName("div");
console.log("element is : ",container);


// creating the configuration object or option object for swiper behaviour
let configurationObject={
    // this will tell weather the after last slide new slide from the start will come or not else the button will be disabled.
    loop: false,  

    // it will show one slide at a time
    slidesPerView: 1,

    // it will determine the space b/w each slide
    spaceBetween: 10,

    // center the current slide
    centeredSlides: true,

    // navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // for pagination dots
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
}

// now we need to create a instance of swiper
const swiper = new Swiper('.swiper',configurationObject);



// this global varible will tell which text box is currently selected
let selectedTextBox = null;

// activeDrag is a object that contains el, offsetX,    offsetY, pointerId - here el represent the element that is dragged , and offsetX and offsetY are for horizontal and veritcal distance , and pointerId is id of each pointer -- like mouse pointer , touch or even pen
let activeDrag = null;


// Handles moving a text box while dragging
// This event listener is responsible for moving a text box when the user drags the text box.
document.addEventListener('pointermove', function (event) {
    console.log("pointermove event fired if activeDrag has the element it will move that element else it will return nothing");

    // event.clientX and clientY tell the position where currently our cusor is.
    // console.log("event.clientX and clientY : ", event.clientX, event.clientY);


    // if no element is selected then don't move.
    if (!activeDrag){
        return 10;
    }

    // it will check drag should be done only acc to that pointer who started it .
    if (event.pointerId !== activeDrag.pointerId){
        return;
    } 

    // element is the current text box that is being selected or that user want to drag
    const element = activeDrag.el;
    console.log("the current box that is bing going to be dragged is : ",element); //the element is text-box class div

    // to get the parent element
    const parent = element.parentElement;
    console.log("parent element of our current dragable box is  : ", parent); // the parent element is image-container class div

    // getBoundingClientRect() is a DOM method that returns the size and position of an element relative to the viewport.
    const parentRect = parent.getBoundingClientRect(); // by this we will get parent element position relative to viewport.

    console.log("parent position object is : ",parentRect);
    console.log("event.clientX and clienty : ",event.clientX,event.clientY);


    // Calculate new position
    /**
     * event.clientX and event.clientY are the current pointer cordinates means where currently our mouse is present on the screen.
     * const parentRect = parent.getBoundingClientRect(); ---->  by this we will get parent element position relative to viewport.
     * when we subtract these two [event.clientX - parentRect.left] we get position inside the parent container but if it is -ve that means the position is outside the parent -- but current we don't know where inside the parent contianer so for this we will subtract the current element offset --(which record how much is the distance from orignal position of current element to the current cursor)
     ** offsetX and offsetY tells this how far is the cursor from current elmeent that is selected for drag
     * by subtracting the offsetX and Y at the last is imp so that current element don't jump means it feels like it dragged smoothly.
     */
    let x = event.clientX - parentRect.left - activeDrag.offsetX;
    let y = event.clientY - parentRect.top - activeDrag.offsetY;

    // Prevent dragging outside the parent container
    /**
     * element.offsetWidth and element.offsetHeight are built-in DOM properties — the browser automatically calculates them.

     * offsetWidth -> total width of the element including padding and border, but not margin.

     * offsetHeight -> total height of the element including padding and border, but not margin.

     * clientWidth -> inner width of an element, includes padding but excludes borders, margins
    
     * clientHeight → inner height of an element includes padding but excludes border, margins.
     */
    // maxX will determine how far we can drag element in the horizontal direction
    const maxX = parent.clientWidth - element.offsetWidth;

    // maxY will determine how far we can drag element in the vertical direction.
    const maxY = parent.clientHeight - element.offsetHeight;


    // if x is in -ve that means -- user want to drag the current text box out side the parent container in horizontal direction..
    if (x < 0) x = 0;

    // if y is in -ve that means -- user want to drag the current text box out side the parent container in vertical direction..
    if (y < 0) y = 0;

    // maximum allowed space to drag in horizontal
    if (x > maxX) x = maxX;

    // maximum allowed space to drag in veritical..
    if (y > maxY) y = maxY;

    // applying the new position
    element.style.left = x + 'px';
    element.style.top = y + 'px';
});

// this global event listener will end the dragging when user relese the mouse button from pressing else the selected element will move with pointer.
document.addEventListener('pointerup', function (event) {

    if (!activeDrag) {
        return;
    }

    // this will ensure only the pointer that started the drag will only stop that.
    if (event.pointerId !== activeDrag.pointerId) {
        return;
    };

    try {
        // this is stop the pointer event.
        activeDrag.el.releasePointerCapture(event.pointerId);
    } catch (error) {
        console.log("error in ending the drag");
    }

    // this tells that -- there is no current element that is being dragged.
    activeDrag = null;
});


// Makes a given element draggable with the pointer
function makeDraggable(element) {

    // setting position absolute if not already -- so that left and top offset work fine
    element.style.position = element.style.position || 'absolute';

    // adding the data-editing boolean flag. so that editing won't affect by dragging and vice-versa..
    if (typeof element.dataset.editing === 'undefined') {
        element.dataset.editing = 'false';
    }

    // preventing unwanted scrolling/zooming gestures on touch devices
    element.style.touchAction = 'none';

    // this event will fire when user clicks the mouse button or touch the element.
    element.addEventListener('pointerdown', function (event) {

        // Only allow primary button (left mouse or primary touch) it will ignore the right click.
        if (event.button && event.button !== 0) {
            return;
        }

        // dragging is not possible when user is editing at the same time.
        if (element.dataset.editing === 'true') {
            return;
        }

        // storing this element into the selectedTextBox for later styling.
        selectedTextBox = element;

        // storing the info in activeDrag object.
        activeDrag = {
            el: element,
            offsetX: event.clientX - element.getBoundingClientRect().left,
            offsetY: event.clientY - element.getBoundingClientRect().top,
            pointerId: event.pointerId
        };

        try {
            element.setPointerCapture(event.pointerId);
        } catch (error) {
            console.log("error occured in makeDraggable function", error.message);
            // ignore if not supported.
        }

        // Prevent text selection or Swiper slide move when dragging text box
        event.preventDefault();
    });
}



// enabling the sling click to select and double-click to edit  and blur event to finish editing
function enableEditing(element) {

    // by default text is not editable.
    element.contentEditable = 'false';
    element.dataset.editing = element.dataset.editing || 'false';

    // single click the current text box will be selected on which user does click
    element.addEventListener('click', function (event) {
        selectedTextBox = element;
        event.stopPropagation();
    });

    // when user do double click it will start the edit
    element.addEventListener('dblclick', function (event) {
        element.dataset.editing = 'true';
        element.contentEditable = 'true';
        element.focus();

        // Auto-select text for quick replacement --- optional
        try {
            const range = document.createRange();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } catch (error) {
            // Ignore if selection fails
        }

        event.stopPropagation();
    });

    // disable editing if user click outside the box.
    element.addEventListener('blur', function () {
        element.dataset.editing = 'false';
        element.contentEditable = 'false';
    });

    // using escape key to exit the editing mode.
    element.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            element.blur();
        }
    });
}

/**
 * this global event listener is imp to disbale the editing if the user click outside the text box -- if we don't use it and rely on blur event in that case if user click out side the text box won't close the editing -- it will be helpful only when user edit one text box and then double click on another text box in this case the focus is changed so blur event will fire and editing for first text box will be closed..
 */

// to close the editing when the user click outside the text-box..
document.addEventListener('click', function (event) {
    if (!event.target.classList.contains('text-box')) {
        if (selectedTextBox) {
            selectedTextBox.blur(); // this will trigger the blur handler
        }
    }
});




// function for re-sizing box/container.
function addResizeHandle(element) {

    // creating a div on which our logic for re-size will be attached.
    const handle = document.createElement('div');
    handle.className = 'resize-handle';
    element.appendChild(handle);

    handle.addEventListener('pointerdown', function (event) {
        event.stopPropagation();

        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = element.offsetWidth;
        const startHeight = element.offsetHeight;
        const startFontSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minFontSize = 12;

        const minWidth = startWidth * (minFontSize / startFontSize);
        const minHeight = startHeight * (minFontSize / startFontSize);

        function onMove(e) {
            // calculate new dimensions
            let newWidth = Math.max(minWidth, startWidth + (e.clientX - startX)); // e.clientX-startX  will gives us the horizantal distance that pointer cover from the start of drag.
            let newHeight = Math.max(minHeight, startHeight + (e.clientY - startY));

            element.style.width = newWidth + 'px';
            element.style.height = newHeight + 'px';

            //  font size change acc to width
            const scale = newWidth / startWidth;
            element.style.fontSize = Math.max(minFontSize, startFontSize * scale) + 'px';
        }

        function onUp() {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
        }

        // using omMove and onUp function as a handelr for pointermove and pointerup events.
        document.addEventListener('pointermove', onMove);

        document.addEventListener('pointerup', onUp);
    });
}






// changing font-family , font-size , and font-color for the selected box.
function enableStyling() {
    const fontFamilySelect = document.getElementById('font-family');
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', function () {
            if (selectedTextBox) {
                selectedTextBox.style.fontFamily = this.value;
            }
        });
    }

    const fontColorInput = document.getElementById('font-color');
    if (fontColorInput) {
        fontColorInput.addEventListener('input', function () {
            if (selectedTextBox) {
                selectedTextBox.style.color = this.value;
            }
        });
    }

    const fontSizeInput = document.getElementById('font-size');
    if (fontSizeInput) {
        fontSizeInput.addEventListener('input', function () {
            if (selectedTextBox) {
                selectedTextBox.style.fontSize = this.value + 'px';
                this.value = '';
            }
        });
    }
}




// creating the new text box when user click the add new text button.
function addNewTextBox() {

    const activeSlide = document.querySelector('.swiper-slide-active .image-container');

    if (!activeSlide) return;

    const newText = document.createElement('div');
    newText.className = 'text-box';
    newText.innerText = 'New Text';

    // setting the default position
    newText.style.left = '50%';
    newText.style.top = '10%';

    // adding the text on the current slide.
    activeSlide.appendChild(newText);

    // applying the drag,edit and resize functionality for the new text also.
    makeDraggable(newText);
    enableEditing(newText);
    addResizeHandle(newText);

    // Set as currently selected for toolbar
    selectedTextBox = newText;
}



// this function is imp so that our drag , edit and resize work for default text also else these functionality will work only for new text..
function setupTextBoxes() {
    const boxes = document.querySelectorAll('.text-box');
    for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i].style.left) {
            boxes[i].style.left = boxes[i].offsetLeft + 'px';
        }
        if (!boxes[i].style.top) {
            boxes[i].style.top = boxes[i].offsetTop + 'px';
        }

        makeDraggable(boxes[i]);
        enableEditing(boxes[i]);
        addResizeHandle(boxes[i]);
    }
}

// Start when DOM is ready
enableStyling();
setupTextBoxes();
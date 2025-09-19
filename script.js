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

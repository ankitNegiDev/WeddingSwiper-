# project Todos

* create a simple div/card -- and put three images inside it and the size of images is 9:16 -- and inside this div - these three images will be displayed one by one -- like a swiper when user click then the image is changed --
* now the swaping should be done -- using the navigation button and swapping gesture - i guess it is for mobile phone -
* we need to put default text on each image.
* (1) now the text that we add on each iamge is dragable -- means user can move the text any where inside the boundry of image/div
* (2) try can we change the size of selected text -- like we see in the paint or any in case of image to increase/decrease its size..
* (3) now the user should be able to change the font-family, font-size , font-color, of the selected text
* (4) now there should be an option to create/add new text -- each time the user click it should create a new input box for text keep in mind only on the current --- selected image like image1,image2,image3 not on all the iamges.. and when user add the new text it also have same text feature like dragable , user can re-size, change the font-family , font-size etc. keep in mind that -- when the user click on add text first time and added some text and after that user click again on add text second time -- then our both text should be work independently -- means suppose on text1 we change the font size to 16 and on text 2 we change the font size to 40 px -- so it should be visible clearly in both that user can control both independently.

* **Note** *we can't use any other library framework other then swiper.js* ***we must use html,css, and js***

---

## How i am approching this

* first we will create a html file for page skleton, a css file for style (external), and a js file for main logic.

* ### (1) Handling the swiper

  * so inorder to setup a swiper first we need to install swiper.js
  * now curretnly we are using the cdn links because its easy for small project but if we want to install then first we need to create a `package.json` file using

    ```bash
    npm init -y
    ```

  * then we can install the swiper using .

    ```bash
    npm install swiper
    ```

  * now to use the cdn headover to this website `https://swiperjs.com/get-started`

    ```html

    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"
    />

    <script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"></script>
    ```

  * now to create a swiper we need the basic minimal setup

    ```html
    <!-- Slider main container -->
    <div class="swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        ...
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
    </div>
    ```

  * (1) `<div class="swiper">` - this is the main container that swiper uses a kind of root element where js logic will be attached.
  * (2) `<div class="swiper-wrapper">` - this div will contain all the slides that we add in our case we had three images. and the sliding logic will be attached on this wrapper.
  * (3) `<div class="swiper-slide">` - this will contain each slide , **Swiper automatically calculates width, spacing, and active index for each slide.**
  * (4) `<div class="swiper-button-next"> & <div class="swiper-button-prev">` - these are next and previous button , swiper will automatically attached the click event to these classes.
  * (5) `<div class="swiper-pagination">` - this is for the dots that appear at the bottom a kind of ui enhancer to know the user that user is on which current slide..

  * now once the html css setup is done - we need to create the swiper instance in our script.js file.
  * to create swiper instance we use **Swiper class constructor** like this

    ```js
    const swiper = new Swiper('.swiper', { loop: true , oneWayMovement: false});
    ```

  * here when we do new Swiper() internall it call the constructor of Swiper class and this contructor function takes two argument one is the **swiperContainer* and another is **parameters - object**.
  * this **swiperContainer** argument will mainly carry the root container class or id or any thing that select the root element.
  * this **parameters object** or **Configuration object/option object** is a simple object that helps us to define how the swiper will behave by using the swiper parameter. *each property that is written inside this object is called swiper parameter* and for more detail headover here `https://swiperjs.com/swiper-api#parameters`
  * there are different parameter that we can pass like `loop, autoplay,  oneWayMovement etc`. its optional to pass this object if we din't pass this object the swiper will use the default values.

---

* ### (2) Text property

  * now we need to make text (1) dragable , (2) editable , (3) resizable , (4) and styled independently.(font-size, font-family , color etc)
  * now all these text property will work same for either it is the default text or the new text that will come after when user click on new text. the text property will behave same for both.
  * so what we can do is -- we will pre-pare seprate function for each task so that we had a modular code.

---

* task for tommarow -- firs create function for drag, eidt , resize, and for style --- then create a tool bar kind of thing -- so that it appear on page like for style -- to change font-family (a kind of option bar) , forn-size, color etc..
* keep in mind -- on each slide -- we need to do indepent of other slide -- like whatever is done on slide 1 will not affect the slide 2 or any other slide-
* and for new text and previous text both also be work independently.

---

* now first we need to add a div that will hold all functionality like add new text , change font-family, font-color , font-size etc

---

* ### (a) Drag setup

  * now for drag we will use **pointermove event listener**
    * *The pointermove event is fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action. It's very similar to the mousemove event, but with more features.*
    * *These events happen whether or not any pointer buttons are pressed. They can fire at a very high rate, depends on how fast the user moves the pointer, how fast the machine is, what other tasks and processes are happening, etc.*

  * now we have a global handeler for the drag

    ```js
    document.addEventListener('pointermove', function (event) {

        if (!activeDrag) return;
        if (event.pointerId !== activeDrag.pointerId) return; // Ignore other pointers

        const element = activeDrag.el;
        const parent = element.parentElement;
        const parentRect = parent.getBoundingClientRect();

        // Calculate new position
        let x = event.clientX - parentRect.left - activeDrag.offsetX;
        let y = event.clientY - parentRect.top - activeDrag.offsetY;

        // Prevent dragging outside the parent container
        const maxX = parent.clientWidth - element.offsetWidth;
        const maxY = parent.clientHeight - element.offsetHeight;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;

        // Apply new position
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    });
    ```

  * this event listener is responsible for moving a text box when user drag it.
  * this **pointermove** event listen globally for any pointer movement either it is pen , mouse or pen. and it will fire when the pointer moves..
  * when to stop the drag that will be done by another global event which is **pointerup** event this event will fire when the user relese the mouse button..
  * now how these event knows which text box need to be drag then for that we had a function **makeDraggable** this function will make a text box dragable.
  * but keep in mind this **makeDraggable** function should run before the global event listener  *pointermove* because if we don't run this function on the page load or dom load then our global event listener *pointermove* would not know which element need to be draged...
  * this is what we need to do for drag...

---

* ### (b) edit setup

  * in edit setup -- we will use single click to select the text-box , double-click to edit the text-box and blur event to change the focus.And we also added a keydown event for escape key to cancel the editing..
  * now the problem is - when user type in text-box1 and then click on outside the box then edit on text-box1 is not cancelling --- so we can't rely on blurr event for this - because blurr event will be helpful only when user type in text-box 1 and then double click on another text-box in that case the edit will be canceled automatically in text-box1 because foucs has changed and blurr event is fired..
  * so to cancel the edit when user click outside the text-box we need to attach a global event listener (click) so that when user click outside the text box it cancel the edit.

    ```js
    document.addEventListener('click', function (event) {
        if (!event.target.classList.contains('text-box')) {
            if (selectedTextBox) {
                selectedTextBox.blur(); // this will trigger the blur handler
            }
        }
    });
    ```

  * now when the user click outsie the text-box the edit will be canceled.
  * here the if condition simply means *if event.target has text-box class then do nothing else check if selectedBox is not undefined -- if it has some value then trigger the blurr event handeler -- and selectedTextBox will have value when user edit text-box 1 and then click add new text and then start editing it*

---

* ### (c) Resize handeler

  * this function is responsible for changing the size of the text-box along with the font.

---

* ### (d) Style

  * this function is repsonsible for changing the font-size , font-color and font-family

---

* ### (e) adding the new text-box

  * this function will add the new text-box including that it has the functionality access like drag , style , and re-size.

---

* at last we are creating a function **setupTextBoxes** this function ensures that our functionality (drag,edit,style,resize) works for all text-boxes not only for those which are created by user-- if we don't use this function then all these functionality will not work for default text

---

* **Issue** *when i click on add new text -- a new text is added -- fine -- when i click on resize for the first time -- it works but after doing re-size once and user do some edit then there is no option for re-size -- or when the new text is added -- and when i do dbl click to edit it and user edit the text then also -- there is no option for re-size -- it happens with both -- default text and new text*

```html
 <div class="text-box" contenteditable="true">
       Default text
       <div class="resize-handle"></div>  
   </div>
```

```html
 <div class="text-box" contenteditable="true">
       New edited text  <!-- Browser rewrites content -->
       <!-- resize-handle div gets REMOVED! its because the contentEditable is mark as true so it iwll remove everything even the dom element also.-->
   </div>
```

* so the reason why it is happening because when user do dbl click to edit the text box this resize-handel div on which we attach the logic is also removed -- and solution is we need to check that this div exist even after the editing---
* **When contentEditable is active then the browser's editing engine:**
  * Rewrites the innerHTML to manage text nodes
  * Removes non-text elements it doesn't recognize as part of the editable content
  * Recreates the DOM structure for optimal text editing

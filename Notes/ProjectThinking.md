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

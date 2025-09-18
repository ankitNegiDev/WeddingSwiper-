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


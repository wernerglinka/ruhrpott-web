/* global window, document */

/**
 * Manage slides
 * @params {*} none
 * @return {function} initializes a simple slide sector
 */
 const slides = (function() {
  const init = () => {
    const allSlideTriggers = document.querySelectorAll(".js-slide-trigger");

    if(allSlideTriggers) {
      allSlideTriggers.forEach((slideTrigger) => {
        slideTrigger.addEventListener("click", (e) => {
          e.preventDefault();
          const thisSlideTrigger = e.target;

          const slideId = e.target.dataset.slideId;
          
          // Remove active class from all slide triggers
          allSlideTriggers.forEach((slideTrigger) => {
            slideTrigger.classList.remove("active");
          });
          // add active class to this slide trigger
          thisSlideTrigger.classList.add("active");
          
          // Hide all slides
          const allSlides = document.querySelectorAll(".js-slide");
          allSlides.forEach((slide) => {
            slide.classList.remove("initial");
            slide.classList.remove("active");
          });
          // Show this slide
          const thisSlide = document.querySelector(slideId);
          thisSlide.classList.add("active");
        });
      });
    }
  };

  return { init };
})();

export default slides;

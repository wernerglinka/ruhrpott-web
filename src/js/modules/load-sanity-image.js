/* global window, document, IntersectionObserver, ResizeObserver */

import debounce from "../utilities/debounce";

const loadSanityImage = (function loadResponsiveImage() {
  // images are loaded when they are visible in the viewport and updated when
  // the viewport width changes.

  const loadImage = (entries, observer) => {
    // During initial page load the entries array contains all watched objects. The
    // isIntersecting property for the individual object indicates visibility.
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const thisWrapper = entry.target;

        // get the dimensions of the image wrapper and the display pixel density
        const imageWidth = thisWrapper.clientWidth;
        const pixelRatio = window.devicePixelRatio || 1.0;

        // assemble url parameters for the sanity image url
        const imageParams = `?w=${100 * Math.round((imageWidth * pixelRatio) / 100)}&auto=format`;

        // find the high res image in the wrapper and get the data attributes...
        const thisImage = thisWrapper.querySelector(".high-res");
        const thisImageSource = thisImage.dataset.source;
        // ...so we can assemble and replace the image src url
        thisImage.src = `${thisImageSource}${imageParams}`;

        // take this image of the observe list
        observer.unobserve(thisWrapper);

        // once the hi-res image has been loaded, add done class to wrapper
        // which will fade-in the hi-res image and fade-out the low-res image
        thisImage.onload = () => {
          thisWrapper.classList.add("done");
        };
      }
    }
  };

  const updateImage = debounce(function() {
    // images are only loaded when they are visible
    const observer = new IntersectionObserver(loadImage);

    // loop over all image wrappers and add to intersection observer
    const allHiResImageWrappers = document.querySelectorAll(".js-sanity-image-wrapper");
    for (const imageWrapper of allHiResImageWrappers) {
      observer.observe(imageWrapper);
    }
  }, 500);

  // resize and intersectionObserver are persistent window methods, ergo they fire after SWUP loads
  const init = () => {
    // images will update on page load and after a resize
    const resizeObserver = new ResizeObserver(updateImage);
    const resizeElement = document.body;
    resizeObserver.observe(resizeElement);
  };

  return { init };
})();

export default loadSanityImage;

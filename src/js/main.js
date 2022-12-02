/* global window, document, localStorage */

//use barba.js for SPA like page transitions
import barba from "@barba/core";
import barbaCSS from "@barba/css";
// Note that when using BarbaCSS the leave() and enter() hook are not executed.
// Only the before- and after- hooks are executed.
barba.use(barbaCSS);

import navigation from "./modules/navigation";
import updatePageNameAttribute from "./modules/update-page-location";
import loadSanityImage from "./modules/load-sanity-image";
import slides from "./modules/slides";
import logos from "./modules/logos";
import citiesListIsotope from "./modules/cities-list-isotope";
import modalVideo from "./modules/modal-video";

function initPage() {
  // load the youTube video JS api
  // https://developers.google.com/youtube/iframe_api_reference
  // This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // use a promise to manage the async onYouTubeIframeAPIReady function
  window.videoAPIReady = new Promise(resolve => {
    // upon YouTube API Ready we resolve the promise
    // we can then initialize video players in other modules
    // e.g. videoAPIReady.then(() => {})
    window.onYouTubeIframeAPIReady = () => resolve();
  });

  barba.init({
    transitions: [
      {
        // "home" is used in the transition class attribute.
        name: "home",
        once() {},
      },
      {
        // "fade" is used in the transition class attribute.
        name: "fade",
        to: {
          namespace: ["barbaPage"],
        },
        beforeLeave(data) {},
        leave() {},
        afterLeave(data) {
          {
            updatePageNameAttribute();
            if (document.querySelector(".grid")) citiesListIsotope.init();
          }
        },
        enter() {},
        afterEnter(data) {
          {
            if (document.querySelector(".js-slide-trigger")) slides.init();
            if (document.querySelector(".js-logos-list") )logos.init();
            if (document.querySelector(".grid")) citiesListIsotope.init();
            if (document.querySelector(".js-modal-video")) modalVideo.init();
          }
        }
      },
    ],
  });
  
  navigation.init();
  loadSanityImage.init();
  if (document.querySelector(".js-slide-trigger")) slides.init();
  if (document.querySelector(".js-logos-list") )logos.init();
  if (document.querySelector(".grid")) citiesListIsotope.init();
  if (document.querySelector(".js-modal-video")) modalVideo.init();

}

window.addEventListener("load", function() {
  initPage();
});

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
import loadYouTubeAPI from "./modules/load-youtube-api";
import modalVideo from "./modules/modal-video";

function initPage() {
  

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
            if (document.querySelector(".js-modal-video")) {
              loadYouTubeAPI.init();
              modalVideo.init();
            };
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
  if (document.querySelector(".js-modal-video")) {
    loadYouTubeAPI.init();
    modalVideo.init();
  };

}

window.addEventListener("load", function() {
  initPage();
});

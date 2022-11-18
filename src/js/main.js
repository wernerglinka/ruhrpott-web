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
          updatePageNameAttribute();
        },
        enter() {},
        afterEnter(data) {
          slides.init();
        }
      },
    ],
  });
  
  navigation.init();
  loadSanityImage.init();
  slides.init();
  logos.init();
  
}

window.addEventListener("load", function() {
  initPage();
});

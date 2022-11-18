/* global window, document */

/**
 * Manage logo display
 * If logos list fits on viewwport width its static, if not logos will rotate automatically
 * @params {*} none
 * @return {function} initializes a logo display
 */
 const logosLists = (function() {
  const init = () => {
    const allLogosLists = document.querySelectorAll(".js-logos-list");
    const viewportWidth = window.innerWidth;
    allLogosLists.forEach(logosList => {
      if (logosList.offsetWidth > viewportWidth) {
        logosList.parentElement.classList.add("play");
      } else {
        logosList.parentElement.classList.remove("play");
      }
    });
  };

  return { init };
})();

export default logosLists;

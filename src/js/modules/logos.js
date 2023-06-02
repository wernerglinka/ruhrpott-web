/* global window, document */

/**
 * Manage logo display
 * If logos list fits on viewport width its static, if not logos will rotate automatically
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

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        const allLogosLists = document.querySelectorAll(".js-logos-list");
        const viewportWidth = window.innerWidth;
        allLogosLists.forEach(logosList => {
          if (logosList.offsetWidth > viewportWidth) {
            logosList.parentElement.classList.add("play");
          } else {
            logosList.parentElement.classList.remove("play");
          }
        });
      });
    });
    
    resizeObserver.observe(document.body);
  };

  return { init };
})();

export default logosLists;

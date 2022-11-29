/* global window, document */

import Isotope from "isotope-layout";

/**
 * Manage filterred rich list display
 * 
 * @params {*} none
 * @return {function} initializes a filterred rich list display
 */
const listFilters = (function() {

  const init = () => {
    const allListFilters = document.querySelectorAll(".js-list-filters");
    
    allListFilters.forEach(listFilters => {
      // get all filter buttons of this filter
      const filterButtons = listFilters.querySelectorAll("li");

      filterButtons.forEach(filterButton => {
        // attach click event to each filter button
        filterButton.addEventListener("click", (e) => {
          // reset active state for all filter buttons
          filterButtons.forEach(filterButton => {
            filterButton.classList.remove("active");
          });
          // set active state for this filter button
          e.target.classList.add("active");
        });
      });
    });

    // init Isotope
    const iso = new Isotope( '.grid', {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });

    // bind filter button click
    const filtersElem = document.querySelector('.js-list-filters');
    filtersElem.addEventListener( 'click', function( event ) {
      const filterValue = event.target.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });
    });
  };

  return { init };
})();

export default listFilters;

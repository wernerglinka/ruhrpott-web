/**
 * Update the page location 
 * @params {*} none
 * @return {function} Updates the body pageName attribute
 */
const updatePageNameAttribute = function() {
  "use strict"
  // use a body attribute "pageName" to style nav items, etc.

  // get the path from the window.location object and delete leading and trailing "/"
  let loc = window.location.pathname.replace(/(^\/)|(\/$)/g, "").replace("/", "-");
  loc = loc ? loc : "home";
  document.body.setAttribute("pageName", loc); 
};

export default updatePageNameAttribute;
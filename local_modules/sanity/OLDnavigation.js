require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const {buildImageUrl} = require('@sanity/asset-utils');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

// renderers
const renderBlock = require('./block-renderers');

/**
 * @typedef Options
 * @property {String} key
 */

/** @type {Options} */
const defaults = {
  projectId: '',             // required
  dataset: 'production',  
  apiVersion: '2022-10-19',  // use a UTC date string
  token: '',                 // required
  useCdn: false,
};

/**
 * Normalize plugin options
 * @param {Options} [options]
 * @returns {Object}
 */
function normalizeOptions(options) {
  return Object.assign({}, defaults, options);
}

/**
 * A Metalsmith plugin to fetch content from Sanity.io
 *
 * @param {Options} options
 * @returns {import('metalsmith').Plugin}
 */
function initMetalsmithSourceSanity(options) {
  options = normalizeOptions(options)

  return function metalsmithSourceSanity(files, metalsmith, done) {
    const debug = metalsmith.debug('metalsmith-source-sanity')
    debug('Running with options: %O', options)

    // initialize Sanity client
    const client = sanityClient(options);

    // custom serializers for sanity blocks
    // read more: https://www.sanity.io/docs/presenting-block-text
    const serializers = getSerializers(client);

    // fetch all blogposts from Sanity
    // get rawPosts in Portable Text format
    client.fetch(queries.nav).then(rawNav => {

      const nav= {
        menu: []
      };
      
      rawNav.sections.map(section => {
        // by convention, the first item in the object is a link if the section has no submenu
        // and just a span if it has  a submenu
        if (!section.hasChildren)  {
          nav.menu.push({
            title: section.title,
            url: section.target.slug.current,
            class: section.linkClass,
          });
        } else {
          nav.menu.push({
            title: section.title,
            url: '',
            class: section.linkClass,
            submenu: []
          });
          // loop oveer the links in the submenu
          section.links.map(link => {
            nav.menu[nav.menu.length-1].submenu.push({
              title: link.title,
              url: link.target.slug.current,
              class: link.linkClass,
            });
          });
        }
      });

      //console.log(JSON.stringify(nav, null, 4));

      done()
    }).catch(err => console.error(err));
  }
}

module.exports =  initMetalsmithSourceSanity;
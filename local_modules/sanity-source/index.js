require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

const merge = require('deepmerge');



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
function initSanitySource(options) {
  options = normalizeOptions(options);

  return async function metalsmithSourceSanity(files, metalsmith, done) {
    const debug = metalsmith.debug('metalsmith-source-sanity');
    debug('Running with options: %O', options);

    // initialize Sanity client
    const client = sanityClient(options);

    /*
     * Fetch all content types from Sanity
     */
    const rawContentTypes = client.fetch(queries.allPages);
    let contentTypes = await rawContentTypes;

    const iterate = obj => {
      Object.keys(obj).forEach(key => {
  
      console.log(`key: ${key}, value: ${obj[key]}`);

      if(key === "blogContent"){
        obj[key] = BlocksToMarkdown(obj[key], {
          serializers: getSerializers(client),
          projectId: options.projectId,
          dataset: options.dataset,
        });
      }
  
      if (typeof obj[key] === 'object' && obj[key] !== null) {
              iterate(obj[key])
          }
      })
    };

    iterate(contentTypes[0]);

   



    console.log(JSON.stringify(contentTypes, null, 4));
    //console.log(contentTypes);
    done();
  }
}

module.exports =  initSanitySource;
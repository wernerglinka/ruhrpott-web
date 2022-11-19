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

    // function to normalize Sanity json to markdown and resolve references
    const iterate = obj => {
      Object.keys(obj).forEach(key => {
  
        // transform Portable Text to Markdown
        if(key === "portableTextBody"){
          obj[key] = BlocksToMarkdown(obj[key], {
            serializers: getSerializers(client),
            projectId: options.projectId,
            dataset: options.dataset,
          });
        }

        // transform image reference to image url
        if(key == "asset" && obj[key]._ref.startsWith("image-")){
          const imageBuilder = imageUrl(client);
          const image = imageBuilder.image(obj[key]);
          obj["imageURL"] = image.url();
        }
    
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          iterate(obj[key])
        }
      })
    };

    /*
     * Fetch all content types from Sanity
     */
    const rawContentTypes = client.fetch(queries.allPages);
    let contentTypes = await rawContentTypes;

    // normalize Sanity json to markdown and resolve references for each page
    contentTypes.forEach(contentType => {
      iterate(contentType);

      if ( contentType.isPage ) {
        // add to page Metalsmith need the contents to be there
        contentType.contents = Buffer.from('');
        contentType.mode = '0644';
        contentType.stats = {};

        // add page to files object
        const fileKey = contentType.slug.current + '.md';
        files[fileKey] = contentType
      } 
    });



    //console.log(JSON.stringify(contentTypes, null, 4));
    //console.log(contentTypes);
    done();
  }
}

module.exports =  initSanitySource;
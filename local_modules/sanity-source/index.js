
require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');
// node-json-db for caching Sanity content in development
const { JsonDB, Config } = require('node-json-db');

/**
 * @typedef Options
 * @property {String} key
 */

/** @type {Options} */
const defaults = {
  projectId: '',             // required
  dataset: 'production',  
  apiVersion: '2022-10-19',  // use a UTC date string
  token: '',                 
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
 * @param {Options} option
 * @returns {import('metalsmith').Plugin}
 */
function initSanitySource(options) {
  options = normalizeOptions(options);

  // Retrieve environmental variables.
  const dev = process.env.NODE_ENV === 'development';
  
  // create a new content cache
  const cacheFileName = `sanityContent`;
  const contentCache = new JsonDB(new Config(cacheFileName, true, true, '/'));

  return async function metalsmithSourceSanity(files, metalsmith, done) {
    const debug = metalsmith.debug('metalsmith-source-sanity');
    debug('Running with options: %O', options);

    // initialize Sanity client
    const client = sanityClient(options);

    // function to normalize Sanity json to markdown and resolve references
    const iterate = obj => {
      Object.keys(obj).forEach(key => {
  
        // transform Portable Text to Markdown
        if(key === "portableTextBody" || key === "blogContent") {
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

    let contentTypes;

    //const startTime = new Date().getTime();

    // Try using content cache during development. In production always fetch from Sanity.
    // NOTE: To delete the cache, delete the file "sanity<projectID>.json"in the project root.
    if (dev) {
      // try if the content cache is available
      try {
        contentTypes = await contentCache.getData('/sanityData');
      } catch(error) {
        // if no content cache then fetch all content types from Sanity
        const rawContentTypes = client.fetch(queries.allContent);
        contentTypes = await rawContentTypes;

        // and store in content cache
        await contentCache.push("/sanityData",contentTypes);
      };
    } else {
      // fetch all content types from Sanity
      const rawContentTypes = client.fetch(queries.allContent);
      contentTypes = await rawContentTypes;
    };
    
    //const endTime = new Date().getTime();
    //const duration = endTime - startTime;

    //console.log(duration);

    const data = {};

    // normalize Sanity json to markdown and resolve references for each page
    contentTypes.forEach(contentType => {
      iterate(contentType);

      if ( contentType.isPage ) {
        // add to page, Metalsmith need the contents to be there
        contentType.contents = Buffer.from('');
        contentType.mode = '0644';
        contentType.stats = {};

        // add page to files object
        const fileKey = `${contentType.slug.current}.md`;
        files[fileKey] = contentType;

        //console.log(JSON.stringify(files,null, 4));

      } else {
        // add to metadata

        // if a contentType._type array is not already in data, add it
        if ( !data[contentType._type] ) {
          data[contentType._type] = [];
          // add this contentType of type contentType._type to the array
          data[contentType._type].push(contentType);
        } else {
          // if an contentType._type array is already in data, push the contentType object to it
          data[contentType._type].push(contentType);
        }
      }
    });

    // merge data object with existing metadata
    const metadata = metalsmith.metadata();
    metadata['data'] = data;
    metalsmith.metadata(metadata);
    
    done();
  }
}

module.exports =  initSanitySource;
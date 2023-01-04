require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const queries = require('./queries');
const { JsonDB, Config } = require('node-json-db'); // node-json-db for caching Sanity content in development
const iterate = require('./iterate');

/**
 * @typedef Options
 * @property {String} key
 */

/** @type {Options} */
const defaults = {
  projectId: '',
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

    let contentTypes;

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
      contentTypes = await client.fetch(queries.allContent);
    };

    const data = {};
    contentTypes.forEach((contentType) => {
      // transform Sanity portable text blocks to markdown and resolve references
      iterate(contentType, client, options);

      if ( contentType.isPage ) {

        //console.log(JSON.stringify(contentType,null, 4));

        // Metalsmith needs contents otherwise it will skip the file
        contentType.contents = Buffer.from('');
        contentType.mode = '0644';
        contentType.stats = {};

        // add page to files object
        const fileKey = `${contentType.slug.current}.md`;
        // add all properties of contentType to files[fileKey]
        files[fileKey] = contentType;

      } else {
        // if content type is not a page then it is a data file, add to metadata
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
require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

const merge = require('deepmerge');

const getHomePage = require('./get-home');
const getPosts = require('./get-posts');
const getPages = require('./get-pages');
const getNavigation = require('./get-nav');
const getCities = require('./get-cities');
const getFootballClubs = require('./get-football-clubs');

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
  options = normalizeOptions(options);

  return async function metalsmithSourceSanity(files, metalsmith, done) {
    const debug = metalsmith.debug('metalsmith-source-sanity');
    debug('Running with options: %O', options);

    // initialize Sanity client
    const client = sanityClient(options);

    /*
     * Fetch all pages from Sanity
     */
    // get home page from Sanity
    const pendingHomePage = getHomePage(client, files);
    const homePage = await pendingHomePage;
    // merge home page into files object
    Object.assign(files, homePage);
    debug('Sanity pages: %O', homePage);
    
    // get all posts from Sanity
    const pendingPosts = getPosts(client, files);
    const allPosts = await pendingPosts;
    // merge posts into files object
    Object.assign(files, allPosts);
    debug('Sanity posts: %O', allPosts);

    // get all pages from Sanity
    const pendingPages = getPages(client, files);
    const allPages = await pendingPages;
    // merge pages into files object
    Object.assign(files, allPages);
    debug('Sanity pages: %O', allPages);

    /*
     * Fetch metadata from Sanity
     */
    const metadata = metalsmith.metadata();

    // get the cities from Sanity
    const pendingCities = getCities(client, files);
    const cities = await pendingCities;
    // merge cities data into metadata object
    metadata.data = metadata.data ? merge(metadata.data, cities) : cities;
    debug('Sanity cities: %O', cities);

    // get the football clubs from Sanity
    const pendingClubs = getFootballClubs(client, files);
    const clubs = await pendingClubs;
    // merge football clubs data into metadata object
    metadata.data = metadata.data ? merge(metadata.data, clubs) : clubs;
    debug('Sanity football clubs: %O', clubs);


    //console.log(JSON.stringify(cities, null, 4));
    //console.log(clubs);
    done();
  }
}

module.exports =  initMetalsmithSourceSanity;
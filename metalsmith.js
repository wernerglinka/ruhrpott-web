/* eslint-disable import/no-extraneous-dependencies */

const Metalsmith = require("metalsmith");
const markdown = require("@metalsmith/markdown");
const layouts = require("@metalsmith/layouts");
const collections = require("@metalsmith/collections");
const esbuild = require("@metalsmith/js-bundle");
const sass = require("@metalsmith/sass");
const postcss = require("@metalsmith/postcss");
const permalinks = require("@metalsmith/permalinks");
const when = require("metalsmith-if");
const htmlMinifier = require("metalsmith-html-minifier");
const assets = require("metalsmith-static-files");
const prism = require("metalsmith-prism");

require("dotenv").config();
const sanitySource = require("./local_modules/sanity-source");

const marked = require("marked");

const { dependencies } = require("./package.json");

const isProduction = process.env.NODE_ENV === "production";

// functions to extend Nunjucks environment
const spaceToDash = (string) => string.replace(/\s+/g, "-");
const condenseTitle = (string) => string.toLowerCase().replace(/\s+/g, "");
const UTCdate = (date) => date.toUTCString("M d, yyyy");
const blogDate = (string) =>
  new Date(string).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" });
const trimSlashes = (string) => string.replace(/(^\/)|(\/$)/g, "");
const mdToHTML = (mdString) => {
  try {
    return marked.parse(mdString);
  } catch (e) {
    return mdString;
  }
};

const filterList = (list, selections) => {
  const filterredList = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < selections.length; j++) {
      if (list[i]._id === selections[j]._ref) {
        filterredList.push(list[i]);
      }
    }
  }
  return filterredList;
};

// turn a string of words into a unique array of words. Used to create a unique list of categories in cities-list.njk
const toArray = (string) => {
  return [...new Set(string.trim().split(" "))].sort();
};

// Define engine options for the inplace and layouts plugins
const templateConfig = {
  directory: "layouts",
  engineOptions: {
    path: ["layouts"],
    filters: {
      spaceToDash,
      condenseTitle,
      UTCdate,
      blogDate,
      trimSlashes,
      mdToHTML,
      filterList,
      toArray
    },
  },
};

function msBuild() {
  Metalsmith(__dirname)
    .source("./src/content")
    .destination("./build")
    .clean(true)
    .metadata({
      msVersion: dependencies.metalsmith,
      nodeVersion: process.version,
    })

    // the sanitySource plugin MUST be placed after metadata plugin other wise metadata will overwrite the sanity data
    .use(
      sanitySource({
        // Config object for the @sanity/client package
        // See https://www.npmjs.com/package/@sanity/client
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: 'production',
        apiVersion: 'v2022-11-17',
        token: process.env.SANITY_TOKEN,
      })
    )

    .use(
      collections({
        blog: {
          metadata: {
            title: 'Our Blog',
            description: 'Metalsmith and Sanity equals Ruhrpott',
            slug: 'blog'
          },
          pattern: "blog/**/*.md",
          sortBy: "date",
          reverse: true,
          limit: 10,
        },
      })
    )

    .use(markdown())

    .use(permalinks())

    .use(layouts(templateConfig))

    .use(
      prism({
        lineNumbers: true,
        decode: true,
      })
    )

    .use(
      assets({
        source: "src/assets/",
        destination: "assets/",
      })
    )

    .use(
      sass({
        entries: {
          "src/scss/styles.scss": "assets/styles.css",
        },
      })
    )
    .use(postcss({ plugins: ["postcss-preset-env", "autoprefixer", "cssnano"], map: !isProduction }))

    
    .use( (files, metalsmith, done) => {
      //console.log(metalsmith.metadata().blog);
      //console.log(JSON.stringify(metalsmith.metadata(),null, 4));
      done();
    })


    .use(
      esbuild({
        bundle: true,
        minify: false,
        sourcemap: true,
        drop: [],
        entries: {
          "assets/scripts": "src/js/main.js",
        },
      })
    )

    .use(when(isProduction, htmlMinifier()))
    .build((err) => {
      if (err) {
        throw err;
      }
    });
}

if (require.main === module) {
  msBuild();
} else {
  module.exports = msBuild;
}
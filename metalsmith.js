/* eslint-disable import/no-extraneous-dependencies */

const Metalsmith = require("metalsmith");
const markdown = require("@metalsmith/markdown");
const layouts = require("@metalsmith/layouts");
const collections = require("@metalsmith/collections");
const drafts = require("@metalsmith/drafts");
const esbuild = require("@metalsmith/js-bundle");
const sass = require("@metalsmith/sass");
const postcss = require("@metalsmith/postcss");
const permalinks = require("@metalsmith/permalinks");
const when = require("metalsmith-if");
const htmlMinifier = require("metalsmith-html-minifier");
const assets = require("metalsmith-static-files");
const metadata = require("@metalsmith/metadata");
const prism = require("metalsmith-prism");

const getSanity = require("./local_modules/sanity");
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
      if (list[i].id === selections[j]) {
        filterredList.push(list[i]);
      }
    }
  }
  return filterredList;
};

// turn a string of words into a unique array of words. Used to create a unique list of categories in rich-list.njk
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

Metalsmith(__dirname)
  .source("./src/content")
  .destination("./build")
  .clean(true)
  .metadata({
    msVersion: dependencies.metalsmith,
    nodeVersion: process.version,
  })

  .use(
    sanitySource({
      // Config object for the @sanity/client package
      // See https://www.npmjs.com/package/@sanity/client
      projectId: '349a1vg2', // required, else will throw
      dataset: 'production', // defaults to 'production'
      apiVersion: 'v2022-11-17', // use a UTC date string
      token:'skBZ9yDZX8BXBSlvGkoediG80ICbD5C5V9aSm5yaVw69GhTx5o7Ja1snxVFNIUJJDVzjRKWmo20MCCCvibbzOpUxfjQ4u4zHs4Q5CJcBoxoaCjhFwJp5wVm6oVBZ0NPwq8lpshlJXd6MBgzmHvgIvPHaMlsIM0Ca7JsMqobdgw1mtTW4ioeS'
    })
  )
/*
  .use(
    getSanity({
      // Config object for the @sanity/client package
      // See https://www.npmjs.com/package/@sanity/client
      projectId: '349a1vg2', // required, else will throw
      dataset: 'production', // defaults to 'production'
      apiVersion: 'v2022-11-17', // use a UTC date string
      token:'skBZ9yDZX8BXBSlvGkoediG80ICbD5C5V9aSm5yaVw69GhTx5o7Ja1snxVFNIUJJDVzjRKWmo20MCCCvibbzOpUxfjQ4u4zHs4Q5CJcBoxoaCjhFwJp5wVm6oVBZ0NPwq8lpshlJXd6MBgzmHvgIvPHaMlsIM0Ca7JsMqobdgw1mtTW4ioeS'
    })
  )
*/
  .use(when(isProduction, drafts()))

  .use(
    metadata({
      site: "src/content/data/site.json",
      nav: "src/content/data/navigation.json",
    })
  )

  .use(
    collections({
      blog: {
        pattern: "blog/*.md",
        sortBy: "date",
        reverse: true,
        limit: 10,
      },
    })
  )

  .use(files => console.log(Object.keys(files))) 

  .use(files => console.log(files['index.md']))

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
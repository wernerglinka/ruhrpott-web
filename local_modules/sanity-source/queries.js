const groq = require('groq');

// queries for all content/page types
// read more: https://www.sanity.io/docs/data-store/how-queries-work
// 
const queries = {
  //contentTypes: groq`array::unique(*[!(_type match ["system.*"] || _type match ["sanity.*"])]._type)`,
  //allPages: groq`*[discoverable == true && isPage == true]`,
  //allData: groq`*[discoverable == true]`,
  allContent: groq`*[discoverable == true]`,
  //home: groq`*[_type == "home"]`,
  //discover: groq`array::unique(*[discoverable == true]._type)`,
}

module.exports = queries;


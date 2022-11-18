const groq = require('groq');

// queries for all content/page types
// read more: https://www.sanity.io/docs/data-store/how-queries-work
// for navigation query read: https://www.sanity.io/schemas/nested-navigation-structure-757f39ee
const queries = {
  home: groq`*[_type == 'home']{ _id, title, icon, slug, content[] }`,
  posts: groq`*[_type == 'blog']{ _id, publishedAt, title, slug, mainImage, authorsList[]->{name, slug}, content[] }`,
  pages: groq`*[_type == 'page']{ _id, title, icon, slug, content[] }`,
  nav: groq`*[_type == 'navigation'][0] { ..., sections[]{ ..., target->{title, slug, _id}, links[]{ ..., target->{title, slug, _id}, children[]{ ..., target->{title, slug, _id}}}}} `,
  cities: groq`*[_type == 'cities']{ _id, name, size, image, logo, wappen, websiteLink, isExternal }`,
  footballClubs: groq`*[_type == 'footballClubs']{ _id, name, logo, websiteLink, isExternal }`,
}

module.exports = queries;


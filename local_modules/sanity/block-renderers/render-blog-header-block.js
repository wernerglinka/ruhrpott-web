const imageUrl = require('@sanity/image-url');
module.exports = function renderBlogHeaderBlock(block, client, authors) {
  return {
    name: 'blog-header',
    title: block.title ? block.title : '',
    subTitle: block.subTitle ? block.subTitle : '',
    published: block.publishingDate ? block.publishingDate : '',
    authors: authors ? authors : [],
    image: {
      imageUrl: imageUrl(client).image(block.mainImage).url(),
      alt: block.mainImage.alt ? block.mainImage.alt : '',
      caption: block.mainImage.caption ? block.mainImage.caption : '',
      credits: block.mainImage.credits ? block.mainImage.credits : '',
    }
  };
};
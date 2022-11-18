const imageUrl = require('@sanity/image-url');

module.exports = function renderImageBlock(block, client) {
  return {
    name: 'image',
    imageUrl: imageUrl(client).image(block).url(),
    alt: block.alt ? block.alt : '',
    caption: block.caption ? block.caption : '',
    credits: block.credits ? block.credits : '',
  }
};
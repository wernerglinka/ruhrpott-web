const blocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const getSerializers = require('./get-serializers');

/**
 * iterate
 * Transform Sanity portable text blocks to markdown and resolve references
 * 
 * @param {*} obj 
 * @param {*} client 
 * @param {*} options 
 */
const iterate = (obj, client, options) => {
  Object.keys(obj).forEach(key => {

    // transform Portable Text to Markdown
    if(key === "portableTextBody" || key === "blogContent") {

      //console.log(JSON.stringify(obj[key],null, 4));

      obj[key] = blocksToMarkdown(obj[key], {
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
      iterate(obj[key], client, options)
    }
  })
};


module.exports = iterate;
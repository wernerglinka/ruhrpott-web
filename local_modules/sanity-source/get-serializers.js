const imageUrl = require('@sanity/image-url');

const getSerializers = client => {
  // custom serializer for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  return {
    types: {
      code: ({node}) => '```' + node.language + '\n' + node.code + '\n```',
      mainImage: ({node}) => imageUrl(client).image(node).url(),
      //image: ({node}) => `![${node.alt}](${imageUrl(client).image(node).url()}{:#${node.imageID})`,
      image: ({node}) => `<img src="${imageUrl(client).image(node).url()}" alt="${node.alt}" id="${node.imageId}"/>`,
      slug: ({node}) => node.current,
    }
  }
}

module.exports = getSerializers;
const imageUrl = require('@sanity/image-url');

const getSerializers = client => {
  // custom serializer for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  return {
    types: {
      code: ({node}) => '```' + node.language + '\n' + node.code + '\n```',
      mainImage: ({node}) => imageUrl(client).image(node).url(),
      image: ({node}) => `![${node.alt}](${imageUrl(client).image(node).url()})`,
      slug: ({node}) => node.current,
    }
  }
}

module.exports = getSerializers;
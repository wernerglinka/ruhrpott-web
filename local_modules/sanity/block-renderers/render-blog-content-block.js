const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const getSerializers = require('../get-serializers');

module.exports = function renderBlogContentBlock(block, client) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  return {
    name: 'text',
    body: block.blogContent ? BlocksToMarkdown(block.blogContent, { serializers, ...client}) : '',
  };
};
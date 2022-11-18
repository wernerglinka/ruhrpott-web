const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

// renderers
const renderBlock = require('./block-renderers');

async function getHomePage(client, files) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  // fetch home page from Sanity
  // get rawPage in Portable Text format
  const rawHomePage = client.fetch(queries.home);
  let homePage = await rawHomePage;

  // build the json representation of the page, starting with layout. The page 
  // content is composed with sections, which are composed of blocks.
  pageContent = {
    layout: 'blocks.njk',
    bodyClasses: '',
    seo: {
      title: homePage.title,
      description: homePage.description,
      socialImage: homePage.image,
      canonicalOverwrite: homePage.canonicalUrl,
    },
    sections: [],
    contents: Buffer.from(''),
    mode: '0644',
    stats: {}
  };

  let sectionContent = {};
  homePage[0].content.map( (section, i) => {

    //console.log(JSON.stringify(section, null, 4));

    // common section fields
    sectionContent = {
      description: '',
      container: section.htmlTag || 'section',
      containerFields: {
        disabled: section.disabled || false,
        containerId: section.containerId || '',
        containerClass: section.containerClass || '',
        inContainer: section.inContainer || false,
        margin: {
          top:  !!section.margin?.top ? section.margin.top  : false,
          bottom: !!section.margin?.bottom ? section.margin.bottom : false,
        },
        padding: {
          top:  !!section.padding?.top ? section.padding.top  : false,
          bottom: !!section.padding?.bottom ? section.padding.bottom : false,
        },
        background: {
          color: !!section.background?.color ? section.background.color : '',
          image: !!section.background?.image ? section.background.image : '',
          isDark: !!section.background?.isDark ? section.background.isDark : false,
        }
      },
      columns: [],
    }

    // loop over individual section blocks
    section.sectionBlocks.map( block => {
      // get the blocktype and create the block object
      const type = block._type;

      // call the render function by type reference
      const blockObject = renderBlock[type](block, client);

      // add the block data to the columns array
      sectionContent.columns.push(blockObject);
    });

    // add the sections data into the sections array
    pageContent.sections.push(sectionContent);
  }); 

  return { 'index.md': pageContent };
}

module.exports = getHomePage;
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

// renderers
const renderBlock = require('./block-renderers');

async function getPosts(client) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  const allPages = {};
  
  // fetch all pages from Sanity
  // get rawPages in Portable Text format
  const allRawPosts = client.fetch(queries.posts);
  let pages = await allRawPosts;
    
  // turn rawPosts into markdown
  // read more: https://github.com/sanity-io/block-content-to-markdown

  let pageContent = {};
    
  pages.map( page => {
    // key for the files array
    const slug = BlocksToMarkdown(page.slug, { serializers, ...client});
    const fileName = `${slug}.md`;
    
		// get the blog post authors
    const authors = page.authorsList.map( author => {
      return {
				name: author.name,
				slug: author.slug.current,
			}
    });

    // build the json representation of the page, starting with layout. The page 
    // content is composed with sections, which are composed of blocks.
    pageContent = {
      layout: 'blocks.njk',
      bodyClasses: '',
      seo: {
        title: page.title,
        description: page.description,
        socialImage: page.image,
        canonicalOverwrite: page.canonicalUrl,
      },
      sections: [],
      contents: Buffer.from(''),
      mode: '0644',
      stats: {}
    };

    let sectionContent = {};
    page.content.map( (section, i) => {

      //console.log(JSON.stringify(section, null, 4));

      // common section fields
      sectionContent = {
        container: 'section',
        description: '',
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
        const blockObject = renderBlock[type](block, client, authors);

        // add the block data to the columns array
        sectionContent.columns.push(blockObject);
      });

      // add the sections data into the sections array
      pageContent.sections.push(sectionContent);

    }); 
    
    //console.log(JSON.stringify(pageContent.sections, null, 4));

    // add page to metalsmith object
    allPages[fileName] = pageContent; 

  });

  return allPages;
}

module.exports = getPosts;
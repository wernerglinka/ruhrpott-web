const imageUrl = require('@sanity/image-url');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const getSerializers = require('../get-serializers');

module.exports = function renderImageSliderBlock(block, client) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  const slides = [];

  block.slides.map( (slide, i) => {
    const slideContent = {
      image: {
        imageUrl: imageUrl(client).image(slide.slideImage).url(),
        alt: slide.slideImage.alt ? slide.slideImage.alt : '',
        caption: slide.slideImage.caption ? slide.slideImage.caption : '',
        credits: slide.slideImage.credits ? slide.slideImage.credits : '',
      },
      text: {
        titlePrefix: slide.slideText.titlePrefix || '',
        title: slide.slideText.title || '',
        headerType: slide.slideText.headerType ? slide.slideText.headerType : '',
        subTitle: slide.slideText.subTitle || '',
        body: slide.slideText.Body ? BlocksToMarkdown(slide.slideText.Body, { serializers, ...client}) : '',
      },
      scrollTarget: slide.scrollTarget,
    };
    slides.push(slideContent);
  });

  return {
    name: 'full-page-image-slider',
    slides: slides,
  }
};
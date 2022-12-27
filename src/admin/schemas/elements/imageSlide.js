import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'imageSlide',
  title: 'Image Slide',
  fields: [
    {
      title: 'Slide Text',
      name: 'slideText',
      type: 'textBlock',
    },
    {
      title: 'Slide Image',
      name: 'slideImage',
      type: 'imageBlock',
    },
    {
      title: 'Slide Scroll Target',
      name: 'scrollTarget',
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: 'slideText.title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  }
});

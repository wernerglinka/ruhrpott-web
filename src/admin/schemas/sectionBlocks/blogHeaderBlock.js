import {defineType} from 'sanity';

export default defineType({
  name: 'blogHeaderBlock',
  title: 'Blog Header Block',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'subTitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'publishingDate',
      title: 'Publishing Date',
      type: 'datetime'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      fields: [
        {
          title: 'Alternative Text',
          name: 'alt',
          type: 'string'
        },
        {
          title: 'Caption',
          name: 'caption',
          type: 'string'
        },
        {
          name: 'credits',
          type: 'string',
          title: 'Credits',
        }
      ]
    },
  ],
});
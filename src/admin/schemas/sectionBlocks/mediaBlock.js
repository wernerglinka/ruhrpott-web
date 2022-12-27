import {defineType} from 'sanity'

export default defineType({
  name: 'mediaBlock',
  title: 'Media Block',
  type: 'object',
  fields: [
    {
      name: 'blockOrder',
      title: 'Block Order',
      type: 'string',
      options: {
        list: [
          { title: "Image Right", value: "imageRight" },
          { title: "Image Left", value: "imageLeft" },
        ]
      },
      initialValue: "imageRight",
    },
    { name: 'titlePrefix', 
      type: 'string', 
      title: 'Title Prefix' 
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: "headerType",
      title: "Header Type",
      type: "string",
      description: 'Choose from h1 through h6',
      options: {
        list: [
          { title: "h1", value: "h1" },
          { title: "h2", value: "h2" },
          { title: "h3", value: "h3" },
          { title: "h4", value: "h4" },
          { title: "h5", value: "h5" },
          { title: "h6", value: "h6" },
        ]
      },
      initialValue: "h2",
    },
    {
      name: 'subTitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'mediaImage',
      title: 'Media Image',
      type: 'imageBlock',
    },
    {
      name: 'portableTextBody',
      type: 'simpleBlockContent',
      title: 'Portable Text Body',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'CTA',
    },
  ],
})
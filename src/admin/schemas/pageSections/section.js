import {defineType} from 'sanity'

// section schema
// constists of sections fields and an array of blocks that can be added to the section
// section fields are groupped in a collapsable fieldset and individual groups may be 
// enabled/disabled

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fieldsets: [
    { 
      name: 'sectionFields', 
      title: 'Sections Fields',
      options: {
        collapsible: true,
        collapsed: false
      }
    },
  ],
  fields: [
    {
      name: "sectionType",
      title: "Section Type",
      type: "string",
      description: 'This is used to select the proper section styles',
      options: {
        list: [
          { title: "Blog Post Header", value: "blogPostHeader" },
          { title: "Blog Post Content", value: "blogPostContent" },
          { title: "Cities List", value: "citiesList" },
          { title: "Default", value: "default" },
          { title: "Image", value: "image" },
          { title: "Image Slider", value: "imageSlider" },
          { title: "Logos List", value: "logosList" },
          { title: "Media", value: "media" },
          { title: "Text", value: "text" },
          { title: "Video", value: "video" },
        ],
      },
      fieldset: 'sectionFields',
    },
    {
      title: 'Disabled',
      name: 'disabled',
      type: 'boolean',
      initialValue: false,
      fieldset: 'sectionFields',
    },
    {
      title: 'Container ID',
      name: 'containerId',
      type: 'string',
      fieldset: 'sectionFields',
    },
    {
      title: 'Container Class',
      name: 'containerClass',
      type: 'string',
      fieldset: 'sectionFields',
    },
    {
      title: 'In Container',
      name: 'inContainer',
      type: 'boolean',
      fieldset: 'sectionFields',
    },
    { 
      title: 'Add Spacing',
      name: 'addSpacing',
      type: 'boolean',
      fieldset: 'sectionFields',
    },
    {
      title: 'Margin',
      name: 'margin',
      type: 'object',
      fields: [
        {
          title: 'Top',
          name: 'top',
          type: 'boolean'
        },
        {
          title: 'Bottom',
          name: 'bottom',
          type: 'boolean'
        }
      ],
      hidden: ({ parent }) => !parent?.addSpacing,
      fieldset: 'sectionFields',
    },
    {
      title: 'Padding',
      name: 'padding',
      type: 'object',
      fields: [
        {
          title: 'Top',
          name: 'top',
          type: 'boolean'
        },
        {
          title: 'Bottom',
          name: 'bottom',
          type: 'boolean'
        }
      ],
      hidden: ({ parent }) => !parent?.addSpacing,
      fieldset: 'sectionFields',
    },
    {
      title: 'Has Background',
      name: 'hasBackground',
      type: 'boolean',
      fieldset: 'sectionFields',
    },
    {
      title: 'Background',
      name: 'background',
      type: 'object',
      fields: [
        {
          title: 'Color',
          name: 'color',
          type: 'string'
        },
        {
          title: 'Image',
          name: 'image',
          type: 'image'
        },
        {
          name: "cssBg",
          title: "CSS Background",
          type: "string",
          description: 'Select a CSS background pattern',
          options: {
            list: [
              { title: "Pattern1", value: "pattern1" },
              { title: "Pattern2", value: "pattern2" },
              { title: "Pattern3", value: "pattern3" },
              { title: "Pattern4", value: "pattern4" },
              { title: "Pattern5", value: "pattern5" },
            ],
          },
        },
        {
          title: 'Is Dark',
          name: 'isDark',
          type: 'boolean'
        }
      ],
      hidden: ({ parent }) => !parent.hasBackground,
      fieldset: 'sectionFields',
    },
    {
      name: "htmlTag",
      title: "HTML Tag",
      type: "string",
      description: 'Select Section, Article or Aside',
      options: {
        list: [
          { title: "Section", value: "section" },
          { title: "Article", value: "article" },
          { title: "Aside", value: "aside" },
        ],
      },
    },
    {
      name: 'sectionBlocks',
      type: 'array',
      title: 'Section Blocks',
      description: 'Add, edit, and reorder section blocks',
      of: [
        { type: 'blogContentBlock' },
        { type: 'blogHeaderBlock' },
        { type: 'citiesListBlock' },
        { type: 'imageBlock' },
        { type: 'imageSliderBlock' },
        { type: 'logosListBlock' },
        { type: 'mediaBlock' },
        { type: 'textBlock' },
        { type: 'videoBlock' },
      ]
    },
  ],
  preview: {
    select: {
      title: 'sectionType',
    },
    prepare(selection) {
      console.log(selection);
      const { title } = selection;
      return {
        title: title,
      };
    },
  }
})



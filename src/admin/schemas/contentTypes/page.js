import {defineType} from 'sanity'

import {FiFile} from "react-icons/fi";


export default defineType({
  name: 'page',
  title: 'Page',
  icon: FiFile,
  type: 'document',
  fieldsets: [
    { 
      name: 'metadata', 
      title: 'Page Meta Data',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
  ],
  fields: [
    {
      name: 'discoverable',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'isPage',
      type: 'boolean',
      description: 'set to FALSE for metadata',
      initialValue: true,
    },
    {
      name: "layout",
      title: "Page Template",
      type: "string",
      description: 'Type the name of the page template you want to use, including the file extension. For example: "sections.njk"',
      initialValue: "sections.njk",
    },
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      fieldset: 'metadata',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Page Description',
      fieldset: 'metadata',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Page Image',
      description: 'This image will be used when sharing the page on social media',
      fieldset: 'metadata',
    },
    {
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description: 'The canonical URL of the page',
      fieldset: 'metadata',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'section' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  }
});

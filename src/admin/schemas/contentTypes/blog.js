import {defineType} from 'sanity';
import {FiFileText} from "react-icons/fi";
import { format } from 'date-fns'

export default defineType({
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  icon: FiFileText,
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
        source: (doc) => {
          const date = format(new Date(doc.publishedAt), "yyyy");
          return `blog/${date}/${doc.title}`;
        },
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: 'Body Classes',
      name: 'bodyClasses',
      type: 'string',
      description: 'Add classes to the body tag - add only if you know what you are doing',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      title: 'Authors List',
      name: 'authorsList',
      type: 'array',
      of: [
        { 
          type: 'reference', 
          to: {type: 'authors'}
        },
      ],
    },
    {
      name: 'categories',
      type: 'string',
      title: 'Post Categories',
      options: {
        list: [
          { title: "Apple", value: "apple" },
          { title: "Orange", value: "orange" },
          { title: "Cherry", value: "cherry" },
        ],
      },
    },
    {
      name: 'portableTextBody',
      type: 'simpleBlockContent',
      title: 'Excerpt',
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'section' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author0: `authorsList.0.name`,
      author1: `authorsList.1.name`,
      media: 'mainImage'
    },
    prepare(selection) {
      const {author0, author1, author2} = selection
      return Object.assign({}, selection, {
        subtitle: author0 && `by ${author0} ${author1 ? `,et al.` : ''}`
      })
    }
  }
});

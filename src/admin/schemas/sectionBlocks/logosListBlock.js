import {defineType} from 'sanity'

export default defineType({
  name: 'logosListBlock',
  title: 'Logos List Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      }
    },
    {
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string'
    },
    {
      name: 'portableTextBody',
      type: 'simpleBlockContent',
      title: 'Portable Text Body',
    },
    {
      name: "listSource",
      title: "List Source",
      type: "string",
      options: {
        list: [
          { title: "Football Clubs", value: "footballClubs" },
          { title: "Cities", value: "cities" },
        ],
      },
    },
    {
      title: 'Logo Width',
      name: 'logoWidth',
      type: 'number',
      description: 'Width of the logo in pixels',
    },
    {
      name: "scope",
      title: "Scope",
      type: "string",
      options: {
        list: [
          { title: "All", value: "all" },
          { title: "Selections", value: "selections" },
        ],
      },
    },
    {
      title: 'City Logos',
      name: 'logosCity',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'cities' }
          ]
        }
      ],
      hidden: ({ parent }) => parent?.listSource !== 'cities'
    },
    {
      title: 'Football Club Logos',
      name: 'logosFootballClub',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'footballClubs' }
          ]
        }
      ],
      hidden: ({ parent }) => parent?.listSource !== 'footballClubs'
    },
    {
      name: 'hint',
      title: 'Hint',
      type: 'string'
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'cta'
    }
  ],
});
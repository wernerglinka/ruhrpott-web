import {defineType} from 'sanity'

export default defineType({
  name: 'citiesListBlock',
  title: 'Cities List Block',
  type: 'object',
  fields: [
    {
      name: "listSource",
      title: "List Source",
      type: "string",
      options: {
        list: [
          { title: "Cities", value: "cities" },
        ],
      },
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
      title: 'City Cards',
      name: 'cityCards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'cities' }
          ]
        }
      ],
    },
  ],
});
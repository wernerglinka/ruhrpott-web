export default {
  name: 'menuLink',
  type: 'object',
  title: 'Menu Link',
  preview: {
    select: {
      title: 'label',
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
  fields: [
    {
      type: 'string',
      name: 'linkIcon',
      title: 'Link Icon',
      description: 'Feather icon class',
    },
    {
      type: 'string',
      name: 'label',
      title: 'Label',
    },
    {
      type: 'string',
      name: 'linkClass',
      title: 'Link Class',
    },
    {
      type: 'string',
      name: 'linkURL',
      title: 'Link URL',
    },
    {
      type: 'boolean',
      name: 'hasChildren',
      title: 'Has Children',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{ type: 'menuLink' }],
      hidden: ({ parent }) => !parent?.hasChildren,
    },
  ],
}
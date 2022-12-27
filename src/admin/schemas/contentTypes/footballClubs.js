import {defineType} from 'sanity'
import {FiDribbble} from "react-icons/fi";

export default defineType({
  name: 'footballClubs',
  title: 'Football Clubs',
  type: 'document',
  icon: FiDribbble,
  fields: [
    {
      name: 'discoverable',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'logo',
      title: 'Club Logo',
      type: 'image',
      fields: [
        {
          title: 'Alternative Text',
          name: 'alt',
          type: 'string'
        }
      ]
    },
    {
      name: 'websiteLink',
      title: 'Website Link',
      type: 'link',
    },
    {
      name: "liga",
      title: "Liga",
      type: "string",
      options: {
        list: [
          { title: "Bundesliga", value: "bundesliga" },
          { title: "Zweite Bundesliga", value: "zweiteBundesliga" },
          { title: "Dritte Bundesliga", value: "dritteBundesliga" },
          { title: "Regionalliga", value: "regionalliga" },
          { title: "Other", value: "other" },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
})

import {defineType} from 'sanity';
import {FiGlobe} from "react-icons/fi";

export default defineType({
  name: 'cities',
  title: 'Cities',
  type: 'document',
  icon: FiGlobe,
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
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: "Greater then One Hundred Thousand", value: "one" },
          { title: "Greater then Two Hundred Thousand", value: "two" },
          { title: "Greater then Three Hundred Thousand", value: "three" },
          { title: "Greater then Four Hundred Thousand", value: "four" },
          { title: "Greater then Five Hundred Thousand", value: "five" },
        ],
      },
    },
    {
      name: 'image',
      title: 'Image',
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
    {
      name: 'logo',
      title: 'City Logo',
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
      name: 'wappen',
      title: 'City Wappen',
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
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
})

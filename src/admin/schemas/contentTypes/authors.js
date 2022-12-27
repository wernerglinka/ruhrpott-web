import {defineType} from 'sanity';
import {FiUser} from "react-icons/fi";

export default defineType({
  name: 'authors',
  title: 'Authors',
  type: 'document',
  icon: FiUser,
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
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'portableTextBody',
      type: 'simpleBlockContent',
      title: 'Author Bio',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
});

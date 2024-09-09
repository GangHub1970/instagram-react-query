import {defineField} from 'sanity'

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    defineField({
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}

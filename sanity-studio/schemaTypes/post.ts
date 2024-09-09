import {defineField} from 'sanity'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
    },
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          name: 'comment',
          title: 'Comment',
          type: 'document',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              name: 'comment',
              title: 'Comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      name: 'author.name',
      username: 'author.username',
      media: 'photo',
    },
    prepare(selection: Record<string, string>) {
      const {title, name, username, media} = selection
      return {
        title,
        subtitle: `by ${name} (${username})`,
        media,
      }
    },
  },
}

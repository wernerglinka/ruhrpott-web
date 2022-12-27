import {defineType} from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    {
      name: "videoSource",
      title: "Video Source",
      type: "string",
      description: 'Select a Video Source',
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
        ],
      },
    },
    {
      name: 'videoID',
      type: 'string',
      title: 'Video ID',
    },
    {
      title: 'Start Time',
      name: 'startTime',
      type: 'number',
      description: 'Start time in seconds',
    },
    {
      name: 'videoThumbnail',
      title: 'Video Thumbnail',
      type: 'imageBlock',
    },
  ],
})
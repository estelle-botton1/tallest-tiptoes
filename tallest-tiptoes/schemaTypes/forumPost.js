export default {
  name: 'forumPost',
  title: 'Forum Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'format', title: 'Format', type: 'string', options: { list: ['Essay', 'Vlog', 'Movie Rec', 'Podcast', 'Photo Essay'] } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'image', title: 'Featured Image', type: 'image' },
    { name: 'preview', title: 'Preview Text', type: 'text' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'videoUrl', title: 'Video URL (for vlogs)', type: 'url' },
  ],
}

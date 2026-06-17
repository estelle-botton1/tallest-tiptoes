export default {
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'sortOrder', title: 'Display Order (1 = first)', type: 'number' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ["What I'm Eating", "Where I'm Going", "How I'm Hosting", "Things I'm Liking"] } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'image', title: 'Cover Image', type: 'image' },
    { name: 'images', title: 'Additional Images', type: 'array', of: [{ type: 'image' }] },
    { name: 'preview', title: 'Preview Text', type: 'text' },
    { name: 'link', title: 'External Link', type: 'url' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
}
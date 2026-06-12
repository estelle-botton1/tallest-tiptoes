export default {
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'sortOrder', title: 'Display Order (1 = first)', type: 'number' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Restaurants', 'Hosting', 'Weekend', 'Travel'] } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'image', title: 'Cover Image', type: 'image' },
    { name: 'preview', title: 'Preview Text', type: 'text' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
}

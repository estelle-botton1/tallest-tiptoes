export default {
  name: 'outfit',
  title: 'Outfit (The Edit)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'sortOrder', title: 'Display Order (1 = first)', type: 'number' },
    { name: 'mood', title: 'Mood', type: 'string', options: { list: ['Errands', 'Dinner', 'Weekend', 'Event', 'Daytime', 'Night Out', 'Work', 'Vacation'] } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'image', title: 'Main Image', type: 'image' },
    { name: 'images', title: 'Additional Images (swipeable)', type: 'array', of: [{ type: 'image' }] },
    { name: 'note', title: 'Note', type: 'text' },
    { name: 'items', title: 'Outfit Items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'piece', title: 'Piece', type: 'string' },
      { name: 'brand', title: 'Brand', type: 'string' },
      { name: 'price', title: 'Price', type: 'string' },
      { name: 'link', title: 'Shop Link', type: 'url' },
      { name: 'image', title: 'Product Image', type: 'image' },
    ]}] },
  ],
}

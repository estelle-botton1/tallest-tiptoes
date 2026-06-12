export default {
  name: 'mensItem',
  title: 'His Not Hers Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Splurge', 'Outfit Guide', 'The Thing'] } },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'link', title: 'Shop Link', type: 'url' },
    { name: 'note', title: 'Note', type: 'text' },
    { name: 'image', title: 'Main Image', type: 'image' },
    { name: 'images', title: 'Multiple Images (swipeable)', type: 'array', of: [{ type: 'image' }] },
    { name: 'outfitPieces', title: 'Pieces / Options', type: 'array', of: [{ type: 'object', fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'brand', title: 'Brand', type: 'string' },
      { name: 'link', title: 'Shop Link', type: 'url' },
      { name: 'image', title: 'Image', type: 'image' },
    ]}] },
  ],
}

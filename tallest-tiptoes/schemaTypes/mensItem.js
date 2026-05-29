export default {
  name: 'mensItem',
  title: 'His Not Hers Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Splurge', 'Wardrobe Basics', 'Outfit Guide'] } },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'note', title: 'Note (one line)', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'outfitPieces', title: 'Outfit Pieces (for Outfit Guide only)', type: 'array', of: [{ type: 'object', fields: [
      { name: 'name', title: 'Piece Name', type: 'string' },
      { name: 'brand', title: 'Brand', type: 'string' },
      { name: 'image', title: 'Image', type: 'image' },
    ]}] },
  ],
}

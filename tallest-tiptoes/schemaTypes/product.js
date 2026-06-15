export default {
  name: 'product',
  title: 'Product (The Shop)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'sortOrder', title: 'Display Order (1 = first)', type: 'number' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Made by Me', 'Collected', 'From My Closet'] } },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'shopUrl', title: 'Shopify / Purchase Link', type: 'url' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['Available', 'Sold', 'Coming Soon'] } },
    { name: 'edition', title: 'Edition Info', type: 'string' },
    { name: 'story', title: 'The Story', type: 'text' },
    { name: 'location', title: 'Found In (city)', type: 'string' },
    { name: 'images', title: 'Product Images', type: 'array', of: [{ type: 'image' }] },
  ],
}

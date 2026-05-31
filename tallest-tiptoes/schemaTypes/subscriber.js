export default {
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'categories', title: 'Subscribed To', type: 'array', of: [{ type: 'string' }],
      options: { list: [
        { title: 'The Forum', value: 'forum' },
        { title: 'The Edit', value: 'edit' },
        { title: 'The Shop', value: 'shop' },
        { title: 'His Not Hers', value: 'hisNotHers' },
        { title: 'The Guide', value: 'guide' },
      ]}
    },
    { name: 'subscribedAt', title: 'Subscribed At', type: 'datetime' },
    { name: 'active', title: 'Active', type: 'boolean' },
  ],
}

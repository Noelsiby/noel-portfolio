export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'githubUrl', title: 'GitHub Link', type: 'url' },
    { name: 'liveUrl', title: 'Live Demo Link', type: 'url' },
    { name: 'icon', title: 'Project Icon', type: 'string' },
    { name: 'projectImage', title: 'Project Image', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};

export default {
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    { name: 'name', title: 'Skill Name', type: 'string' },
    { name: 'icon', title: 'Skill Icon', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming', value: 'Programming' },
          { title: 'Web', value: 'Web' },
          { title: 'DevOps', value: 'DevOps' },
          { title: 'Tools', value: 'Tools' },
        ],
      },
    },
  ],
};

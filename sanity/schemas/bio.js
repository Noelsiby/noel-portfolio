export default {
  name: 'bio',
  title: 'Bio / Resume',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'about', title: 'About Text', type: 'text' },
    { name: 'resumePdf', title: 'Resume PDF', type: 'file' },
    { name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'institution', title: 'Institution', type: 'string' },
            { name: 'year', title: 'Year', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

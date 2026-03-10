export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'glowColor', title: 'Glow Color', type: 'string', description: 'Hex color e.g. #00f5ff' },
    { name: 'accentColor', title: 'Accent Color', type: 'string' },
    { name: 'backgroundColor', title: 'Background Color', type: 'string' },
    { name: 'particleDensity', title: 'Particle Density', type: 'number', description: 'Number of particles (100-1000)' },
    { name: 'rotationSpeed', title: 'Rotation Speed', type: 'number', description: '0.001 to 0.01' },
    { name: 'lightIntensity', title: 'Light Intensity', type: 'number', description: '0.5 to 3.0' },
  ],
};

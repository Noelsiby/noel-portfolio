// ═══════════════════════════════════════════════
// Local Data Layer — mirrors Sanity CMS schema
// Replace with Sanity queries when CMS is connected
// ═══════════════════════════════════════════════

export const bioData = {
  name: "Noel Siby",
  title: "Software Developer | Cloud & Security Enthusiast",
  location: "Kozhikode, Kerala, India",
  about:
    "I am a passionate software developer with a strong interest in cloud computing, cybersecurity, and modern web technologies. I build secure systems, explore cloud infrastructure, and continuously improve my technical skills through hands-on projects. Currently pursuing MCA at LEAD College of Management, Palakkad.",
  resumeUrl: "#",
  profileImage: null,
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "LEAD College of Management, Palakkad",
      year: "2024 — Present",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Farook College, Kozhikode",
      year: "2021 — 2024",
    },
  ],
  certifications: [
    "AWS Cloud Foundations",
    "Cybersecurity Essentials",
    "Python for Data Science",
  ],
};

export const projectsData = [
  {
    id: "zerotrust",
    title: "ZeroTrust Password AI",
    description:
      "An AI-powered password security system implementing zero-trust architecture principles for enhanced credential protection and strength analysis.",
    tags: ["Python", "AI/ML", "Security"],
    githubUrl: "https://github.com/Noelsiby",
    liveUrl: null,
    icon: "🔐",
    order: 1,
  },
  {
    id: "soc",
    title: "Secure Storage SOC",
    description:
      "A Security Operations Center solution for secure data storage with real-time monitoring, threat detection, and incident response capabilities.",
    tags: ["Security", "SOC", "Cloud"],
    githubUrl: "https://github.com/Noelsiby",
    liveUrl: null,
    icon: "📦",
    order: 2,
  },
  {
    id: "image-ai",
    title: "AI Image Recognition",
    description:
      "An intelligent image recognition system leveraging deep learning models for accurate classification and object detection tasks.",
    tags: ["Python", "AI/ML", "Deep Learning"],
    githubUrl: "https://github.com/Noelsiby",
    liveUrl: null,
    icon: "🧠",
    order: 3,
  },
  {
    id: "bus-booking",
    title: "Private Bus Booking System",
    description:
      "A full-stack bus reservation platform with route management, seat booking, payment integration, and real-time availability tracking.",
    tags: ["Flask", "Full-Stack", "Web App"],
    githubUrl: "https://github.com/Noelsiby",
    liveUrl: null,
    icon: "🚌",
    order: 4,
  },
];

export const skillsData = [
  { name: "Python", category: "Programming", icon: "🐍" },
  { name: "JavaScript", category: "Programming", icon: "⚡" },
  { name: "HTML", category: "Web", icon: "🌐" },
  { name: "CSS", category: "Web", icon: "🎨" },
  { name: "Flask", category: "Web", icon: "🧪" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "Linux", category: "Tools", icon: "🐧" },
  { name: "Git", category: "Tools", icon: "📝" },
];

export const socialData = [
  {
    platform: "GitHub",
    url: "https://github.com/Noelsiby",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/noel-siby-63489426a",
    icon: "linkedin",
  },
  {
    platform: "Email",
    url: "mailto:noelsiby@example.com",
    icon: "email",
  },
];

export const settingsData = {
  glowColor: "#00f5ff",
  accentColor: "#7c3aed",
  backgroundColor: "#050816",
  particleDensity: 400,
  rotationSpeed: 0.003,
  lightIntensity: 1.5,
};

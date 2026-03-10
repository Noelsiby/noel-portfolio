// ═══════════════════════════════════════════════
// Sanity Client — swap this to real Sanity when ready
// ═══════════════════════════════════════════════
// To connect to Sanity:
// 1. npm install @sanity/client
// 2. Replace the exports below with GROQ queries
// ═══════════════════════════════════════════════

import {
  bioData,
  projectsData,
  skillsData,
  socialData,
  settingsData,
} from "./data";

export async function getBio() {
  return bioData;
}

export async function getProjects() {
  return projectsData.sort((a, b) => a.order - b.order);
}

export async function getSkills() {
  return skillsData;
}

export async function getSocial() {
  return socialData;
}

export async function getSettings() {
  return settingsData;
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const defaultData = {
  bio: {
    name: "Noel Siby",
    title: "Software Developer | Cloud & Security Enthusiast",
    location: "Kozhikode, Kerala, India",
    about: "I am a passionate software developer with a strong interest in cloud computing, cybersecurity, and modern web technologies. I build secure systems, explore cloud infrastructure, and continuously improve my technical skills through hands-on projects. Currently pursuing MCA at LEAD College of Management, Palakkad.",
    resumeUrl: "#",
    education: [
      { degree: "Master of Computer Applications (MCA)", institution: "LEAD College of Management, Palakkad", year: "2024 — Present" },
      { degree: "Bachelor of Computer Applications (BCA)", institution: "Farook College, Kozhikode", year: "2021 — 2024" },
    ],
    certifications: ["AWS Cloud Foundations", "Cybersecurity Essentials", "Python for Data Science"],
  },
  projects: [
    { id: "zerotrust", title: "ZeroTrust Password AI", description: "An AI-powered password security system implementing zero-trust architecture principles for enhanced credential protection and strength analysis.", tags: "Python,AI/ML,Security", githubUrl: "https://github.com/Noelsiby", liveUrl: "", icon: "🔐", order: 1 },
    { id: "soc", title: "Secure Storage SOC", description: "A Security Operations Center solution for secure data storage with real-time monitoring, threat detection, and incident response capabilities.", tags: "Security,SOC,Cloud", githubUrl: "https://github.com/Noelsiby", liveUrl: "", icon: "📦", order: 2 },
    { id: "image-ai", title: "AI Image Recognition", description: "An intelligent image recognition system leveraging deep learning models for accurate classification and object detection tasks.", tags: "Python,AI/ML,Deep Learning", githubUrl: "https://github.com/Noelsiby", liveUrl: "", icon: "🧠", order: 3 },
    { id: "bus-booking", title: "Private Bus Booking System", description: "A full-stack bus reservation platform with route management, seat booking, payment integration, and real-time availability tracking.", tags: "Flask,Full-Stack,Web App", githubUrl: "https://github.com/Noelsiby", liveUrl: "", icon: "🚌", order: 4 },
  ],
  skills: [
    { name: "Python", category: "Programming", icon: "🐍" },
    { name: "JavaScript", category: "Programming", icon: "⚡" },
    { name: "HTML", category: "Web", icon: "🌐" },
    { name: "CSS", category: "Web", icon: "🎨" },
    { name: "Flask", category: "Web", icon: "🧪" },
    { name: "Docker", category: "DevOps", icon: "🐳" },
    { name: "Linux", category: "Tools", icon: "🐧" },
    { name: "Git", category: "Tools", icon: "📝" },
  ],
  social: [
    { platform: "GitHub", url: "https://github.com/Noelsiby", icon: "github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/noel-siby-63489426a", icon: "linkedin" },
    { platform: "Email", url: "mailto:noelsiby@example.com", icon: "email" },
  ],
};

function InputField({ label, value, onChange, type = "text", rows }) {
  const baseStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(15, 23, 60, 0.8)",
    border: "1px solid rgba(0, 245, 255, 0.2)",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#00f5ff",
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          style={{ ...baseStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "#00f5ff")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(0,245,255,0.2)")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={baseStyle}
          onFocus={(e) => (e.target.style.borderColor = "#00f5ff")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(0,245,255,0.2)")}
        />
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState("bio");
  const [saved, setSaved] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data from API (Supabase) on mount, fallback to localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/data");
        if (res.ok) {
          const apiData = await res.json();
          setData({
            ...defaultData,
            ...apiData,
            bio: { ...defaultData.bio, ...(apiData.bio || {}) },
          });
        }
      } catch {
        // Fallback to localStorage
        const stored = localStorage.getItem("portfolio-data");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setData({
              ...defaultData,
              ...parsed,
              bio: { ...defaultData.bio, ...(parsed.bio || {}) },
            });
          } catch {}
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Save to API (Supabase) + localStorage backup
  const save = async () => {
    setSaveMsg("Saving...");
    // Always save to localStorage as backup
    localStorage.setItem("portfolio-data", JSON.stringify(data));

    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data }),
      });
      const result = await res.json();
      if (res.ok) {
        setSaved(true);
        setSaveMsg(result.message || "Saved to database!");
      } else {
        setSaveMsg(result.error || "Save failed — check password");
      }
    } catch (err) {
      setSaveMsg("Saved to localStorage only (API unreachable)");
      setSaved(true);
    }
    setTimeout(() => { setSaved(false); setSaveMsg(""); }, 3000);
  };

  const resetAll = async () => {
    localStorage.removeItem("portfolio-data");
    setData(defaultData);
    // Also reset in Supabase
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data: defaultData }),
      });
    } catch {}
    setSaved(true);
    setSaveMsg("Reset to defaults!");
    setTimeout(() => { setSaved(false); setSaveMsg(""); }, 2000);
  };

  const updateBio = (field, value) => {
    setData((prev) => ({ ...prev, bio: { ...prev.bio, [field]: value } }));
  };

  const updateProject = (index, field, value) => {
    setData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: `project-${Date.now()}`, title: "", description: "", tags: "", githubUrl: "", liveUrl: "", icon: "📁", order: prev.projects.length + 1 },
      ],
    }));
  };

  const removeProject = (index) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateSkill = (index, field, value) => {
    setData((prev) => {
      const skills = [...prev.skills];
      skills[index] = { ...skills[index], [field]: value };
      return { ...prev, skills };
    });
  };

  const addSkill = () => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", category: "Programming", icon: "⚡" }],
    }));
  };

  const removeSkill = (index) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const updateSocial = (index, field, value) => {
    setData((prev) => {
      const social = [...prev.social];
      social[index] = { ...social[index], [field]: value };
      return { ...prev, social };
    });
  };

  const addSocial = () => {
    setData((prev) => ({
      ...prev,
      social: [...prev.social, { platform: "", url: "", icon: "" }],
    }));
  };

  const removeSocial = (index) => {
    setData((prev) => ({
      ...prev,
      social: prev.social.filter((_, i) => i !== index),
    }));
  };

  // Education helpers
  const updateEducation = (index, field, value) => {
    setData((prev) => {
      const education = [...(prev.bio.education || [])];
      education[index] = { ...education[index], [field]: value };
      return { ...prev, bio: { ...prev.bio, education } };
    });
  };
  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      bio: { ...prev.bio, education: [...(prev.bio.education || []), { degree: "", institution: "", year: "" }] },
    }));
  };
  const removeEducation = (index) => {
    setData((prev) => ({
      ...prev,
      bio: { ...prev.bio, education: (prev.bio.education || []).filter((_, i) => i !== index) },
    }));
  };

  // Certifications helpers
  const updateCertification = (index, value) => {
    setData((prev) => {
      const certs = [...(prev.bio.certifications || [])];
      certs[index] = value;
      return { ...prev, bio: { ...prev.bio, certifications: certs } };
    });
  };
  const addCertification = () => {
    setData((prev) => ({
      ...prev,
      bio: { ...prev.bio, certifications: [...(prev.bio.certifications || []), ""] },
    }));
  };
  const removeCertification = (index) => {
    setData((prev) => ({
      ...prev,
      bio: { ...prev.bio, certifications: (prev.bio.certifications || []).filter((_, i) => i !== index) },
    }));
  };

  const tabs = [
    { id: "bio", label: "Bio / Resume" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "social", label: "Social Links" },
  ];

  const containerStyle = {
    minHeight: "100vh",
    background: "#050816",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
  };

  const cardStyle = {
    background: "rgba(15, 23, 60, 0.5)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(0, 245, 255, 0.1)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "16px",
  };

  const miniBtn = {
    padding: "6px 14px",
    background: "rgba(0,245,255,0.1)",
    border: "1px solid rgba(0,245,255,0.3)",
    borderRadius: "6px",
    color: "#00f5ff",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontWeight: 600,
  };

  const removeBtn = {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "6px",
    color: "#ef4444",
    padding: "4px 10px",
    fontSize: "0.75rem",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div
        style={{
          padding: "20px 32px",
          borderBottom: "1px solid rgba(0,245,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(5,8,22,0.9)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/"
            style={{
              color: "#00f5ff",
              textDecoration: "none",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            &lt;NS /&gt;
          </Link>
          <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {saveMsg && (
            <span style={{ color: saved ? "#10b981" : "#f59e0b", fontSize: "0.8rem", fontWeight: 600, maxWidth: "280px" }}>
              {saveMsg}
            </span>
          )}
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px 14px",
              background: "rgba(15, 23, 60, 0.8)",
              border: "1px solid rgba(0, 245, 255, 0.25)",
              borderRadius: "8px",
              color: "#e2e8f0",
              fontSize: "0.8rem",
              width: "160px",
              outline: "none",
            }}
          />
          <button
            onClick={resetAll}
            style={{
              padding: "8px 18px",
              background: "transparent",
              border: "1px solid rgba(239,68,68,0.4)",
              borderRadius: "8px",
              color: "#ef4444",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Reset
          </button>
          <button
            onClick={save}
            style={{
              padding: "8px 24px",
              background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))",
              border: "1px solid rgba(0,245,255,0.4)",
              borderRadius: "8px",
              color: "#00f5ff",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Save All
          </button>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
        {/* Sidebar tabs */}
        <div style={{ width: "200px", marginRight: "32px", flexShrink: 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                marginBottom: "4px",
                background: activeTab === tab.id ? "rgba(0,245,255,0.1)" : "transparent",
                border: activeTab === tab.id ? "1px solid rgba(0,245,255,0.2)" : "1px solid transparent",
                borderRadius: "8px",
                color: activeTab === tab.id ? "#00f5ff" : "#94a3b8",
                textAlign: "left",
                fontSize: "0.85rem",
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
          <div style={{ marginTop: "32px", padding: "16px", borderRadius: "12px", background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)" }}>
            <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6 }}>
              Enter your <strong style={{ color: "#00f5ff" }}>Admin Password</strong> (set in <code style={{ color: "#00f5ff" }}>.env.local</code>) and click Save All to persist changes to Supabase. All visitors will see your edits.
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* BIO TAB */}
          {activeTab === "bio" && (
            <div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", marginBottom: "24px", color: "#fff" }}>Bio / Resume</h2>
              <div style={cardStyle}>
                <InputField label="Full Name" value={data.bio.name} onChange={(v) => updateBio("name", v)} />
                <InputField label="Title / Tagline" value={data.bio.title} onChange={(v) => updateBio("title", v)} />
                <InputField label="Location" value={data.bio.location} onChange={(v) => updateBio("location", v)} />
                <InputField label="About Text" value={data.bio.about} onChange={(v) => updateBio("about", v)} rows={4} />
                <InputField label="Resume URL" value={data.bio.resumeUrl} onChange={(v) => updateBio("resumeUrl", v)} />
              </div>

              {/* Education */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "28px 0 12px" }}>
                <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem", color: "#fff" }}>Education</h3>
                <button onClick={addEducation} style={miniBtn}>+ Add</button>
              </div>
              {(data.bio.education || []).map((edu, i) => (
                <div key={i} style={{ ...cardStyle, position: "relative" }}>
                  <button onClick={() => removeEducation(i)} style={{ ...removeBtn, position: "absolute", top: "12px", right: "12px" }}>✕</button>
                  <InputField label="Degree" value={edu.degree} onChange={(v) => updateEducation(i, "degree", v)} />
                  <InputField label="Institution" value={edu.institution} onChange={(v) => updateEducation(i, "institution", v)} />
                  <InputField label="Year" value={edu.year} onChange={(v) => updateEducation(i, "year", v)} />
                </div>
              ))}

              {/* Certifications */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "28px 0 12px" }}>
                <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem", color: "#fff" }}>Certifications</h3>
                <button onClick={addCertification} style={miniBtn}>+ Add</button>
              </div>
              {(data.bio.certifications || []).map((cert, i) => (
                <div key={i} style={{ ...cardStyle, display: "flex", gap: "12px", alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <InputField label={`Certification ${i + 1}`} value={cert} onChange={(v) => updateCertification(i, v)} />
                  </div>
                  <button onClick={() => removeCertification(i)} style={{ ...removeBtn, marginBottom: "16px" }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", color: "#fff" }}>Projects</h2>
                <button onClick={addProject} style={miniBtn}>+ Add Project</button>
              </div>
              {data.projects.map((project, i) => (
                <div key={project.id} style={{ ...cardStyle, position: "relative" }}>
                  <button onClick={() => removeProject(i)} style={{ ...removeBtn, position: "absolute", top: "12px", right: "12px" }}>Remove</button>
                  <InputField label="Title" value={project.title} onChange={(v) => updateProject(i, "title", v)} />
                  <InputField label="Description" value={project.description} onChange={(v) => updateProject(i, "description", v)} rows={3} />
                  <InputField label="Tags (comma-separated)" value={project.tags} onChange={(v) => updateProject(i, "tags", v)} />
                  <InputField label="GitHub URL" value={project.githubUrl} onChange={(v) => updateProject(i, "githubUrl", v)} />
                  <InputField label="Live Demo URL" value={project.liveUrl} onChange={(v) => updateProject(i, "liveUrl", v)} />
                  <InputField label="Emoji Icon" value={project.icon} onChange={(v) => updateProject(i, "icon", v)} />
                </div>
              ))}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === "skills" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", color: "#fff" }}>Skills</h2>
                <button onClick={addSkill} style={miniBtn}>+ Add Skill</button>
              </div>
              {data.skills.map((skill, i) => (
                <div key={i} style={{ ...cardStyle, display: "flex", gap: "12px", alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <InputField label="Skill Name" value={skill.name} onChange={(v) => updateSkill(i, "name", v)} />
                  </div>
                  <div style={{ width: "140px" }}>
                    <InputField label="Category" value={skill.category} onChange={(v) => updateSkill(i, "category", v)} />
                  </div>
                  <div style={{ width: "80px" }}>
                    <InputField label="Icon" value={skill.icon} onChange={(v) => updateSkill(i, "icon", v)} />
                  </div>
                  <button onClick={() => removeSkill(i)} style={{ ...removeBtn, marginBottom: "16px" }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* SOCIAL TAB */}
          {activeTab === "social" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", color: "#fff" }}>Social Links</h2>
                <button onClick={addSocial} style={miniBtn}>+ Add Link</button>
              </div>
              {data.social.map((link, i) => (
                <div key={i} style={{ ...cardStyle, position: "relative" }}>
                  <button onClick={() => removeSocial(i)} style={{ ...removeBtn, position: "absolute", top: "12px", right: "12px" }}>✕</button>
                  <InputField label="Platform" value={link.platform} onChange={(v) => updateSocial(i, "platform", v)} />
                  <InputField label="URL" value={link.url} onChange={(v) => updateSocial(i, "url", v)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

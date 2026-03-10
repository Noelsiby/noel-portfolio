import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  bioData,
  projectsData,
  skillsData,
  socialData,
} from "@/lib/data";

// Default data to fall back on
const defaults = {
  bio: bioData,
  projects: projectsData,
  skills: skillsData,
  social: socialData,
};

/* ═══════════════════════════════════════════════
   GET /api/data — Fetch all portfolio data
   ═══════════════════════════════════════════════ */
export async function GET() {
  // If Supabase isn't configured, return defaults
  if (!supabase) {
    return NextResponse.json(defaults);
  }

  try {
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("id, data");

    if (error) throw error;

    // Build response by merging DB data with defaults
    const result = { ...defaults };
    if (data) {
      data.forEach((row) => {
        if (row.id === "bio") {
          result.bio = { ...defaults.bio, ...row.data };
        } else if (row.id === "projects" && Array.isArray(row.data)) {
          result.projects = row.data;
        } else if (row.id === "skills" && Array.isArray(row.data)) {
          result.skills = row.data;
        } else if (row.id === "social" && Array.isArray(row.data)) {
          result.social = row.data;
        }
      });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Supabase GET error:", err);
    return NextResponse.json(defaults);
  }
}

/* ═══════════════════════════════════════════════
   POST /api/data — Save portfolio data (password-protected)
   ═══════════════════════════════════════════════ */
export async function POST(request) {
  try {
    const body = await request.json();
    const { password, data: portfolioData } = body;

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // If Supabase isn't configured, just acknowledge
    if (!supabase) {
      return NextResponse.json({
        success: true,
        message: "Supabase not configured — data not persisted. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
      });
    }

    // Upsert each data type
    const upserts = [
      { id: "bio", data: portfolioData.bio || defaults.bio },
      { id: "projects", data: portfolioData.projects || defaults.projects },
      { id: "skills", data: portfolioData.skills || defaults.skills },
      { id: "social", data: portfolioData.social || defaults.social },
    ];

    for (const item of upserts) {
      const { error } = await supabase
        .from("portfolio_data")
        .upsert(
          { id: item.id, data: item.data, updated_at: new Date().toISOString() },
          { onConflict: "id" }
        );

      if (error) {
        console.error(`Error upserting ${item.id}:`, error);
        return NextResponse.json(
          { error: `Failed to save ${item.id}: ${error.message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, message: "Data saved to Supabase!" });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: "Server error: " + err.message },
      { status: 500 }
    );
  }
}

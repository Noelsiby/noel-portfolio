# Supabase CMS Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**
3. Give it a name (e.g., `noel-portfolio`)
4. Choose a region close to you
5. Set a database password and click **Create Project**

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Paste and run this SQL:

```sql
CREATE TABLE portfolio_data (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO portfolio_data (id, data) VALUES ('bio', '{}');
INSERT INTO portfolio_data (id, data) VALUES ('projects', '[]');
INSERT INTO portfolio_data (id, data) VALUES ('skills', '[]');
INSERT INTO portfolio_data (id, data) VALUES ('social', '[]');

ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON portfolio_data FOR SELECT USING (true);
CREATE POLICY "Public insert" ON portfolio_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON portfolio_data FOR UPDATE USING (true);
```

3. Click **Run** — you should see "Success"

## Step 3: Get Your API Keys

1. Go to **Settings → API** in your Supabase dashboard
2. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (the long key under "Project API keys")

## Step 4: Configure Your Portfolio

Open `.env.local` in your project root and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
ADMIN_PASSWORD=choose_any_password
```

## Step 5: Install & Test Locally

```bash
npm install @supabase/supabase-js
npm run dev
```

1. Go to `http://localhost:3000/admin`
2. Enter your admin password in the header
3. Make edits and click **Save All**
4. Open `http://localhost:3000` in an **incognito window** — your edits should appear

## Step 6: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

In the Vercel dashboard, go to **Settings → Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `ADMIN_PASSWORD` | Your chosen admin password |

Redeploy after adding env variables. Done! 🎉

# Vercel Environment Variables Setup

## Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `jarviss-projects-54817d91/affiliate-site`
3. Click **Settings** → **Environment Variables**

## Step 2: Add Affiliate IDs

Copy and paste each line to add as an environment variable:

```
AMAZON_ASSOCIATE_TAG=jarvistaps-20
```

### AI Coding Tools
```
CURSOR_AI_REF=your_cursor_id
GITHUB_COPILOT_REF=your_github_id
V0_VERCEL_REF=your_v0_id
CODEIUM_REF=your_codeium_id
TABNINE_REF=your_tabnine_id
REPLIT_REF=your_replit_id
```

### Developer Tools
```
RAYCAST_REF=your_raycast_id
WARP_REF=your_warp_id
LINEAR_REF=your_linear_id
```

### Hosting & Database
```
RAILWAY_REF=your_railway_id
SUPABASE_REF=your_supabase_id
NEON_REF=your_neon_id
```

### AI Writing
```
JASPER_AFFILIATE_ID=your_jasper_id
COPY_AI_REF=your_copyai_id
WRITESONIC_REF=your_writesonic_id
```

### AI Voice & Audio
```
ELEVENLABS_REF=your_elevenlabs_id
MURF_AI_REF=your_murf_id
```

### AI Image & Video
```
RUNWAY_REF=your_runway_id
LEONARDO_AI_REF=your_leonardo_id
SYNTHESIA_REF=your_synthesia_id
HEYGEN_REF=your_heygen_id
```

### AI Productivity
```
NOTION_AI_REF=your_notion_id
MEM_AI_REF=your_mem_id
GRANOLA_REF=your_granola_id
REWIND_REF=your_rewind_id
```

### Security
```
ONE_PASSWORD_REF=your_1password_id
BITWARDEN_REF=your_bitwarden_id
PROTON_REF=your_proton_id
```

### AI Research
```
PERPLEXITY_REF=your_perplexity_id
CONSENSUS_REF=your_consensus_id
```

## Step 3: Save & Redeploy
1. Click **Add** for each variable
2. Select **Production** scope
3. Click **Save**
4. Vercel will auto-redeploy

## Quick Add All (Copy-Paste Format)
Add one at a time or in groups:

```
AMAZON_ASSOCIATE_TAG=jarvistaps-20
CURSOR_AI_REF=
GITHUB_COPILOT_REF=
V0_VERCEL_REF=
CODEIUM_REF=
TABNINE_REF=
RAYCAST_REF=
WARP_REF=
RAILWAY_REF=
SUPABASE_REF=
NEON_REF=
JASPER_AFFILIATE_ID=
COPY_AI_REF=
ELEVENLABS_REF=
NOTION_AI_REF=
ONE_PASSWORD_REF=
PERPLEXITY_REF=
```

## Step 4: Verify
After redeploying, check `/api/affiliate/programs` to see if IDs are loading correctly.

# Vercel Deployment Guide

## Setup Instructions

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Test the build locally**:
   ```bash
   npm run build
   ```

4. **Deploy to Vercel**:

   ### Option 1: Vercel CLI (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

   ### Option 2: GitHub Integration
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Set the Root Directory to `client`
   - Vercel will automatically detect the framework and settings

## Configuration Files Created

- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment
- Updated `vite.config.ts` - Fixed output directory

## Important Settings for Manual Deployment

If deploying manually through Vercel dashboard:

- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Environment Variables

If you have any environment variables, add them in Vercel dashboard under:
Project Settings → Environment Variables

## Build Verification

The build should create a `dist` directory with:
- `index.html`
- `assets/` folder with CSS and JS bundles
- `CBlack.png` and `CWhite.png` logo files

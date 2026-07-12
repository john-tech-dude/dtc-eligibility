# Vercel Deployment Guide

This guide explains how to deploy the DTC Eligibility project to Vercel with automatic GitHub deployments.

## Prerequisites

- Node.js and npm installed
- Git installed
- GitHub account
- Vercel account (free tier works)

## Initial Setup

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

This will open a browser window where you:
1. Go to `vercel.com/device`
2. Enter the code shown in terminal
3. Login to your Vercel account
4. Authorize the device connection

## Project Deployment

### 3. Navigate to Project Directory

```bash
cd /Users/g/Desktop/dtc_teaching_tool
```

### 4. Deploy to Vercel (First Time)

```bash
vercel
```

Answer the prompts:
- **Which team?**: Choose your team or username
- **Project?**: "Create new project" (or link existing)
- **Name?**: `dtc-eligibility` (or your preferred name)
- **Code directory?**: `./` (default)
- **Customize settings?**: `N` (No - use defaults for static site)
- **Customize advanced settings?**: `N` (No)

Vercel will deploy your site and provide:
- Production URL: `https://dtc-eligibility.vercel.app`
- Project dashboard URL

## GitHub Integration for Auto-Deployment

### 5. Link Project to Git Repository

```bash
vercel link
```

Answer the prompts:
- **Link repository to project?**: `yes`
- **Pull development environment variables?**: `yes`

This connects your local Git repository to the Vercel project.

### 6. Connect GitHub Repository (If Not Already Connected)

If you see an error connecting GitHub during the initial setup, you can connect it through the Vercel dashboard:

1. Go to: `https://vercel.com/dashboard`
2. Find your `dtc-eligibility` project
3. Click **"Settings"** → **"Git"**
4. Click **"Connect to Git Repository"**
5. Select your GitHub repository (`john-tech-dude/dtc-eligibility`)
6. Choose the branch to deploy (usually `main`)
7. Click **"Connect"**

## Test Auto-Deployment

### 7. Make a Test Change

```bash
# Add a test comment to verify deployment
echo "<!-- Test deployment -->" >> index.html

# Commit and push to GitHub
git add .
git commit -m "Test auto-deploy"
git push origin main
```

### 8. Verify Auto-Deployment

1. Check Vercel dashboard: `https://vercel.com/johnnymnemonic1s-projects/dtc-eligibility`
2. Look for new deployment with your commit message
3. Check production URL: `https://dtc-eligibility.vercel.app`
4. Verify the test comment appears in the page source

### 9. Clean Up Test

```bash
# Remove test comment
git checkout index.html
git add index.html
git commit -m "Remove test comment"
git push origin main
```

## Regular Workflow

### Making Updates to the Site

After setup, deploying updates is simple:

```bash
# Make your changes to files
git add .
git commit -m "Your descriptive message"
git push origin main

# Vercel automatically detects and deploys! 🚀
```

Vercel will:
- Detect the new commit
- Trigger automatic build
- Deploy to production
- Update your live site

## Project URLs

- **Live Site**: https://dtc-eligibility.vercel.app
- **Vercel Dashboard**: https://vercel.com/johnnymnemonic1s-projects/dtc-eligibility
- **Project Settings**: https://vercel.com/johnnymnemonic1s-projects/dtc-eligibility/settings

## Troubleshooting

### Deployment Fails

1. Check Vercel dashboard for error logs
2. Verify build settings are correct (should be minimal for static site)
3. Ensure all files are committed to Git

### GitHub Connection Issues

- Ensure repository is not private (or grant Vercel access if private)
- Verify repository name matches exactly
- Check that you have admin access to the repository

### Changes Not Appearing

1. Verify git push was successful
2. Check Vercel dashboard for deployment status
3. Clear browser cache (Cmd+Shift+R on Mac)
4. Check deployment logs in Vercel dashboard

### CLI Commands

```bash
# Link project again if needed
vercel link

# Deploy to production manually
vercel --prod

# Check project status
vercel inspect

# Logout from Vercel
vercel logout
```

## Vercel Project Settings

For this static HTML site, the recommended settings are:

- **Framework**: None/Other
- **Build Command**: (empty - not needed for static HTML)
- **Output Directory**: `./` (root directory)
- **Node Version**: Default (auto-detected)

## Important Notes

- The `.env.local` file was created and added to `.gitignore` for security
- Project is linked to Git repository for automatic deployments
- Every push to `main` branch triggers automatic deployment
- Deployment typically takes 1-2 minutes
- Previous deployments are preserved and can be rolled back if needed

## Quick Reference

```bash
# Deploy to Vercel (first time)
vercel

# Link Git repository
vercel link

# Deploy to production manually
vercel --prod

# Regular deployment workflow
git add .
git commit -m "message"
git push origin main
```

---

**Last Updated**: June 18, 2026  
**Vercel CLI Version**: 54.14.2  
**Node Version**: v23.10.0
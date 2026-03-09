# 🔥 Firebase Deployment Guide for GrowTech

Follow these steps to deploy your Ionic/Angular application to **Firebase Hosting**.

## 1. Prerequisites
Ensure you have the Firebase CLI installed and are logged in.

```bash
# Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools

# Login to your Google account
firebase login
```

## 2. Prepare the Application
Before deploying, you must generate a production build of your application.

```bash
# Generate a production build
npm run build
```
> [!NOTE]
> This will create a production-ready folder (usually `www` or `dist/business`) in your project root.

## 3. Initialize Firebase
If you haven't initialized Firebase in this project yet, run the following command:

```bash
firebase init
```

During initialization, select the following options:
1.  **Selection**: Use the arrow keys to select `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys` and press **Space**, then **Enter**.
2.  **Project Setup**: Select `Use an existing project` (if you already created one in the Firebase Console) or `Create a new project`.
3.  **Public Directory**: When asked "What do you want to use as your public directory?", type `www` (for Ionic) or `dist/business/browser` (check your `angular.json` for the exact output path).
4.  **Single-Page App**: Select **Yes** (Y) to "Configure as a single-page app (rewrite all urls to /index.html)".
5.  **GitHub Deploys**: Select **No** (N) unless you want to set up automatic CI/CD.

## 4. Deploy to Hosting
Once initialized, use this command whenever you want to push updates to the live site:

```bash
# Perform the deployment
firebase deploy --only hosting
```

## 📋 Summary of Deployment Routine
After the initial setup, your regular update flow will be:
1. `npm run build`
2. `firebase deploy --only hosting`

---
**GrowTech** | Strategic Web & Mobile Solutions


**Website Link** | https://growtech-business.web.app/about
# Netlify Deployment Guide

## Firebase Environment Variables Required

To deploy this Next.js application on Netlify, you need to configure the following environment variables in your Netlify dashboard:

### Required Environment Variables

1. **NEXT_PUBLIC_FIREBASE_API_KEY**
   - Your Firebase project API key
   - Found in Firebase Console > Project Settings > General > Web apps

2. **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
   - Your Firebase project auth domain
   - Format: `your-project-id.firebaseapp.com`

3. **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
   - Your Firebase project ID
   - Found in Firebase Console > Project Settings > General

4. **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
   - Your Firebase storage bucket
   - Format: `your-project-id.appspot.com`

5. **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
   - Your Firebase messaging sender ID
   - Found in Firebase Console > Project Settings > Cloud Messaging

6. **NEXT_PUBLIC_FIREBASE_APP_ID**
   - Your Firebase app ID
   - Found in Firebase Console > Project Settings > General > Web apps

### How to Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Environment variables
4. Click "Add variable"
5. Add each variable with its corresponding value
6. Click "Save"

### Additional Environment Variables (if using other services)

If you're using other services, you may also need:

- `MONGODB_URI` - MongoDB connection string
- `FIREBASE_PROJECT_ID` - For Firebase Admin SDK
- `FIREBASE_CLIENT_EMAIL` - For Firebase Admin SDK
- `FIREBASE_PRIVATE_KEY` - For Firebase Admin SDK
- `AWS_ACCESS_KEY_ID` - For AWS S3
- `AWS_SECRET_ACCESS_KEY` - For AWS S3
- `AWS_REGION` - For AWS S3

### Build Settings

- **Build command**: `pnpm run build`
- **Publish directory**: `.next`
- **Node version**: 18 (or higher)

### Important Notes

1. **All Firebase environment variables must be prefixed with `NEXT_PUBLIC_`** to be available in the browser
2. **Admin pages are now configured for dynamic rendering** to prevent build-time Firebase initialization errors
3. **The application will work without Firebase environment variables** for public pages, but admin functionality will be limited

### Troubleshooting

If you encounter build errors:

1. **Check that all required environment variables are set** in Netlify
2. **Verify the Firebase project configuration** matches your environment variables
3. **Check the build logs** for specific error messages
4. **Ensure Node.js version 18+** is being used

### Testing Locally

To test the build locally:

```bash
# Install dependencies
pnpm install

# Set environment variables (create .env.local file)
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Build the application
pnpm run build

# Start the production server
pnpm start
```

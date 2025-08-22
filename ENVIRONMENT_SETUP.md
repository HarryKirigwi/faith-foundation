# Environment Setup for Faith Feeds International

## Required Environment Variables

To use the donation functionality, you need to set up the following environment variable:

### 1. Create a `.env.local` file in the root directory

```bash
# Create the environment file
touch .env.local
```

### 2. Add the Stripe donation link

```env
NEXT_PUBLIC_STRIPE_DONATION_LINK=https://donate.stripe.com/5kQ3cvawfamT9c7aPP6J200
```

## How it works

- The donation link is stored in the `src/config/constants.js` file
- All donate buttons across the application use this centralized link
- The link opens in a new tab when clicked
- If the environment variable is not set, it falls back to the default Stripe link

## Files Updated

The following files have been updated to use the donation link:

1. **Landing Page** (`src/landing/page.js`) - Hero section donate button
2. **Services Page** (`src/services/page.js`) - Service cards donate buttons
3. **About Page** (`src/app/pages/about/page.js`) - CTA section donate button
4. **Projects Page** (`src/app/pages/projects/page.js`) - CTA section donate button
5. **What We Do Page** (`src/app/pages/whatwedo/page.js`) - Multiple donate buttons
6. **Footer** (`src/app/layout/footer/page.js`) - Support links section

## Testing

After setting up the environment variable:

1. Restart your development server
2. Click any "Donate Now" button on the site
3. Verify that it opens the Stripe donation page in a new tab

## Security Notes

- The `NEXT_PUBLIC_` prefix makes this variable available in the browser
- This is safe for donation links as they are meant to be public
- The link is read-only and cannot be modified by users




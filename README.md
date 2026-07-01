# Alabama Onas Multibiz Enterprises

## Overview

Alabama Onas Multibiz Enterprises is a land sales platform built for a Sagamu, Ogun State-based land business. The project is a responsive React + TypeScript frontend focused on one core goal: earning buyer trust before a single naira changes hands, for a business where most customers cannot physically inspect the land before deciding.

**Status note:** this project is in active early-stage development. The frontend scaffolding, design system, and page structure are in place; not all features described below are confirmed fully built or connected to a live backend at the time of writing. Treat the feature list as the project's defined scope rather than a completed checklist, and update this section as features are finished.

## Business Problem

Land buying in Nigeria carries a well-known risk: land grabbers, disputed titles, and fraudulent sellers. For this business, the biggest barrier to a sale isn't the land itself — it's convincing a buyer, often a Nigerian diaspora buyer who can't visit in person, that the seller and the land are legitimate. A generic listings site doesn't solve that; the platform has to actively build trust at every step.

## Solution

The platform is built around trust-first design decisions: the business owner's presence (photo, direct contact) as a visible trust signal, document-type badges on every listing, and a WhatsApp-first inquiry flow rather than a distant contact form — since most buyers, especially local ones, prefer to negotiate directly over WhatsApp.

## Features

The following reflects the project's defined scope. Items should be verified against the current codebase before being presented as complete.

- Public listings pages with plot details, document type, and availability status
- Single listing detail view
- About page introducing the business and owner
- Blog section for SEO-targeted content (land-buying guides, documentation explainers)
- WhatsApp-first inquiry flow with pre-filled context-specific messages (general inquiry, listing inquiry, plot reservation, pricing)
- Admin dashboard for a non-technical user to manage listings and view leads, designed to be usable from a mobile device
- Document-type badges (C of O, Governor's Consent, Excision, Survey) as a trust/verification signal
- Mobile-first, low-bandwidth-conscious performance targets (lazy-loaded routes and images, image size limits)

**Explicitly out of scope for this phase:** payment processing/checkout, buyer accounts, live chat (WhatsApp serves this role instead).

## Architecture Overview

The frontend is a React + TypeScript SPA built with Vite, using Tailwind CSS for styling and TanStack Query for data fetching. Routing is handled with React Router, and forms use React Hook Form with Zod validation. The project is designed to pair with a Node.js/Express/MongoDB backend for listings and inquiry data, with Cloudinary for image hosting — this backend integration should be confirmed against the current state of the repository rather than assumed complete.

## Tech Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- React Router v6
- TanStack (React) Query
- React Hook Form + Zod
- Framer Motion (used selectively, for performance)
- Google Maps Embed API (planned, for listing locations)

Backend (intended, verify current integration status): Node.js, Express, TypeScript, MongoDB/Mongoose.

## Live Demo

https://alabama-land.vercel.app

## Repository

https://github.com/mayowashehu/alabama-land

## Installation

```bash
# Clone the repository
git clone https://github.com/mayowashehu/alabama-land.git
cd alabama-land

# Install dependencies
pnpm install

# Configure environment variables
# Copy .env.example to .env and fill in:
VITE_WHATSAPP_NUMBER=
VITE_API_URL=
VITE_GOOGLE_MAPS_KEY=
VITE_CLOUDINARY_CLOUD_NAME=

# Run the app locally
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
app/           # Application routes/entry
components/    # Reusable and section-level UI components
hooks/         # Custom React hooks
lib/           # Utilities and shared logic
public/        # Static assets
src/           # Core application source
styles/        # Global and Tailwind styles
```

## Future Improvements

- Confirm and finalize backend API integration for listings and inquiries
- Complete the admin dashboard (listing CRUD, lead management)
- Add owner photo and real listing photography in place of placeholders
- Publish the initial blog content set
- Verify performance targets (Lighthouse mobile score, image lazy-loading) against the deployed build

## License

This project is currently unlicensed. All rights reserved unless a license is added.

## Contribution

This is a client project and not currently open for external contributions. Feel free to open an issue if you spot a bug or have a suggestion.

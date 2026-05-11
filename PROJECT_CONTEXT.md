# Alabama Onas Multibiz Enterprises — Project Context
# READ THIS ENTIRE FILE BEFORE WRITING A SINGLE LINE OF CODE.
# Every decision in this file is intentional. Do not override with defaults.

---

## Business
- Name: Alabama Onas Multibiz Enterprises
- Industry: Land sales (plots, estates)
- Location: Sagamu, Ogun State, Nigeria
- Owner: Mrs. Alaba Afusat
- WhatsApp: +2347082151926 (always format without spaces for wa.me links)
- Target launch: Production-ready, not a prototype

## Audience Psychology (this drives every UI decision)
- Primary buyer fear: Being scammed, land grabbers (Omo-onile), 
  fake documents. TRUST is the product, not the land.
- Primary buyer desire: Owning verified land before prices rise further.
- Buyer profiles:
  1. Nigerian diaspora (UK/US/Canada) — cannot visit, needs 
     video + documents to trust remotely
  2. Local Sagamu/Ogun buyers — on slow mobile networks, 
     will contact via WhatsApp not forms
  3. Developers/speculators — want bulk availability + clear titles
- Every page must answer this question silently: 
  "Can I trust this woman with my money?" 
  If a component does not answer YES — it does not belong.

---

## Brand

### Logo Wordmark
- "AO" initials: Uppercase Serif, font-weight 700
- The right leg of 'A' subtly brushes the curve of 'O' 
  (tight kerning, represents land and ownership unity)
- "ALABAMA ONAS" below initials: all-caps Sans-Serif, 
  letter-spacing: 0.2em (wide, stable base)
- "Multibiz Enterprises": 40% smaller, secondary row below
- Use this as a CSS/SVG text logo until a real SVG is provided

### Colors (never deviate from these)
- Primary:    #004225  (British Racing Green — authority, land fertility)
- Accent:     #B8860B  (Dark Goldenrod — deep wealth, not cheap yellow)
- Background: #FDFCF0  (Alabaster — warm off-white, premium feel)
- Text dark:  #1A1A1A  (near-black for body text)
- Text muted: #6B6B5E  (muted warm grey for secondary text)
- Success:    #2D6A4F  (available plots badge)
- Warning:    #B8860B  (reserved plots badge — reuse accent)
- Danger:     #7B2D2D  (sold plots badge)
- White:      #FFFFFF  (for text on dark backgrounds)

### Tailwind custom tokens (add to tailwind.config.ts):
colors: {
  primary: '#004225',
  accent: '#B8860B',
  surface: '#FDFCF0',
  'text-dark': '#1A1A1A',
  'text-muted': '#6B6B5E',
  available: '#2D6A4F',
  reserved: '#B8860B',
  sold: '#7B2D2D',
}

### Typography
- Display/Headlines: 'Playfair Display' (Google Fonts)
  → High-contrast serifs = sophistication + authority
  → Use for: H1, H2, section titles, price displays, owner name
- Body: 'Montserrat' (Google Fonts)  
  → Clean geometric sans-serif, legible on low-end Android phones
  → Use for: body text, nav, buttons, labels, badges, forms
- Import in index.html:
  Playfair Display: weights 400, 700
  Montserrat: weights 400, 500, 600

### Tagline
"Buy Peace, Build Legacy."
- "Buy Peace" = addresses Omo-onile/scam fear (primary pain)
- "Build Legacy" = addresses generational aspiration (primary desire)
- Use on: hero section, footer, meta description, og:title

---

## Owner — Mrs. Alaba Afusat
- Her face is a PRIMARY TRUST SIGNAL, not decoration
- Photo file: src/assets/images/owner.jpg (developer must request 
  this photo from client before launch — do not use placeholder in prod)
- Use a professional placeholder during development: 
  a green rectangle with "CEO Photo" label in the brand color

### Photo placement rules:
- Desktop: top-right of Hero section, vertical rectangular crop
- Mobile: centered, immediately below the H1 headline
- Shape: border-radius 8px top corners only
- Caption box below photo (gold-accented left border):
  "CEO: Mrs. Alabama Onas — Your Direct Link to Sagamu's Future."
- Caption style: small text, accent color left border (4px solid #B8860B)
- She is the brand. She appears on: Hero, About page, 
  blog article author section, footer (small).

---

## WhatsApp Strategy
- This is the PRIMARY conversion channel. Not forms. Not email. WhatsApp.
- All CTA buttons route to WhatsApp with pre-filled messages
- Float button: fixed bottom-right, always visible on every page, 
  pulsing green ring animation, never hidden
- WhatsApp utility file: src/utils/whatsapp.ts

### Pre-filled message templates:
general:  "Hi, I found your website and I'm interested in buying 
           land in Sagamu. Can you help me?"
listing:  "Hi, I'm interested in the [SIZE] plot at [ESTATE NAME] 
           listed at [PRICE]. Is it still available?"
reserve:  "Hi, I'd like to reserve plot [PLOT NUMBER] at 
           [ESTATE NAME]. What are the next steps?"
blog:     "Hi, I read your article on your website and I'd like 
           to know more about buying land in Sagamu."
pricing:  "Hi, I'd like to know more about your payment plans 
           for land in Sagamu."
docs:     "Hi, I'd like to verify the documents for the plot 
           at [ESTATE NAME] before making a decision."

### WhatsApp URL format:
https://wa.me/2347082151926?text=[encodeURIComponent(message)]
NEVER hardcode this number anywhere except src/utils/whatsapp.ts
Read it from: import.meta.env.VITE_WHATSAPP_NUMBER

---

## Tech Stack
- Frontend: React 18 + Vite + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript + MongoDB (Mongoose)
- Image hosting: Cloudinary
- Routing: React Router v6
- Server state: TanStack React Query
- Forms: React Hook Form + Zod validation
- Animations: Framer Motion (use sparingly — performance matters)
- Maps: Google Maps Embed API
- Deployment: Frontend → Vercel, Backend → Railway

## Performance Rules (non-negotiable)
- Mobile-first. Design for iPhone SE and low-end Android FIRST.
- Majority of users are on Nigerian 3G/4G mobile networks.
- All images must be lazy loaded (loading="lazy")
- No image served wider than 1200px
- Every route must be lazy loaded with React.lazy() + Suspense
- No animation that blocks page interaction
- Target Lighthouse mobile score: above 85
- Bundle size warning threshold: 250kb per chunk

---

## Environment Variables
Frontend (.env):
VITE_WHATSAPP_NUMBER=2347082151926
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_KEY=your_key_here
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

Backend (.env):
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173

RULE: Never hardcode any of these values. Always read from env.

---

## Pages & Routes
/ ......................... Homepage
/listings .................. All available plots
/listings/:slug ............ Single listing detail
/about ..................... About Mrs. Alaba + company story
/blog ...................... Blog article list
/blog/:slug ................ Single blog article
/admin/login ............... Admin login
/admin/listings ............ Manage listings
/admin/listings/new ........ Add new listing
/admin/listings/:id/edit ... Edit listing
/admin/leads ............... View all inquiries/leads

## Data Models (TypeScript interfaces)

Listing {
  _id, title, slug, estateName, plotNumber,
  size (e.g. "500sqm"), price (number, Naira),
  status: 'available' | 'reserved' | 'sold',
  documentType: 'c-of-o' | 'governors-consent' | 
                'excision' | 'survey',
  description, features: string[],
  images: { url: string, isPrimary: boolean }[],
  location: { address, lga, state, lat, lng },
  viewCount, createdAt, updatedAt
}

Inquiry {
  _id, listingId (ref), name, phone,
  whatsappPhone, message,
  status: 'new' | 'contacted' | 'closed',
  source: 'website' | 'whatsapp' | 'referral',
  createdAt
}

BlogPost {
  slug, title, excerpt, content (markdown),
  category, date, readTime, author: 'Mrs. Alaba Afusat'
}

---

## Trust Signals (must appear throughout the site)
- Owner photo: hero, about, blog author, footer
- Stats: "47 Plots Sold", "12 Estates Developed", 
         "100% Document Delivery"
- Document type badges on every listing card
- Testimonials: 3 minimum on homepage
- "Plots Remaining" urgency count on listing cards
- Physical address in footer (not just a website)
- CAC registration mention in footer/about
- No stock photos of random people — only real land photos
  and the owner's actual photo

## Document Badge Colors (consistent everywhere)
C of O:              bg #004225 text white  (most trusted)
Governor's Consent:  bg #2D6A4F text white
Excision:            bg #B8860B text white
Survey Only:         bg #6B6B5E text white  (least trusted)

---

## Blog Strategy
5 articles targeting high-value Google searches:
1. slug: land-for-sale-sagamu
   title: "Land for Sale in Sagamu: Complete 2025 Guide"
   keyword: "land for sale in sagamu ogun state"

2. slug: how-to-buy-land-ogun-state
   title: "How to Buy Land in Ogun State: Step by Step"
   keyword: "how to buy land in ogun state nigeria"

3. slug: what-is-certificate-of-occupancy-nigeria
   title: "What is a Certificate of Occupancy in Nigeria?"
   keyword: "what is certificate of occupancy nigeria"

4. slug: sagamu-land-prices-rising
   title: "Why Sagamu Land Prices Are Rising Fast"
   keyword: "why sagamu land prices are rising"

5. slug: buying-land-nigeria-diaspora
   title: "How to Buy Land in Nigeria From Abroad"
   keyword: "how to buy land in nigeria from abroad diaspora"

Each article ends with WhatsApp CTA using WA_MESSAGES.blog

---

## Admin Dashboard Rules
- Designed for a NON-TECHNICAL user (Mrs. Alaba Afusat)
- Every destructive action needs a confirmation dialog
- Forms must have clear labels, no jargon
- Success/error toasts after every action
- She must be able to add a new listing in under 2 minutes
- Mobile-responsive (she may manage from her phone)
- No complex charts — just simple tables and counts

## Component Naming Conventions
- Pages: PascalCase in /src/pages/ (Home.tsx, Listings.tsx)
- Reusable UI: /src/components/ui/ (Button.tsx, Badge.tsx, Card.tsx)
- Layout: /src/components/layout/ 
  (Navbar.tsx, Footer.tsx, WhatsAppFloat.tsx, AdminLayout.tsx)
- Sections (homepage): /src/components/sections/
  (HeroSection.tsx, StatsSection.tsx, FeaturedListings.tsx,
   OwnerTrustSection.tsx, TestimonialsSection.tsx)
- Hooks: camelCase in /src/hooks/ (useListings.ts, useInquiry.ts)
- Utils: camelCase in /src/utils/ (whatsapp.ts, format.ts, seo.ts)

## Formatting Utilities (src/utils/format.ts)
- formatPrice(amount: number): string 
  → returns "₦2,500,000" (always Naira, always comma-separated)
- formatSize(size: string): string 
  → returns "500 sqm"
- formatDate(date: string): string 
  → returns "January 15, 2025"

---

## SEO Rules
- Every page has unique <title> and <meta description>
- Title format: "[Page Topic] | Alabama Onas — Sagamu Land"
- Meta description always includes: Sagamu, land, Ogun State
- Every listing page has og:image set to listing primary photo
- Homepage og:image is owner photo
- All blog posts have og:image (use a green branded placeholder 
  if no custom image)
- Use react-helmet-async for all meta tags

## 404 Page
- Branded (logo + colors)
- Message: "This page doesn't exist — but land in Sagamu does."
- Button: "View Available Plots" → /listings
- Second link: "Chat with us on WhatsApp" → WA_MESSAGES.general

---

## What This Project Is NOT
- Not an e-commerce site. No cart, no checkout.
- Not a booking platform. Reservation is handled via WhatsApp.
- Not a social network. No user accounts for buyers.
- Paystack integration is Phase 2 — do not add it now.
- No live chat widget — WhatsApp IS the live chat.
- No complex animations that slow down mobile load time.

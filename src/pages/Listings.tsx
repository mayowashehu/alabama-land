import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Listing, DocumentType, ListingStatus } from '../types/listing';
import { formatPrice, formatSize, getDocumentBadgeColor, getStatusBadgeColor } from '../utils/format';
import { getWhatsAppLink } from '../utils/whatsapp';

const MOCK_LISTINGS: Listing[] = [
  {
    _id: '1', title: 'Premium Plot at Lakeside Estate', slug: 'premium-plot-lakeside',
    estateName: 'Lakeside Estate', plotNumber: 'A-156', size: '650 sqm', price: 15000000,
    status: 'available' as ListingStatus, documentType: 'c-of-o' as DocumentType,
    description: 'Spacious residential plot with perfect building structure in premium estate.',
    features: ['Corner plot', 'Good access road', 'Verified documents'],
    images: [{ url: '/images/listing-1.jpg', isPrimary: true }, { url: '/images/listing-1-alt.jpg', isPrimary: false }],
    location: { address: 'Km 50 Sagamu-Abeokuta Road', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 124, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '2', title: 'Family Plot in Green Valley', slug: 'family-plot-green-valley',
    estateName: 'Green Valley Estate', plotNumber: 'B-234', size: '500 sqm', price: 12000000,
    status: 'reserved' as ListingStatus, documentType: 'governors-consent' as DocumentType,
    description: 'Ideal for family homes, peaceful environment with modern amenities.',
    features: ['Quiet location', 'Good drainage', 'School nearby'],
    images: [{ url: '/images/listing-2.jpg', isPrimary: true }, { url: '/images/listing-2-alt.jpg', isPrimary: false }],
    location: { address: 'Green Valley District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 87, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '3', title: 'Investment Plot in Central Sagamu', slug: 'investment-plot-central',
    estateName: 'Central Heights', plotNumber: 'C-567', size: '1000 sqm', price: 25000000,
    status: 'available' as ListingStatus, documentType: 'excision' as DocumentType,
    description: 'Prime commercial location with high appreciation potential.',
    features: ['High traffic area', 'Commercial zoning', 'Water supply'],
    images: [{ url: '/images/listing-3.jpg', isPrimary: true }, { url: '/images/listing-3-alt.jpg', isPrimary: false }],
    location: { address: 'Central Business District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 256, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '4', title: 'Affordable Plot in Sunrise Gardens', slug: 'affordable-plot-sunrise',
    estateName: 'Sunrise Gardens', plotNumber: 'D-789', size: '400 sqm', price: 8000000,
    status: 'sold' as ListingStatus, documentType: 'survey' as DocumentType,
    description: 'Budget-friendly option perfect for first-time buyers.',
    features: ['Accessible price', 'Growing neighborhood', 'Good security'],
    images: [{ url: '/images/listing-4.jpg', isPrimary: true }, { url: '/images/listing-4-alt.jpg', isPrimary: false }],
    location: { address: 'Sunrise Gardens District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 203, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '5', title: 'Developer Plot at Prestige Park', slug: 'developer-plot-prestige',
    estateName: 'Prestige Park', plotNumber: 'E-456', size: '1500 sqm', price: 35000000,
    status: 'available' as ListingStatus, documentType: 'c-of-o' as DocumentType,
    description: 'Large plot suitable for residential or commercial development.',
    features: ['Bulk land', 'Flexible layout', 'Investor-friendly'],
    images: [{ url: '/images/listing-5.jpg', isPrimary: true }, { url: '/images/listing-5-alt.jpg', isPrimary: false }],
    location: { address: 'Prestige Park Zone', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 312, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '6', title: 'Waterfront Plot in Riverside', slug: 'waterfront-plot-riverside',
    estateName: 'Riverside Estate', plotNumber: 'F-321', size: '750 sqm', price: 20000000,
    status: 'available' as ListingStatus, documentType: 'governors-consent' as DocumentType,
    description: 'Unique waterfront location with stunning views.',
    features: ['Water frontage', 'Premium location', 'Scenic views'],
    images: [{ url: '/images/listing-6.jpg', isPrimary: true }, { url: '/images/listing-6-alt.jpg', isPrimary: false }],
    location: { address: 'Riverside District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 189, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

const DOC_LABEL: Record<DocumentType, string> = {
  'c-of-o': 'C of O',
  'governors-consent': "Gov't Consent",
  excision: 'Excision',
  survey: 'Survey',
};

const STATUS_STYLES: Record<ListingStatus, string> = {
  available: 'text-[#6db87a]',
  reserved: 'text-[#d4b87a]',
  sold: 'text-[#f5f0e8]/30',
};

interface Filters {
  status: 'all' | ListingStatus;
  documentType: 'all' | DocumentType;
  minPrice: string;
  maxPrice: string;
}

const IMG_STYLE = { filter: 'grayscale(10%) contrast(1.04)' };

function ListingCard({ listing, index }: { listing: Listing; index: number }): JSX.Element {
  const waHref = getWhatsAppLink('listing', {
    estate: listing.estateName,
    size: listing.size,
    price: formatPrice(listing.price),
  });

  const isSold = listing.status === 'sold';

  return (
    <article className="flex flex-col bg-[#131f14] border border-white/[0.07] group transition-colors duration-300 hover:border-[#b8975a]/30">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={listing.images[0]?.url}
          alt={`${listing.estateName} — ${listing.plotNumber}`}
          className={`w-full h-full object-cover transition-transform duration-700 ${isSold ? 'grayscale opacity-40' : 'group-hover:scale-[1.03]'}`}
          style={isSold ? undefined : IMG_STYLE}
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1810]/80 via-transparent to-transparent" />

        {/* Index */}
        <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/40">
          {'0' + (index + 1)}
        </span>

        {/* Doc type */}
        <span className="absolute top-4 right-4 font-sans text-[10px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 border border-[#b8975a]/50 text-[#b8975a] bg-[#0f1810]/60 backdrop-blur-sm">
          {DOC_LABEL[listing.documentType]}
        </span>

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-cormorant text-[clamp(32px,5vw,48px)] font-medium tracking-[0.3em] text-[#f5f0e8]/20 -rotate-12 select-none">
              SOLD
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-4 h-px bg-[#b8975a]/50" />
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#b8975a]/70">
            {listing.estateName}
          </span>
        </div>

        <p className="font-sans text-xs tracking-wide text-[#f5f0e8]/40 mb-1">
          {listing.plotNumber}
          {' · '}
          {formatSize(listing.size)}
        </p>

        <div className="flex items-baseline justify-between mb-1">
          <p className="font-cormorant text-[clamp(24px,2.5vw,32px)] font-medium leading-none text-[#f5f0e8]">
            {formatPrice(listing.price)}
          </p>
          <span className={`font-sans text-[10px] tracking-[0.12em] uppercase font-medium ${STATUS_STYLES[listing.status]}`}>
            {listing.status}
          </span>
        </div>

        <span className="block w-full h-px bg-white/[0.06] my-5" />

        <div className="flex items-center gap-3 mt-auto">
          <Link
            to={`/listings/${listing.slug}`}
            className="flex-1 text-center font-sans text-[11px] font-medium tracking-widest uppercase py-3 border border-white/15 text-[#f5f0e8]/60 transition-all duration-200 hover:border-white/30 hover:text-[#f5f0e8]"
          >
            View Details
          </Link>
          {!isSold && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-sans text-[11px] font-medium tracking-widest uppercase py-3 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a]"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Listings(): JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    documentType: 'all',
    minPrice: '',
    maxPrice: '',
  });

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((l) => {
      if (filters.status !== 'all' && l.status !== filters.status) return false;
      if (filters.documentType !== 'all' && l.documentType !== filters.documentType) return false;
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      if (l.price < min || l.price > max) return false;
      return true;
    });
  }, [filters]);

  const hasFilters =
    filters.status !== 'all' ||
    filters.documentType !== 'all' ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  const clearFilters = () =>
    setFilters({ status: 'all', documentType: 'all', minPrice: '', maxPrice: '' });

  const selectClass =
    'w-full bg-[#131f14] border border-white/[0.08] px-3 py-2.5 font-sans text-[12px] text-[#f5f0e8]/70 tracking-wide focus:outline-none focus:border-[#b8975a]/50 transition-colors';
  const inputClass =
    'w-full bg-[#131f14] border border-white/[0.08] px-3 py-2.5 font-sans text-[12px] text-[#f5f0e8]/70 placeholder-[#f5f0e8]/20 tracking-wide focus:outline-none focus:border-[#b8975a]/50 transition-colors';
  const labelClass =
    'block font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/60 mb-2';

  return (
    <>
      <Helmet>
        <title>Available Plots in Sagamu | Alabama Onas Multibiz Enterprises</title>
        <meta name="description" content="Browse verified land plots in Sagamu. Transparent pricing, verified documents." />
      </Helmet>

      <div className="min-h-screen bg-[#0f1810] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-16">

          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#b8975a]" />
              <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                Sagamu, Ogun State
              </span>
            </div>
            <h1 className="font-cormorant text-[clamp(32px,5vw,56px)] font-medium leading-[1.1] text-[#f5f0e8] mb-3">
              Available Plots
            </h1>
            <p className="font-sans text-sm font-light text-[#f5f0e8]/45 max-w-md">
              Verified land with clear titles. No middlemen. Direct from Mrs. Alabama Onas.
            </p>
          </div>

          {/* Filter bar */}
          <div className="bg-[#131f14] border border-white/[0.07] p-6 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value as Filters['status'] }))}
                  className={selectClass}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Document Type</label>
                <select
                  value={filters.documentType}
                  onChange={(e) => setFilters((p) => ({ ...p, documentType: e.target.value as Filters['documentType'] }))}
                  className={selectClass}
                >
                  <option value="all">All Types</option>
                  <option value="c-of-o">Certificate of Occupancy</option>
                  <option value="governors-consent">Governor&apos;s Consent</option>
                  <option value="excision">Excision</option>
                  <option value="survey">Survey</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Min Price (₦)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Max Price (₦)</label>
                <input
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a]/60 hover:text-[#b8975a] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="font-sans text-[12px] text-[#f5f0e8]/30 tracking-wide mb-8">
            <span className="text-[#f5f0e8]/60">{filteredListings.length}</span>
            {' of '}
            <span className="text-[#f5f0e8]/60">{MOCK_LISTINGS.length}</span>
            {' plots'}
          </p>

          {/* Grid */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
              {filteredListings.map((listing, i) => (
                <ListingCard key={listing._id} listing={listing} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 border border-white/[0.06]">
              <p className="font-cormorant text-xl italic text-[#f5f0e8]/30 mb-4">
                No plots match your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a]/60 hover:text-[#b8975a] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Listing, DocumentType, ListingStatus } from '../types/listing';
import { formatPrice, formatSize } from '../utils/format';
import { getWhatsAppLink } from '../utils/whatsapp';
import NotFound from './NotFound';

const MOCK_LISTINGS: Listing[] = [
  {
    _id: '1', title: 'Premium Plot at Lakeside Estate', slug: 'premium-plot-lakeside',
    estateName: 'Lakeside Estate', plotNumber: 'A-156', size: '650 sqm', price: 15000000,
    status: 'available' as ListingStatus, documentType: 'c-of-o' as DocumentType,
    description: 'Spacious residential plot with perfect building structure in premium estate. Located in one of Sagamu\'s most prestigious neighborhoods, this plot offers exceptional value and growth potential. The estate has excellent security, paved roads, and is close to major amenities.',
    features: ['Corner plot', 'Good access road', 'Verified documents', 'Gated estate', 'Amenities nearby'],
    images: [{ url: '/images/listing-1.jpg', isPrimary: true }, { url: '/images/listing-1-alt.jpg', isPrimary: false }, { url: '/images/listing-1-alt2.jpg', isPrimary: false }],
    location: { address: 'Km 50 Sagamu-Abeokuta Road', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 124, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '2', title: 'Family Plot in Green Valley', slug: 'family-plot-green-valley',
    estateName: 'Green Valley Estate', plotNumber: 'B-234', size: '500 sqm', price: 12000000,
    status: 'reserved' as ListingStatus, documentType: 'governors-consent' as DocumentType,
    description: 'Ideal for family homes, peaceful environment with modern amenities. This tranquil location is perfect for building your dream home. The estate is well-maintained with 24/7 security and community facilities.',
    features: ['Quiet location', 'Good drainage', 'School nearby', 'Water supply', 'Community center'],
    images: [{ url: '/images/listing-2.jpg', isPrimary: true }, { url: '/images/listing-2-alt.jpg', isPrimary: false }, { url: '/images/listing-2-alt2.jpg', isPrimary: false }],
    location: { address: 'Green Valley District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 87, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '3', title: 'Investment Plot in Central Sagamu', slug: 'investment-plot-central',
    estateName: 'Central Heights', plotNumber: 'C-567', size: '1000 sqm', price: 25000000,
    status: 'available' as ListingStatus, documentType: 'excision' as DocumentType,
    description: 'Prime commercial location with high appreciation potential. Strategically positioned in the heart of Sagamu\'s business district, this large plot is ideal for commercial development, retail, or high-rise residential projects.',
    features: ['High traffic area', 'Commercial zoning', 'Water supply', 'Power supply', 'Road frontage'],
    images: [{ url: '/images/listing-3.jpg', isPrimary: true }, { url: '/images/listing-3-alt.jpg', isPrimary: false }, { url: '/images/listing-3-alt2.jpg', isPrimary: false }],
    location: { address: 'Central Business District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 256, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '4', title: 'Affordable Plot in Sunrise Gardens', slug: 'affordable-plot-sunrise',
    estateName: 'Sunrise Gardens', plotNumber: 'D-789', size: '400 sqm', price: 8000000,
    status: 'sold' as ListingStatus, documentType: 'survey' as DocumentType,
    description: 'Budget-friendly option perfect for first-time buyers. This plot has been sold but demonstrates the quality and value we offer. Contact Mrs. Alabama Onas to explore similar alternatives.',
    features: ['Accessible price', 'Growing neighborhood', 'Good security', 'Easy access road', 'Flexible terms'],
    images: [{ url: '/images/listing-4.jpg', isPrimary: true }, { url: '/images/listing-4-alt.jpg', isPrimary: false }, { url: '/images/listing-4-alt2.jpg', isPrimary: false }],
    location: { address: 'Sunrise Gardens District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 203, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '5', title: 'Developer Plot at Prestige Park', slug: 'developer-plot-prestige',
    estateName: 'Prestige Park', plotNumber: 'E-456', size: '1500 sqm', price: 35000000,
    status: 'available' as ListingStatus, documentType: 'c-of-o' as DocumentType,
    description: 'Large plot suitable for residential or commercial development. Perfect for developers and serious investors. This premium parcel offers flexibility in design and usage.',
    features: ['Bulk land', 'Flexible layout', 'Investor-friendly', 'Master plan available', 'Investment potential'],
    images: [{ url: '/images/listing-5.jpg', isPrimary: true }, { url: '/images/listing-5-alt.jpg', isPrimary: false }, { url: '/images/listing-5-alt2.jpg', isPrimary: false }],
    location: { address: 'Prestige Park Zone', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 312, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '6', title: 'Waterfront Plot in Riverside', slug: 'waterfront-plot-riverside',
    estateName: 'Riverside Estate', plotNumber: 'F-321', size: '750 sqm', price: 20000000,
    status: 'available' as ListingStatus, documentType: 'governors-consent' as DocumentType,
    description: 'Unique waterfront location with stunning views. This exclusive plot is rarely available and offers unparalleled beauty and investment potential.',
    features: ['Water frontage', 'Premium location', 'Scenic views', 'Exclusive area', 'High ROI potential'],
    images: [{ url: '/images/listing-6.jpg', isPrimary: true }, { url: '/images/listing-6-alt.jpg', isPrimary: false }, { url: '/images/listing-6-alt2.jpg', isPrimary: false }],
    location: { address: 'Riverside District', lga: 'Sagamu', state: 'Ogun State', lat: 6.8389, lng: 3.6372 },
    viewCount: 189, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

const DOC_FULL_LABEL: Record<DocumentType, string> = {
  'c-of-o': 'Certificate of Occupancy',
  'governors-consent': "Governor's Consent",
  excision: 'Excision',
  survey: 'Survey',
};

const STATUS_COLOR: Record<ListingStatus, string> = {
  available: 'text-[#6db87a]',
  reserved: 'text-[#d4b87a]',
  sold: 'text-[#f5f0e8]/30',
};

const IMG_STYLE = { filter: 'grayscale(10%) contrast(1.04)' };

function PhotoGallery({ images }: { images: Listing['images'] }): JSX.Element {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="w-full aspect-[16/10] overflow-hidden bg-[#131f14] mb-3">
        <img
          src={images[active]?.url}
          alt="Plot view"
          className="w-full h-full object-cover"
          style={IMG_STYLE}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.slice(0, 3).map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-16 w-24 overflow-hidden border transition-colors duration-200 flex-shrink-0 ${
              active === i ? 'border-[#b8975a]' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <img
              src={img.url}
              alt={`View ${i + 1}`}
              className="w-full h-full object-cover"
              style={IMG_STYLE}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ListingDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const listing = MOCK_LISTINGS.find((l) => l.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!listing) return <NotFound />;

  const otherListings = MOCK_LISTINGS.filter((l) => l.slug !== slug).slice(0, 3);
  const isSold = listing.status === 'sold';

  const reserveHref = getWhatsAppLink('reserve', {
    estate: listing.estateName,
    size: listing.plotNumber,
  });
  const questionHref = getWhatsAppLink('listing', {
    estate: listing.estateName,
    size: listing.size,
    price: formatPrice(listing.price),
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const detailRows = [
    { label: 'Size', value: formatSize(listing.size) },
    { label: 'Location', value: listing.location.lga },
    { label: 'Estate', value: listing.estateName },
    { label: 'Document', value: DOC_FULL_LABEL[listing.documentType] },
    { label: 'Plot Number', value: listing.plotNumber },
    { label: 'Status', value: listing.status.charAt(0).toUpperCase() + listing.status.slice(1) },
  ];

  return (
    <>
      <Helmet>
        <title>{listing.size} Plot in {listing.estateName} | Alabama Onas</title>
        <meta name="description" content={listing.description} />
        <meta property="og:title" content={listing.title} />
        <meta property="og:description" content={listing.description} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="min-h-screen bg-[#0f1810] pt-24 pb-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 font-sans text-[11px] tracking-[0.1em] uppercase text-[#f5f0e8]/25">
            <Link to="/" className="hover:text-[#f5f0e8]/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/listings" className="hover:text-[#f5f0e8]/60 transition-colors">Listings</Link>
            <span>/</span>
            <span className="text-[#b8975a]/60">{listing.estateName}</span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">

            {/* Left: Gallery + details */}
            <div className="lg:col-span-2">
              <PhotoGallery images={listing.images} />

              {/* Plot specs table */}
              <div className="mt-10 border border-white/[0.07]">
                <div className="grid grid-cols-2">
                  {detailRows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`p-5 border-white/[0.06] ${i % 2 === 0 ? 'border-r' : ''} ${i >= 2 ? 'border-t' : ''}`}
                    >
                      <p className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/50 mb-1.5">
                        {row.label}
                      </p>
                      <p className="font-sans text-sm text-[#f5f0e8]/75">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-px bg-[#b8975a]" />
                  <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                    About this plot
                  </span>
                </div>
                <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/55 mb-10">
                  {listing.description}
                </p>

                {/* Features */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-px bg-[#b8975a]" />
                  <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                    Key features
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {listing.features.map((f, i) => (
                    <div
                      key={f}
                      className={`flex items-start gap-4 py-4 border-t border-white/[0.06] ${i % 2 === 0 && i + 1 < listing.features.length ? 'sm:border-r sm:border-white/[0.06]' : ''}`}
                    >
                      <span className="font-cormorant text-[13px] text-[#b8975a] mt-0.5 flex-shrink-0">
                        {'0' + (i + 1)}
                      </span>
                      <span className="font-sans text-sm font-light text-[#f5f0e8]/60">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-px bg-[#b8975a]" />
                  <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                    Location
                  </span>
                </div>
                <div className="w-full h-64 bg-[#131f14] border border-white/[0.07] flex flex-col items-center justify-center gap-2">
                  <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#b8975a]/50">
                    {listing.location.address}
                  </span>
                  <span className="font-cormorant text-base italic text-[#f5f0e8]/20">
                    {listing.location.lga}, {listing.location.state}
                  </span>
                  <span className="font-sans text-[10px] text-[#f5f0e8]/15 mt-1">
                    {listing.location.lat}, {listing.location.lng}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Sticky sidebar */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-[#131f14] border border-white/[0.07] p-7">

                {/* Price */}
                <p className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/50 mb-1">
                  Asking Price
                </p>
                <p className="font-cormorant text-[clamp(32px,4vw,44px)] font-medium leading-none text-[#f5f0e8] mb-2">
                  {formatPrice(listing.price)}
                </p>

                {/* Status + Doc type */}
                <div className="flex items-center gap-3 mb-7 mt-3">
                  <span className={`font-sans text-[10px] tracking-[0.12em] uppercase font-medium ${STATUS_COLOR[listing.status]}`}>
                    {listing.status}
                  </span>
                  <span className="block w-px h-3 bg-white/20" aria-hidden="true" />
                  <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-[#b8975a]/60">
                    {DOC_FULL_LABEL[listing.documentType]}
                  </span>
                </div>

                <span className="block w-full h-px bg-white/[0.06] mb-7" />

                {/* CTAs */}
                <div className="flex flex-col gap-3 mb-7">
                  {!isSold ? (
                    <>
                      <a
                        href={reserveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a]"
                      >
                        Reserve via WhatsApp
                      </a>
                      <a
                        href={questionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 border border-white/15 text-[#f5f0e8]/60 transition-all duration-200 hover:border-white/30 hover:text-[#f5f0e8]"
                      >
                        Ask a Question
                      </a>
                    </>
                  ) : (
                    <a
                      href={questionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a]"
                    >
                      Find Similar Plots
                    </a>
                  )}
                </div>

                <span className="block w-full h-px bg-white/[0.06] mb-6" />

                {/* Share */}
                <p className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/50 mb-4">
                  Share this plot
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 font-sans text-[11px] tracking-wider uppercase py-2.5 border border-white/10 text-[#f5f0e8]/40 hover:border-white/20 hover:text-[#f5f0e8]/60 transition-all"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out this ${listing.size} plot in ${listing.estateName}: ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-sans text-[11px] tracking-wider uppercase py-2.5 bg-[#b8975a]/15 text-[#b8975a] border border-[#b8975a]/25 hover:bg-[#b8975a]/25 transition-all"
                  >
                    WhatsApp
                  </a>
                </div>

                {/* View count */}
                <p className="font-sans text-[10px] text-[#f5f0e8]/15 text-center mt-6 tracking-wide">
                  {listing.viewCount} people viewed this plot
                </p>
              </div>
            </div>
          </div>

          {/* Other plots */}
          <div className="border-t border-white/[0.06] pt-16">
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-6 h-px bg-[#b8975a]" />
              <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                Other available plots
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
              {otherListings.map((other) => (
                <Link
                  key={other._id}
                  to={`/listings/${other.slug}`}
                  className="flex flex-col bg-[#131f14] border-0 group transition-colors duration-300 hover:bg-[#162018]"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={other.images[0]?.url}
                      alt={other.estateName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={IMG_STYLE}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1810]/70 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 font-sans text-[9px] font-medium tracking-[0.14em] uppercase px-2 py-1 border border-[#b8975a]/50 text-[#b8975a] bg-[#0f1810]/60 backdrop-blur-sm">
                      {other.size}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <p className="font-sans text-xs tracking-wide text-[#f5f0e8]/40 mb-2">
                      {other.estateName}
                    </p>
                    <p className="font-cormorant text-lg font-medium text-[#f5f0e8] mb-auto">
                      {formatPrice(other.price)}
                    </p>
                    <span className="block w-full h-px bg-white/[0.06] my-4" />
                    <Link
                      to={`/listings/${other.slug}`}
                      className="text-center font-sans text-[11px] font-medium tracking-widest uppercase py-2.5 border border-white/15 text-[#f5f0e8]/60 hover:border-white/30 hover:text-[#f5f0e8] transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

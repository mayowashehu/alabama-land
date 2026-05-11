import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import { getWhatsAppLink } from '../../utils/whatsapp';

interface MockListing {
  id: string;
  slug: string;
  estateName: string;
  plotNumber: string;
  size: string;
  price: number;
  documentType: 'c-of-o' | 'governors-consent' | 'excision' | 'survey';
  status: 'available' | 'reserved' | 'sold';
  plotsRemaining: number;
  image: string;
}

const MOCK_LISTINGS: MockListing[] = [
  {
    id: '1',
    slug: 'sagamu-estate-500sqm',
    estateName: 'Sagamu Elite Estate',
    plotNumber: 'Plot 47',
    size: '500 sqm',
    price: 2500000,
    documentType: 'c-of-o',
    status: 'available',
    plotsRemaining: 3,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: '2',
    slug: 'ogun-state-plot-1000',
    estateName: 'Ogun Valley Residences',
    plotNumber: 'Plot 102',
    size: '1000 sqm',
    price: 4800000,
    documentType: 'governors-consent',
    status: 'available',
    plotsRemaining: 2,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
  },
  {
    id: '3',
    slug: 'sagamu-premium-750',
    estateName: 'Sagamu Premium Park',
    plotNumber: 'Plot 15',
    size: '750 sqm',
    price: 3200000,
    documentType: 'excision',
    status: 'available',
    plotsRemaining: 5,
    image: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80',
  },
];

const DOC_LABEL: Record<MockListing['documentType'], string> = {
  'c-of-o': 'C of O',
  'governors-consent': "Gov't Consent",
  excision: 'Excision',
  survey: 'Survey',
};

const IMG_STYLE = { filter: 'grayscale(10%) contrast(1.04)' };

function ListingCard({ listing, index }: { listing: MockListing; index: number }): JSX.Element {
  const waHref = getWhatsAppLink('listing', {
    size: listing.size,
    estate: listing.estateName,
    price: formatPrice(listing.price),
  });

  return (
    <article className="flex flex-col bg-[#131f14] border border-white/[0.07] group transition-colors duration-300 hover:border-[#b8975a]/30">

      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={listing.image}
          alt={`${listing.estateName} — ${listing.plotNumber}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={IMG_STYLE}
          loading="lazy"
        />

        {/* Dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1810]/80 via-transparent to-transparent" />

        {/* Index mark */}
        <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/40">
          {'0' + (index + 1)}
        </span>

        {/* Doc type badge */}
        <span className="absolute top-4 right-4 font-sans text-[10px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 border border-[#b8975a]/50 text-[#b8975a] bg-[#0f1810]/60 backdrop-blur-sm">
          {DOC_LABEL[listing.documentType]}
        </span>

        {/* Plots remaining — bottom of image */}
        {listing.plotsRemaining <= 4 && (
          <span className="absolute bottom-4 left-4 font-sans text-[10px] font-medium tracking-[0.12em] uppercase text-[#f5f0e8]/60">
            {listing.plotsRemaining === 1
              ? '1 plot remaining'
              : `${listing.plotsRemaining} plots remaining`}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">

        {/* Estate name + plot */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-4 h-px bg-[#b8975a]/50" />
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#b8975a]/70">
            {listing.estateName}
          </span>
        </div>

        <p className="font-sans text-xs tracking-wide text-[#f5f0e8]/40 mb-1">
          {listing.plotNumber}
          {' · '}
          {listing.size}
        </p>

        <p className="font-cormorant text-[clamp(28px,3vw,36px)] font-medium leading-none text-[#f5f0e8] mb-6">
          {formatPrice(listing.price)}
        </p>

        {/* Divider */}
        <span className="block w-full h-px bg-white/[0.06] mb-6" />

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <Link
            to={`/listings/${listing.slug}`}
            className="flex-1 text-center font-sans text-[12px] font-medium tracking-widest uppercase py-3 border border-white/15 text-[#f5f0e8]/60 transition-all duration-200 hover:border-white/30 hover:text-[#f5f0e8]"
          >
            View Details
          </Link>
          <a
            href={waHref}
            className="flex-1 text-center font-sans text-[12px] font-medium tracking-widest uppercase py-3 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a]"
          >
            WhatsApp
          </a>
        </div>
      </div>

    </article>
  );
}

export function FeaturedListings(): JSX.Element {
  return (
    <section className="w-full bg-[#0c1610] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 lg:mb-18">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#b8975a]" />
              <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                {'Available now'}
              </span>
            </div>
            <h2 className="font-cormorant text-[clamp(30px,4vw,48px)] font-medium leading-[1.1] text-[#f5f0e8]">
              {'Featured Plots'}
            </h2>
          </div>

          <Link
            to="/listings"
            className="inline-flex items-center gap-3 font-sans text-[12px] font-medium tracking-widest uppercase text-[#b8975a] border-b border-[#b8975a]/30 pb-0.5 transition-colors duration-200 hover:border-[#b8975a] self-start sm:self-auto"
          >
            {'View all plots'}
            <span aria-hidden="true">{'→'}</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {MOCK_LISTINGS.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
interface Testimonial {
  quote: string;
  buyerName: string;
  location: string;
  plotDetails: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I was skeptical buying land from abroad, but Mrs. Alaba sent videos, documents, everything. My family is building our dream house now.',
    buyerName: 'Chinedu Okafor',
    location: 'UK — Lagos-based family',
    plotDetails: '500 sqm · Sagamu Elite Estate',
  },
  {
    quote:
      'No middleman nonsense. Direct from her. The plot was exactly as described. My brother closed the deal in 2 weeks.',
    buyerName: 'Kemi Adeyemi',
    location: 'Lagos, Nigeria',
    plotDetails: '750 sqm · Sagamu Premium Park',
  },
  {
    quote:
      'I called her on WhatsApp with questions. She answered everything. No pressure. Just clarity. That is what made me trust her.',
    buyerName: 'Tunde Akande',
    location: 'Ogun State, Nigeria',
    plotDetails: '1000 sqm · Ogun Valley Residences',
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}): JSX.Element {
  return (
    <article className="flex flex-col bg-[#131f14] border border-white/[0.07] p-8 transition-colors duration-300 hover:border-[#b8975a]/30">

      {/* Index + stars row */}
      <div className="flex items-center justify-between mb-7">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b8975a]/50">
          {'0' + (index + 1)}
        </span>
        <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-[#b8975a] text-xs" aria-hidden="true">
              {'★'}
            </span>
          ))}
        </div>
      </div>

      {/* Opening mark */}
      <span
        className="font-cormorant text-[64px] leading-none text-[#b8975a]/20 select-none mb-1 -mt-3"
        aria-hidden="true"
      >
        {'\u201C'}
      </span>

      {/* Quote */}
      <p className="font-cormorant text-[clamp(18px,2vw,22px)] font-normal italic leading-[1.55] text-[#f5f0e8]/80 flex-1 mb-8">
        {testimonial.quote}
      </p>

      {/* Divider */}
      <span className="block w-full h-px bg-white/[0.06] mb-6" />

      {/* Buyer info */}
      <div className="flex flex-col gap-1">
        <p className="font-cormorant text-base font-medium text-[#f5f0e8] tracking-wide">
          {testimonial.buyerName}
        </p>
        <p className="font-sans text-[11px] font-light tracking-[0.1em] text-[#f5f0e8]/40 uppercase">
          {testimonial.location}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="block w-3 h-px bg-[#b8975a]/50" />
          <p className="font-sans text-[11px] font-medium tracking-[0.08em] text-[#b8975a]/80">
            {testimonial.plotDetails}
          </p>
        </div>
      </div>

    </article>
  );
}

export function TestimonialsSection(): JSX.Element {
  return (
    <section className="w-full bg-[#0c1610] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14 lg:mb-18">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px bg-[#b8975a]" />
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              {'Buyer stories'}
            </span>
          </div>
          <h2 className="font-cormorant text-[clamp(30px,4vw,48px)] font-medium leading-[1.1] text-[#f5f0e8]">
            {'Real Stories From'}
            <br />
            <em className="italic text-[#d4b87a]">{'Real Buyers.'}</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.buyerName} testimonial={t} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
import { getWhatsAppLink } from '../../utils/whatsapp';

const TRUST_POINTS = [
  'No middlemen. No inflated prices.',
  'Every document verified before listing.',
  'Over 47 families already building.',
];

const IMG_STYLE = { filter: 'grayscale(12%) contrast(1.04)' };

export function OwnerTrustSection(): JSX.Element {
  const waHref = getWhatsAppLink('general');

  return (
    <section className="w-full bg-[#0f1810] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-20 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">

          {/* Left — Photo */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px]">

              {/* Vertical gold rule */}
              <span
                className="hidden lg:block absolute top-8 -left-6 w-px h-[calc(100%-64px)] bg-gradient-to-b from-transparent via-[#b8975a] to-transparent"
                aria-hidden="true"
              />

              <img
                src="/images/owner.png"
                alt="CEO Mrs. Alabama Onas"
                className="block w-full aspect-[3/4] object-cover object-top"
                style={IMG_STYLE}
              />

              {/* Caption */}
              <div className="border-t border-[#b8975a] bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
                <p className="font-cormorant text-base font-medium tracking-wide text-[#f5f0e8] mb-0.5">
                  Mrs. Alabama Onas
                </p>
                <p className="font-sans text-[11px] font-light tracking-[0.12em] uppercase text-[#b8975a]">
                  Chief Executive Officer
                </p>
              </div>
            </div>
          </div>

          {/* Right — Copy */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-7">
              <span className="block w-6 h-px bg-[#b8975a]" />
              <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                {'Why trust us'}
              </span>
            </div>

            <h2 className="font-cormorant text-[clamp(30px,4vw,48px)] font-medium leading-[1.1] text-[#f5f0e8] mb-10">
              {'You Are Dealing'}
              <br />
              <em className="italic text-[#d4b87a]">{'Directly With the Source.'}</em>
            </h2>

            {/* Trust points */}
            <div className="flex flex-col gap-0 mb-10">
              {TRUST_POINTS.map((point, i) => (
                <div
                  key={point}
                  className="flex items-start gap-5 py-5 border-t border-white/[0.06] last:border-b"
                >
                  <span className="font-cormorant text-[13px] text-[#b8975a] mt-0.5 tabular-nums tracking-widest flex-shrink-0">
                    {'0' + (i + 1)}
                  </span>
                  <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/70">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={waHref}
              className="inline-flex items-center gap-3 self-start font-sans text-[13px] font-medium tracking-widest uppercase px-8 py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a] hover:-translate-y-px"
            >
              {'Chat Directly With Mrs. Alaba'}
              <span aria-hidden="true" className="text-[#0f1810]/50">{'→'}</span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
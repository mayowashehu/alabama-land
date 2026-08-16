import { getWhatsAppLink } from '../../utils/whatsapp';

function BeaconMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 2v10M16 20v10M2 16h10M20 16h10" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

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

          {/* Left — Photo, matted like the hero portrait */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px]">

              <span
                className="hidden lg:block absolute top-8 -left-6 w-px h-[calc(100%-64px)] bg-gradient-to-b from-transparent via-[#b8975a] to-transparent"
                aria-hidden="true"
              />

              <div className="relative border border-[#b8975a]/25 p-3 shadow-[0_35px_70px_-20px_rgba(0,0,0,0.65)]">
                <div className="relative overflow-hidden aspect-[4/5] group">
                  <img
                    src="/images/owner.png"
                    alt="CEO Mrs. Alabama Onas"
                    className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ ...IMG_STYLE, objectPosition: '50% 22%' }}
                  />

                  <div
                    className="absolute inset-x-0 top-0 h-[34%] pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(10,15,10,0.88) 0%, rgba(10,15,10,0.45) 55%, transparent 100%)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 top-0 px-5 pt-4 pb-3">
                    <p className="font-cormorant text-lg font-medium tracking-wide text-[#f5f0e8] mb-0.5">
                      Mrs. Alabama Onas
                    </p>
                    <p className="font-sans text-[10.5px] font-light tracking-[0.14em] uppercase text-[#d4b87a]">
                      Chief Executive Officer
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification seal — varied position, rotation, and label from the hero's, so it reads as its own mark rather than a repeated template */}
              <div
                className="hidden sm:flex absolute -bottom-6 -right-6 w-[76px] h-[76px] items-center justify-center rounded-full bg-[#0f1810] border border-[#b8975a]/70 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]"
                style={{ transform: 'rotate(8deg)' }}
                aria-hidden="true"
              >
                <div className="absolute inset-[3px] rounded-full border border-[#b8975a]/25" />
                <div className="flex flex-col items-center gap-0.5">
                  <BeaconMark className="w-3.5 h-3.5 text-[#b8975a]" />
                  <span className="font-sans text-[7px] font-medium tracking-[0.14em] text-[#b8975a] leading-none">
                    DIRECT
                  </span>
                  <span className="font-sans text-[6px] tracking-[0.14em] text-[#b8975a]/70 leading-none">
                    SOURCE
                  </span>
                </div>
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
              className="group relative inline-flex items-center gap-3 self-start overflow-hidden font-sans text-[13px] font-medium tracking-widest uppercase px-8 py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(184,151,90,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b87a]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {'Chat Directly With Mrs. Alaba'}
                <span aria-hidden="true" className="text-[#0f1810]/50">{'→'}</span>
              </span>
              <span className="absolute inset-0 bg-[#d4b87a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
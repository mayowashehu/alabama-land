import { useEffect, useRef, useState } from 'react';

interface StatItemProps {
  finalNumber: number;
  label: string;
  suffix?: string;
  index: number;
}

function StatItem({ finalNumber, label, suffix = '', index }: StatItemProps): JSX.Element {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000;
          const startTime = Date.now();
          const animate = (): void => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(finalNumber * eased));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [finalNumber]);

  const isLast = index === 2;

  return (
    <div
      ref={ref}
      className={`
        flex flex-col items-center lg:items-start py-10 lg:py-0
        ${!isLast ? 'border-b lg:border-b-0 lg:border-r border-[#b8975a]/20' : ''}
      `}
    >
      {/* Index mark */}
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b8975a]/50 mb-4">
        {'0' + (index + 1)}
      </span>

      {/* Number */}
      <div className="font-cormorant text-[clamp(56px,7vw,88px)] font-medium leading-none text-[#f5f0e8] mb-3 tabular-nums">
        {count}
        <span className="text-[#b8975a]">{suffix}</span>
      </div>

      {/* Divider line */}
      <span className="block w-8 h-px bg-[#b8975a]/40 mb-3" />

      {/* Label */}
      <p className="font-sans text-sm font-light tracking-[0.1em] uppercase text-[#f5f0e8]/50">
        {label}
      </p>
    </div>
  );
}

const STATS = [
  { finalNumber: 47, label: 'Plots Sold', suffix: '+' },
  { finalNumber: 12, label: 'Estates Developed', suffix: '' },
  { finalNumber: 100, label: 'Document Delivery', suffix: '%' },
];

export function StatsSection(): JSX.Element {
  return (
    <section className="w-full bg-[#0f1810] border-t border-white/[0.06] px-10 sm:px-14 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">

        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-12 lg:mb-16">
          <span className="block w-6 h-px bg-[#b8975a]" />
          <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            {'By the numbers'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="px-0 sm:px-8 lg:px-12 first:pl-0 last:pr-0">
              <StatItem
                finalNumber={stat.finalNumber}
                label={stat.label}
                suffix={stat.suffix}
                index={i}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
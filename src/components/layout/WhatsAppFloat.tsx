import { useState } from 'react';

const WA_URL =
  "https://wa.me/2347082151926?text=Hi%2C+I+found+your+website+and+I%27m+interested+in+buying+land+in+Sagamu.+Can+you+help+me%3F";

export function WhatsAppFloat(): JSX.Element {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip label — slides in from right on hover */}
      <div
        className={`
          mr-3 font-sans text-[11px] font-medium tracking-[0.1em] uppercase
          px-3.5 py-2 bg-[#0f1810]/90 backdrop-blur-sm border border-[#b8975a]/30
          text-[#b8975a] whitespace-nowrap
          transition-all duration-300 hidden sm:block
          ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}
        `}
        aria-hidden="true"
      >
        Chat with Mrs. Alaba
      </div>

      {/* Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#b8975a] text-[#0f1810] transition-all duration-300 hover:bg-[#d4b87a] hover:scale-105"
      >
        {/* Subtle outer ring pulse */}
        <span
          className="absolute inset-0 bg-[#b8975a]/30 animate-ping"
          aria-hidden="true"
          style={{ animationDuration: '2.4s' }}
        />

        <svg
          className="relative w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.141 1.535 5.876L0 24l6.323-1.507A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.785 9.785 0 01-5.017-1.378l-.36-.214-3.732.889.937-3.627-.235-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
      </a>
    </div>
  );
}
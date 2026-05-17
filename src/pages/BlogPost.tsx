import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getPostsByCategory, formatBlogDate } from '../utils/blogParser';
import { getWhatsAppLink } from '../utils/whatsapp';

const IMG_STYLE = { filter: 'grayscale(10%) contrast(1.04)' };

export default function BlogPost(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0f1810] pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-cormorant text-[clamp(60px,10vw,120px)] font-medium leading-none text-[#f5f0e8]/5 mb-6 select-none">
            404
          </p>
          <h1 className="font-cormorant text-[clamp(24px,3vw,36px)] font-medium text-[#f5f0e8] mb-3">
            Article Not Found
          </h1>
          <p className="font-sans text-sm font-light text-[#f5f0e8]/40 mb-8">
            This article has been moved or does not exist.
          </p>
          <Link
            to="/blog"
            className="inline-block font-sans text-[12px] font-medium tracking-widest uppercase px-7 py-3.5 bg-[#b8975a] text-[#0f1810] transition-colors hover:bg-[#d4b87a]"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const waHref = getWhatsAppLink('general');

  return (
    <>
      <Helmet>
        <title>{post.title} | Alabama Onas Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        {post.image && <meta property="og:image" content={post.image} />}
      </Helmet>

      <div className="min-h-screen bg-[#0f1810] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 font-sans text-[11px] tracking-[0.1em] uppercase text-[#f5f0e8]/25">
            <Link to="/" className="hover:text-[#f5f0e8]/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#f5f0e8]/60 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#b8975a]/60 truncate max-w-xs">{post.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Main article */}
            <article className="lg:col-span-2 min-w-0">

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                  {post.category}
                </span>
                <span className="block w-px h-3 bg-white/20" aria-hidden="true" />
                <span className="font-sans text-[10px] tracking-wide text-[#f5f0e8]/30">
                  {post.readTime}
                  {' min read'}
                </span>
                <span className="block w-px h-3 bg-white/20" aria-hidden="true" />
                <span className="font-sans text-[10px] tracking-wide text-[#f5f0e8]/30">
                  {formatBlogDate(post.date)}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-cormorant text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.1] text-[#f5f0e8] mb-6">
                {post.title}
              </h1>

              {/* Lede */}
              <p className="font-cormorant text-[clamp(16px,1.8vw,20px)] italic leading-relaxed text-[#f5f0e8]/50 mb-10 border-l-2 border-[#b8975a]/40 pl-5">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 py-5 border-t border-b border-white/[0.06] mb-10">
                <div className="w-10 h-10 overflow-hidden flex-shrink-0">
                  <img
                    src="/images/owner.png"
                    alt={post.author}
                    className="w-full h-full object-cover object-top"
                    style={IMG_STYLE}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div>
                  <p className="font-cormorant text-sm font-medium text-[#f5f0e8]">
                    {post.author}
                  </p>
                  <p className="font-sans text-[10px] font-light tracking-[0.1em] uppercase text-[#b8975a]/60">
                    Land Investment Expert
                  </p>
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a]/50 hover:text-[#b8975a] transition-colors"
                >
                  Share
                  <span aria-hidden="true">{' →'}</span>
                </a>
              </div>

              {/* Hero image */}
              {post.image && (
                <div className="w-full aspect-[16/9] overflow-hidden mb-10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    style={IMG_STYLE}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}

              {/* Markdown body */}
              <div className="border-t border-white/[0.06] pt-10">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="font-cormorant text-[clamp(26px,3vw,36px)] font-medium text-[#f5f0e8]/90 mt-10 mb-4 leading-[1.15]">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-cormorant text-[clamp(22px,2.5vw,30px)] font-medium text-[#f5f0e8]/85 mt-10 mb-4 leading-[1.2]">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-cormorant text-[clamp(18px,2vw,24px)] font-medium text-[#f5f0e8]/80 mt-8 mb-3 leading-[1.25]">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="font-sans text-sm font-light leading-[1.9] text-[#f5f0e8]/55 mb-5">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-5 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-5 space-y-2 list-none counter-reset-item">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="font-sans text-sm font-light leading-[1.8] text-[#f5f0e8]/55 flex gap-3 items-baseline">
                        <span className="text-[#b8975a] flex-shrink-0 text-xs">–</span>
                        <span>{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-[#b8975a]/40 pl-5 my-8">
                        <div className="font-cormorant text-[clamp(16px,1.8vw,20px)] italic text-[#f5f0e8]/45 leading-relaxed">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-medium text-[#f5f0e8]/80">{children}</strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#b8975a] underline underline-offset-2 hover:text-[#d4b87a] transition-colors"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="font-mono text-xs bg-[#131f14] border border-white/[0.07] px-2 py-0.5 text-[#b8975a]">
                        {children}
                      </code>
                    ),
                    hr: () => (
                      <div className="border-t border-white/[0.06] my-10" />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse border border-white/[0.07]">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-white/[0.07] px-4 py-3 bg-[#131f14] text-left font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8975a]/70">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-white/[0.07] px-4 py-3 font-sans text-xs font-light text-[#f5f0e8]/55">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* End CTA */}
              <div className="mt-14 bg-[#131f14] border border-[#b8975a]/25 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-5 h-px bg-[#b8975a]" />
                  <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                    Ready to invest?
                  </span>
                </div>
                <h3 className="font-cormorant text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.2] text-[#f5f0e8] mb-2">
                  Verified plots in Sagamu, direct from the source.
                </h3>
                <p className="font-sans text-sm font-light text-[#f5f0e8]/40 mb-7 leading-relaxed">
                  No middlemen. No inflated prices. C of O titles available.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/listings"
                    className="flex-1 text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 bg-[#b8975a] text-[#0f1810] transition-colors hover:bg-[#d4b87a]"
                  >
                    View Available Plots
                  </Link>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 border border-white/15 text-[#f5f0e8]/60 transition-all hover:border-white/30 hover:text-[#f5f0e8]"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Bottom nav */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.06]">
                <button
                  onClick={() => navigate(-1)}
                  className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#f5f0e8]/25 hover:text-[#f5f0e8]/60 transition-colors flex items-center gap-2"
                >
                  <span aria-hidden="true">{'←'}</span>
                  Go back
                </button>
                <Link
                  to="/blog"
                  className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a]/50 hover:text-[#b8975a] transition-colors flex items-center gap-2"
                >
                  All articles
                  <span aria-hidden="true">{'→'}</span>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 h-fit flex flex-col gap-8">

              <div className="bg-[#131f14] border border-[#b8975a]/25 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-4 h-px bg-[#b8975a]" />
                  <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                    Invest today
                  </span>
                </div>
                <p className="font-cormorant text-[clamp(17px,2vw,22px)] font-medium leading-[1.25] text-[#f5f0e8] mb-3">
                  Talk directly with Mrs. Alaba about available plots.
                </p>
                <p className="font-sans text-xs font-light text-[#f5f0e8]/35 mb-6 leading-relaxed">
                  No middlemen. No pressure. Clear answers and verified land.
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-sans text-[12px] font-medium tracking-widest uppercase py-4 bg-[#b8975a] text-[#0f1810] transition-colors hover:bg-[#d4b87a]"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {relatedPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="block w-4 h-px bg-[#b8975a]" />
                    <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                      Related articles
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {relatedPosts.map((p, i) => (
                      <Link
                        key={p.slug}
                        to={`/blog/${p.slug}`}
                        className={`group flex gap-4 py-5 border-t border-white/[0.06] transition-colors ${i === relatedPosts.length - 1 ? 'border-b' : ''}`}
                      >
                        {p.image && (
                          <div className="w-16 h-14 flex-shrink-0 overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              style={IMG_STYLE}
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="font-sans text-[9px] tracking-[0.14em] uppercase text-[#b8975a]/50">
                            {p.category}
                          </span>
                          <span className="font-cormorant text-sm font-medium leading-[1.3] text-[#f5f0e8]/65 group-hover:text-[#f5f0e8] transition-colors line-clamp-2">
                            {p.title}
                          </span>
                          <span className="font-sans text-[10px] text-[#f5f0e8]/20">
                            {formatBlogDate(p.date)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 mt-5 font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a]/50 hover:text-[#b8975a] transition-colors"
                  >
                    All articles
                    <span aria-hidden="true">{'→'}</span>
                  </Link>
                </div>
              )}

            </aside>
          </div>

        </div>
      </div>
    </>
  );
}
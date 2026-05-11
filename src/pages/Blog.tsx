import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS, getAllCategories } from '../data/blogPosts';
import { formatBlogDate } from '../utils/blogParser';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
  index: number;
  featured?: boolean;
}

const IMG_STYLE = { filter: 'grayscale(12%) contrast(1.04)' };

function BlogCard({ slug, title, excerpt, date, category, readTime, image, index, featured }: BlogCardProps): JSX.Element {
  return (
    <Link
      to={`/blog/${slug}`}
      className={`flex flex-col bg-[#131f14] border border-white/[0.07] group transition-colors duration-300 hover:border-[#b8975a]/30 ${featured ? 'md:col-span-2 md:flex-row' : ''}`}
    >
      {/* Image */}
      {image && (
        <div className={`relative overflow-hidden flex-shrink-0 ${featured ? 'md:w-[55%] aspect-[16/10]' : 'aspect-[16/9]'}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={IMG_STYLE}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1810]/60 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/40">
            {'0' + (index + 1)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        {/* Category + read time */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            {category}
          </span>
          <span className="block w-px h-3 bg-white/20" aria-hidden="true" />
          <span className="font-sans text-[10px] tracking-wide text-[#f5f0e8]/30">
            {readTime}
            {' min read'}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-cormorant font-medium leading-[1.2] text-[#f5f0e8] mb-3 transition-colors duration-200 group-hover:text-[#d4b87a] ${featured ? 'text-[clamp(22px,2.5vw,30px)]' : 'text-[clamp(18px,2vw,22px)]'}`}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/45 line-clamp-3 flex-1 mb-6">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="font-sans text-[11px] text-[#f5f0e8]/25 tracking-wide">
            {formatBlogDate(date)}
          </span>
          <span className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a] flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
            Read
            <span aria-hidden="true">{'→'}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Blog(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...getAllCategories()];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Blog — Land Investment Tips & Guides | Alabama Onas</title>
        <meta
          name="description"
          content="Expert guides on buying land in Sagamu, investment tips, document verification, and diaspora investing from Mrs. Alabama Onas."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f1810] pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-10 sm:px-14 lg:px-16">

          {/* Page header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#b8975a]" />
              <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
                {'From the desk of Mrs. Onas'}
              </span>
            </div>
            <h1 className="font-cormorant text-[clamp(32px,5vw,56px)] font-medium leading-[1.1] text-[#f5f0e8] mb-4">
              Land Investment
              <br />
              <em className="italic text-[#d4b87a]">{'Guide & Insights.'}</em>
            </h1>
            <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/45 max-w-xl">
              Expert articles on buying land in Sagamu, investment strategies, document verification, and diaspora investing — from direct experience in the field.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/[0.06] pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans text-[11px] font-medium tracking-[0.14em] uppercase px-4 py-2 border transition-all duration-200 ${selectedCategory === cat
                    ? 'bg-[#b8975a] text-[#0f1810] border-[#b8975a]'
                    : 'bg-transparent text-[#f5f0e8]/40 border-white/10 hover:border-white/25 hover:text-[#f5f0e8]/70'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid — first card spans 2 cols if it has an image */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
              {filteredPosts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  readTime={post.readTime}
                  image={post.image}
                  index={i}
                  featured={i === 0 && !!post.image}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 border border-white/[0.06]">
              <p className="font-cormorant text-xl italic text-[#f5f0e8]/30 mb-4">
                No articles in this category yet.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a]/60 hover:text-[#b8975a] transition-colors"
              >
                View all articles
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
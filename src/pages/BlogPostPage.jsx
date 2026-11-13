import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import usePageMeta from "@/hooks/usePageMeta";
import Navbar from "@/components/site/Navbar";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";
import PageNotFound from "@/lib/PageNotFound";
import { getAllPosts, getPostBySlug, formatPostDate, readingMinutes } from "@/content/blogs";

// Links inside a post: site pages use the router, other sites open in a new tab.
const MarkdownLink = ({ href = "", children }) =>
  href.startsWith("/") ? (
    <Link to={href} className="text-primary underline underline-offset-4 hover:no-underline">
      {children}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4 hover:no-underline"
    >
      {children}
    </a>
  );

const markdownComponents = {
  a: MarkdownLink,
  img: ({ src, alt }) => <img src={src} alt={alt || ""} loading="lazy" decoding="async" />,
  table: ({ children }) => (
    <div className="blog-table">
      <table>{children}</table>
    </div>
  ),
};

function BlogPost({ post }) {
  usePageMeta(`${post.seoTitle || post.title} | Jago AI`, post.excerpt);
  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="site-typography relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main id="main-content">
        <article className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Link
              to="/blog"
              className="site-inline-link text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <span aria-hidden="true">←</span>&nbsp;All posts
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {post.category && <span className="font-semibold text-primary">{post.category}</span>}
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(post.body)} min read</span>
            </div>
            <h1 className="mt-3 font-heading text-balance">{post.title}</h1>
            {post.author && <p className="mt-4 !text-base text-muted-foreground">By {post.author}</p>}
          </div>

          <div className="mx-auto mt-8 max-w-5xl px-5 sm:px-8">
            <img
              src={post.thumbnail}
              alt={post.thumbnailAlt || ""}
              className="aspect-[16/9] w-full rounded-2xl border border-[#2f3641] object-cover"
            />
          </div>

          <div className="blog-prose mx-auto mt-8 max-w-3xl px-5 sm:px-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.body}
            </ReactMarkdown>
          </div>
        </article>

        {more.length > 0 && (
          <section className="site-section-alt py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <h2>More from the blog</h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((p) => (
                  <li key={p.slug} className="min-w-0">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2f3641] bg-[rgba(19,22,27,0.3)] transition-colors hover:border-primary/60"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-card">
                        <img src={p.thumbnail} alt={p.thumbnailAlt || ""} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                      <div className="p-5">
                        <time dateTime={p.date} className="text-sm text-muted-foreground">
                          {formatPostDate(p.date)}
                        </time>
                        <h3 className="mt-2 text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <CTA />
      <Footer />
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <PageNotFound />;
  return <BlogPost key={post.slug} post={post} />;
}

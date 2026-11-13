import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import usePageMeta from "@/hooks/usePageMeta";
import Navbar from "@/components/site/Navbar";
import Accordion from "@/components/site/Accordion";
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

// Section headings get ids so the "On this page" list can link to them.
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const textOf = (children) =>
  React.Children.toArray(children)
    .map((c) => (typeof c === "string" ? c : textOf(c?.props?.children)))
    .join("");

const getHeadings = (body) =>
  body
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).replace(/\*\*/g, "").trim())
    .map((text) => ({ text, id: slugify(text) }));

// Pulls the "## FAQ" section out of a post so its questions can show as a dropdown list.
// Each "### Question" becomes one item; the text under it is the answer.
const splitFaq = (body) => {
  const lines = body.split("\n");
  const start = lines.findIndex((l) => /^##\s+(FAQs?|Frequently asked questions)\s*$/i.test(l));
  if (start === -1) return { before: body, faqs: [], after: "" };
  let end = lines.findIndex((l, i) => i > start && l.startsWith("## "));
  if (end === -1) end = lines.length;
  const faqs = [];
  lines.slice(start + 1, end).forEach((l) => {
    if (l.startsWith("### ")) faqs.push({ q: l.slice(4).trim(), a: [] });
    else if (faqs.length) faqs[faqs.length - 1].a.push(l);
  });
  if (!faqs.length) return { before: body, faqs: [], after: "" };
  return {
    before: lines.slice(0, start).join("\n"),
    heading: lines[start].slice(3).trim(),
    faqs: faqs.map((f) => ({ q: f.q, a: f.a.join("\n").trim() })),
    after: lines.slice(end).join("\n"),
  };
};

const markdownComponents = {
  a: MarkdownLink,
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  img: ({ src, alt }) => <img src={src} alt={alt || ""} loading="lazy" decoding="async" />,
  table: ({ children }) => (
    <div className="blog-table">
      <table>{children}</table>
    </div>
  ),
};

function BlogPost({ post }) {
  usePageMeta(`${post.seoTitle || post.title} | Jago AI`, post.excerpt);
  const toc = getHeadings(post.body);
  const sections = splitFaq(post.body);
  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="site-typography relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main id="main-content">
        <article className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:grid lg:grid-cols-[minmax(0,52rem)_16rem] lg:justify-between lg:gap-12">
            <div className="min-w-0">
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

              <img
                src={post.thumbnail}
                alt={post.thumbnailAlt || ""}
                className="mt-8 aspect-[16/9] w-full rounded-2xl border border-[#2f3641] object-cover"
              />

              <div className="blog-prose mt-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {sections.before}
                </ReactMarkdown>
                {sections.faqs.length > 0 && (
                  <>
                    <h2 id={slugify(sections.heading)}>{sections.heading}</h2>
                    <Accordion
                      className="blog-faq"
                      firstOpen={false}
                      items={sections.faqs.map((f) => ({
                        key: f.q,
                        title: f.q,
                        body: (
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                            {f.a}
                          </ReactMarkdown>
                        ),
                      }))}
                    />
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {sections.after}
                    </ReactMarkdown>
                  </>
                )}
              </div>
            </div>

            <aside className="hidden lg:block" aria-label="Article tools">
              <div className="sticky top-24 space-y-6">
                {toc.length > 1 && (
                  <nav aria-label="On this page" className="rounded-2xl border border-[#2f3641] bg-[rgba(19,22,27,0.3)] p-5">
                    <p className="!text-sm font-semibold text-foreground">On this page</p>
                    <ul className="mt-3 space-y-1">
                      {toc.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="block py-1 text-sm leading-snug text-muted-foreground hover:text-primary transition-colors"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div className="rounded-2xl border border-[#2f3641] bg-[rgba(19,22,27,0.3)] p-5">
                  <p className="!text-base font-semibold text-foreground">Put AI to work in 8 weeks</p>
                  <p className="mt-2 !text-sm text-muted-foreground">
                    See how Jago runs governed AI agents across your teams.
                  </p>
                  <Link to="/contact?intent=trial" className="site-cta-primary mt-4 w-full px-4 py-2.5 text-sm rounded-lg">
                    Book a free trial
                  </Link>
                </div>
              </div>
            </aside>
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

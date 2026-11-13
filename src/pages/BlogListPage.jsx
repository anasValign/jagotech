import React from "react";
import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import Navbar from "@/components/site/Navbar";
import PageHeader from "@/components/site/PageHeader";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";
import { getAllPosts, formatPostDate, readingMinutes } from "@/content/blogs";

export default function BlogListPage() {
  usePageMeta(
    "Blog | Jago AI",
    "Ideas, playbooks and customer stories on putting AI to work across your company."
  );
  const posts = getAllPosts();

  return (
    <div className="site-typography relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main id="main-content">
        <PageHeader eyebrow="Blog" title="Ideas for putting AI to work." showActions={false}>
          Playbooks, perspectives and customer stories from the Jago&nbsp;team.
        </PageHeader>

        <section className="site-section pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {posts.length === 0 ? (
              <p className="text-center mx-auto">New posts are on the way. Check back soon.</p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug} className="min-w-0">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2f3641] bg-[rgba(19,22,27,0.3)] transition-colors hover:border-primary/60"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-card">
                        <img
                          src={post.thumbnail}
                          alt={post.thumbnailAlt || ""}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          {post.category && (
                            <span className="font-semibold text-primary">{post.category}</span>
                          )}
                          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                          <span aria-hidden="true">·</span>
                          <span>{readingMinutes(post.body)} min read</span>
                        </div>
                        <h2 className="mt-3 !text-xl !leading-snug text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="mt-2 !text-base">{post.excerpt}</p>
                        <span className="mt-auto pt-4 text-sm font-semibold text-primary">
                          Read more <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <CTA />
      <Footer />
    </div>
  );
}

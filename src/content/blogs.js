// Blog posts. To publish a new post:
// 1. Write the article in Markdown at src/content/blog/<slug>.md
//    (## headings, lists, tables, **bold**, [links](/pricing), ![alt](/blog/<slug>/image.webp)).
// 2. Put its images, including cover.webp (the thumbnail), in public/blog/<slug>/.
// 3. Import the file below and add an entry to BLOG_POSTS:
//    - slug: the URL, e.g. "my-post" becomes /blog/my-post (lowercase, hyphens, unique)
//    - date: the created date as "YYYY-MM-DD"; the blog page lists newest first
//      (posts with the same date keep the order they have in this list)
//    - seoTitle / excerpt: the browser tab title and meta description
// 4. Add the URL to public/sitemap.xml.

import topEnterpriseAgenticAiVendors from "./blog/top-enterprise-agentic-ai-vendors.md?raw";
import whatIsEnterpriseAgenticAiPlatform from "./blog/what-is-enterprise-agentic-ai-platform.md?raw";
import aiAgentGovernanceGuide from "./blog/ai-agent-governance-guide.md?raw";
import enterpriseAiAgentPlatformBuyersGuide from "./blog/enterprise-ai-agent-platform-buyers-guide.md?raw";
import aiAgentsVsCopilotsVsChatbots from "./blog/ai-agents-vs-copilots-vs-chatbots.md?raw";
import multiAgentOrchestrationExplained from "./blog/multi-agent-orchestration-explained.md?raw";

export const BLOG_POSTS = [
  {
    slug: "top-enterprise-agentic-ai-vendors",
    title: "Top Enterprise Agentic AI Vendors in 2026",
    seoTitle: "Top Enterprise Agentic AI Vendors in 2026: Categories & Buyer Criteria",
    excerpt: "Compare leading enterprise Agentic AI vendors by category, strengths, governance capabilities, and best-fit use cases. Includes a practical selection checklist.",
    date: "2026-11-13",
    author: "Jago AI team",
    category: "Buyer’s guide",
    thumbnail: "/blog/top-enterprise-agentic-ai-vendors/cover.webp",
    thumbnailAlt: "Top enterprise agentic AI vendors in 2026: 5 categories, 10 vendors and a buyer’s checklist",
    body: topEnterpriseAgenticAiVendors,
  },
  {
    slug: "what-is-enterprise-agentic-ai-platform",
    title: "What Is an Enterprise Agentic AI Platform?",
    seoTitle: "What Is an Enterprise Agentic AI Platform? A Practical Guide",
    excerpt: "Learn what an enterprise agentic AI platform is, how it works, its core components, governance requirements, and how to choose the right platform for your business.",
    date: "2026-11-13",
    author: "Jago AI team",
    category: "Guide",
    thumbnail: "/blog/what-is-enterprise-agentic-ai-platform/cover.webp",
    thumbnailAlt: "What is an enterprise agentic AI platform? Agents, orchestration, enterprise data and integrations",
    body: whatIsEnterpriseAgenticAiPlatform,
  },
  {
    slug: "ai-agent-governance-guide",
    title: "What Is AI Agent Governance? A Practical Enterprise Guide",
    seoTitle: "What Is AI Agent Governance? A Practical Enterprise Guide",
    excerpt: "Learn what AI agent governance is, why it matters, the controls enterprises need, and how to govern autonomous AI agents with approvals, audit trails, and least-privilege access.",
    date: "2026-11-13",
    author: "Jago AI team",
    category: "Governance",
    thumbnail: "/blog/ai-agent-governance-guide/cover.webp",
    thumbnailAlt: "What is AI agent governance? Approvals, audit trails and least-privilege access",
    body: aiAgentGovernanceGuide,
  },
  {
    slug: "enterprise-ai-agent-platform-buyers-guide",
    title: "Enterprise AI Agent Platform Buyer’s Guide: 12 Questions to Ask Vendors",
    seoTitle: "Enterprise AI Agent Platform Buyer’s Guide: 12 Questions to Ask",
    excerpt: "Use this enterprise AI agent platform buyer’s guide to evaluate vendors on integrations, governance, security, orchestration, deployment, pricing, and time-to-value.",
    date: "2026-11-13",
    author: "Jago AI team",
    category: "Buyer’s guide",
    thumbnail: "/blog/enterprise-ai-agent-platform-buyers-guide/cover.webp",
    thumbnailAlt: "Enterprise AI agent platform buyer’s guide: 12 questions to ask vendors",
    body: enterpriseAiAgentPlatformBuyersGuide,
  },
  {
    slug: "ai-agents-vs-copilots-vs-chatbots",
    title: "AI Agents vs. Copilots vs. Chatbots: What Enterprises Actually Need",
    seoTitle: "AI Agents vs. Copilots vs. Chatbots: What Enterprises Need",
    excerpt: "Understand the differences between AI agents, copilots, and chatbots—and learn when each is the right choice for enterprise workflows, productivity, and automation.",
    date: "2026-11-13",
    author: "Jago AI team",
    category: "Explainer",
    thumbnail: "/blog/ai-agents-vs-copilots-vs-chatbots/cover.webp",
    thumbnailAlt: "AI agents vs copilots vs chatbots",
    body: aiAgentsVsCopilotsVsChatbots,
  },
  {
    slug: "multi-agent-orchestration-explained",
    title: "Multi-Agent Orchestration Explained: How Enterprises Coordinate AI Agents",
    seoTitle: "Multi-Agent Orchestration Explained: How Enterprises Coordinate AI Agents",
    excerpt: "Learn what multi-agent orchestration is, how it works, common orchestration patterns, governance requirements, and when enterprises should use multiple AI agents.",
    date: "2026-11-13",
    author: "Jago AI team",
    category: "Explainer",
    thumbnail: "/blog/multi-agent-orchestration-explained/cover.webp",
    thumbnailAlt: "Multi-agent orchestration explained",
    body: multiAgentOrchestrationExplained,
  },
];

const byNewest = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export function getAllPosts() {
  return [...BLOG_POSTS].sort(byNewest);
}

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}

export function formatPostDate(date) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function readingMinutes(body) {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));
}

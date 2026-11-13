// Blog posts. To publish a new post, add an object to BLOG_POSTS:
// - slug: the URL, e.g. "my-post" becomes /blog/my-post (lowercase, hyphens, unique)
// - date: the created date as "YYYY-MM-DD"; the blog page lists newest first
// - thumbnail: an image path under /public (e.g. "/blog/my-post.jpg") or a full image URL
// - body: the article in Markdown (## headings, lists, **bold**, [links](/pricing))

export const BLOG_POSTS = [
  {
    slug: "ai-across-your-company-in-8-weeks",
    title: "How to put AI to work across your company in 8 weeks",
    excerpt:
      "A week-by-week look at how Jago goes from first data connection to agents your teams use every day.",
    date: "2026-11-10",
    author: "Jago AI team",
    category: "Playbook",
    thumbnail: "/blog/eight-week-rollout.svg",
    thumbnailAlt: "Eight steps rising toward a live AI platform",
    body: `
Most AI projects stall between the pilot and the rollout. The pilot works for one team, then the work of connecting more data, more people and more approvals never quite gets done.

Jago is built to go live across your teams in 8 weeks. Here is how that time is spent.

## Weeks 1 and 2: connect your data

We connect the systems your teams already use and agree which questions matter most. Nothing is copied into a new tool for each use case.

## Weeks 3 and 4: answer questions

Teams start asking questions of their own data in plain language, typed or spoken, and check the answers against what they already know.

## Weeks 5 and 6: explain and warn

Jago starts explaining why numbers move and flagging risks before they turn into problems.

## Weeks 7 and 8: run routine work

Routine work moves to agents that act only after a person approves. By the end, every team has agents ready for its own roles.

## Next step

[Download the 8-week plan](/contact?intent=plan) to see the full schedule, or [book a free trial](/contact?intent=trial).
`,
  },
  {
    slug: "one-platform-not-more-pieces",
    title: "Why buying AI in pieces holds companies back",
    excerpt:
      "A chatbot here, a dashboard tool there. Here is why separate AI tools stop short, and what one platform changes.",
    date: "2026-10-28",
    author: "Jago AI team",
    category: "Perspective",
    thumbnail: "/blog/one-platform.svg",
    thumbnailAlt: "Four separate tools joining into one platform",
    body: `
Most organisations buy AI in pieces: a chatbot for documents, a dashboard tool for reports, a separate prediction vendor and an automation builder kit.

Each piece works on its own. Together they cause three problems.

## Data is copied again and again

Every tool needs its own copy of your data, so each one drifts out of date in its own way.

## Each tool stops at its edge

The chatbot can't tell you why a number moved. The dashboard can't act on what it shows. People fill the gaps by hand.

## Nobody owns the outcome

With four vendors, no one is responsible for the result your business actually wanted.

## One platform instead

Jago answers questions from your data, explains why numbers move, warns of risks and runs routine work you approve, all from one place. [See how the platform works](/platform).
`,
  },
  {
    slug: "ranking-branches-by-risk",
    title: "How a large lender decides which branches to audit first",
    excerpt:
      "With more than 1,000 branches, a lender used Jago to rank every branch by risk and focus its audits.",
    date: "2026-10-14",
    author: "Jago AI team",
    category: "Customer story",
    thumbnail: "/blog/branch-risk.svg",
    thumbnailAlt: "A map of branches with the riskiest highlighted",
    body: `
When you have more than 1,000 branches across many regions, you can't audit them all at once. The question is where to look first.

## The problem

Audit teams were choosing branches by rotation and instinct. The signals that point to risk were spread across separate systems.

## What changed

Jago brought those signals together and ranked every branch by risk, with a plain explanation of why each one ranked where it did.

## The result

Auditors now start with the branches most likely to need attention, and can show why they chose them.

[Read the full customer story](/customers).
`,
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

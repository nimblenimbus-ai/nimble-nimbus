import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, NotebookPen, Sparkles, X } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { PageHero } from "@/components/layout/page-hero";
import { RouteBridge } from "@/components/layout/route-bridge";
import { articles, type Article, type PublicationType } from "@/data/content";

const publicationIcons: Record<PublicationType, typeof Sparkles> = {
  Nibble: Sparkles,
  "Field Note": NotebookPen,
  "Deep Dive": BookOpen,
};

export default function Insights() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!activeArticle) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveArticle(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [activeArticle]);

  return (
    <Shell>
      <PageHero
        tag="Insights"
        title="Notes from"
        emphasis="above."
        description="A Knowledge Base & Deep Dives publication for the questions behind the work. Read slowly. Take what is useful."
      />
      <section
        className="section editorial-body"
        data-testid="section-insights-publication"
      >
        <div className="section-inner">
          <div className="insights-lead">
            <article className="lead-story reveal">
              <div className="section-kicker reveal">
                <span className="line" aria-hidden="true" />
                <span className="mono">
                  Latest field note // Thought bubbles worth sharing
                </span>
              </div>
              <h2 className="display reveal">
                Make the first version easy to argue with.
              </h2>
              <p>
                A note on why useful prototypes should create productive
                disagreement before they create confidence.
              </p>
            </article>
            <p className="publication-note reveal delay-1">
              <strong>Nimble Nimbus Notes</strong>A field publication about
              early-stage product thinking, creative partnership, and the useful
              distance between an idea and its next move.
            </p>
          </div>
          <div className="article-list" data-testid="list-insights">
            {articles.map((article) => {
              const Icon = publicationIcons[article.type];
              return (
                <button
                  className="article-row reveal"
                  type="button"
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  data-testid={`button-article-${article.id}`}
                >
                  <span className="taxonomy-eyebrow mono">
                    <Icon size={14} strokeWidth={1.8} className="taxonomy-icon" aria-hidden="true" />
                    <span className="taxonomy-tag">{article.type.toUpperCase()}</span>
                  </span>
                  <span className="article-title">{article.title}</span>
                  <span className="article-meta mono">{article.readTime}</span>
                  <ArrowUpRight
                    className="article-arrow"
                    size={19}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <RouteBridge
        next="https://www.linkedin.com/in/wheresjek/"
        nextLabel="Connect"
        label="Keep the altitude // Have an idea?"
      />
      {activeArticle && (
        <div
          className="insights-reader-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveArticle(null);
          }}
          data-testid="modal-insight-backdrop"
        >
          <article
            className="insights-reader"
            role="dialog"
            aria-modal="true"
            aria-labelledby="insight-title"
            data-testid="modal-insight"
          >
            <button
              className="reader-close"
              type="button"
              onClick={() => setActiveArticle(null)}
              aria-label="Close article"
              data-testid="button-close-article"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <div className="taxonomy-eyebrow mono">
              {(() => {
                const ActiveIcon = publicationIcons[activeArticle.type];
                return (
                  <>
                    <ActiveIcon size={14} strokeWidth={1.8} className="taxonomy-icon" aria-hidden="true" />
                    <span className="taxonomy-tag">{activeArticle.type.toUpperCase()}</span>
                    <span className="reader-sep">//</span>
                    <span>{activeArticle.readTime}</span>
                  </>
                );
              })()}
            </div>
            <h2 id="insight-title">{activeArticle.title}</h2>
            <p>{activeArticle.intro}</p>
            <p>{activeArticle.body}</p>
            {activeArticle.link && (
              <div
                style={{
                  marginTop: "28px",
                  paddingTop: "22px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <a
                  className="reader-link mono"
                  href={activeArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-article-external"
                >
                  {activeArticle.linkText
                    ? activeArticle.linkText
                    : "Read full post on Substack"}{" "}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            )}
          </article>
        </div>
      )}
    </Shell>
  );
}

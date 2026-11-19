import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyCollection() {
  return (
    <section className="empty-collection" aria-labelledby="empty-heading">
      <div className="empty-copy">
        <span className="eyebrow">The beginning of something good</span>
        <h2 id="empty-heading">
          A whole
          <br />
          world ahead.
        </h2>
        <p>
          No trips here yet. Every good adventure starts somewhere. Take a look
          around with a few sample journeys.
        </p>
        <Button asChild>
          <Link href="/trips">
            Explore sample trips
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </Button>
        <Link href="/#destinations" className="text-link">
          Find your somewhere
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="empty-image">
        <Image
          src="/images/santorini.jpg"
          alt="The Aegean Sea and lights of Oia, Santorini"
          fill
          sizes="(max-width: 640px) 90vw, 45vw"
          loading="eager"
        />
        <span className="image-label">
          There&apos;s a little more out there.
        </span>
      </div>
    </section>
  );
}

export function CollectionSkeleton() {
  return (
    <section
      className="collection-loading"
      aria-busy="true"
      aria-label="Trip collection loading"
    >
      <p className="loading-label" role="status">
        A little adventure is on its way<span aria-hidden="true">…</span>
        <span className="sr-only"> Loading trips.</span>
      </p>
      <div className="trip-grid skeleton-grid" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <div
            className={`skeleton-card ${item === 0 ? "skeleton-featured" : ""}`}
            key={item}
          >
            <div className="skeleton skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton skeleton-label" />
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line skeleton-short" />
              <div className="skeleton-avatars">
                <span className="skeleton" />
                <span className="skeleton" />
                <span className="skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

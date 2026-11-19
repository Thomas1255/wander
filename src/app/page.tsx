import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/destination-card";
import { DestinationCarousel } from "@/components/destination-carousel";
import { destinations } from "@/lib/demo-trips";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <DestinationCarousel />
      <section
        className="page-container destinations-section"
        id="destinations"
        aria-labelledby="destinations-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">A few places to begin</p>
            <h2 id="destinations-heading">Where to next?</h2>
          </div>
          <p>
            Big-city nights or a slower kind of somewhere.
            <br />
            Three sample journeys. Plenty of possibility.
          </p>
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
      <section
        className="page-container closing-note"
        aria-labelledby="closing-heading"
      >
        <span className="closing-mark" aria-hidden="true">
          ↗
        </span>
        <div>
          <p className="eyebrow">The good part is going together</p>
          <h2 id="closing-heading">
            The group chat
            <br />
            has a horizon.
          </h2>
        </div>
        <div className="closing-action">
          <p>Take a look at what a shared trip could feel like.</p>
          <Button asChild variant="outline">
            <Link href="/trips">
              Step into the preview
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Button>
          <span className="small-note">Sample trips. No account needed.</span>
        </div>
      </section>
    </main>
  );
}

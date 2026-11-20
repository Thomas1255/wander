import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DestinationMenu } from "@/components/destination-menu";
import { DestinationCarousel } from "@/components/destination-carousel";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <DestinationCarousel />
      <div className="landing-horizon">
        <div className="horizon-landscape" aria-hidden="true">
          <Image
            src="/images/fuji-dusk-illustration.webp"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <section
          className="page-container destinations-section"
          id="destinations"
          aria-labelledby="destinations-heading"
        >
          <h2 id="destinations-heading">Destinations</h2>
          <DestinationMenu />
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
      </div>
    </main>
  );
}

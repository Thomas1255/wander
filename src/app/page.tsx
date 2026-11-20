import Image from "next/image";

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
      </div>
    </main>
  );
}

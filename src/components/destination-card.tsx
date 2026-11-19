import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Destination } from "@/lib/demo-trips";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/trips#${destination.id}`}
      className="destination-card"
      aria-label={`See ${destination.name} sample trip`}
    >
      <div className="destination-image">
        <Image
          src={destination.image}
          alt={destination.imageAlt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 30vw"
        />
      </div>
      <div className="destination-heading">
        <div>
          <span className="eyebrow">{destination.locationLabel}</span>
          <h3>{destination.name}</h3>
        </div>
        <span className="destination-arrow">
          <ArrowUpRight size={22} aria-hidden="true" />
        </span>
      </div>
      <p>{destination.invitation}</p>
    </Link>
  );
}

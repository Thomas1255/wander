import Image from "next/image";
import { CalendarDays, Moon } from "lucide-react";

import type { DemoTrip } from "@/lib/demo-trips";
import { cn } from "@/lib/utils";

export function TripCard({
  trip,
  featured = false,
}: {
  trip: DemoTrip;
  featured?: boolean;
}) {
  return (
    <article
      className={cn("trip-card", featured && "trip-card-featured")}
      id={trip.destination.id}
      aria-labelledby={`${trip.destination.id}-title`}
    >
      <div className="trip-image">
        <Image
          src={trip.destination.image}
          alt={trip.destination.imageAlt}
          fill
          sizes={
            featured
              ? "(max-width: 900px) 90vw, 55vw"
              : "(max-width: 640px) 90vw, 30vw"
          }
          loading="eager"
        />
        <span className="image-label">
          {featured ? "Next on the horizon" : trip.destination.locationLabel}
        </span>
      </div>
      <div className="trip-content">
        <span className="eyebrow">{trip.destination.locationLabel}</span>
        <h3 id={`${trip.destination.id}-title`}>{trip.destination.name}</h3>
        <p className="trip-subtitle">{trip.title}</p>
        <div className="trip-dates">
          <CalendarDays size={15} aria-hidden="true" />
          <span>{trip.dateLabel}</span>
          <span className="trip-duration">
            <Moon size={14} aria-hidden="true" />
            {trip.duration}
          </span>
        </div>
        {featured && <p className="trip-note">{trip.note}</p>}
        <div className="trip-people">
          <div className="avatar-stack" aria-hidden="true">
            {trip.people.map((person, index) => (
              <span key={person} className={`avatar avatar-${index}`}>
                {person.charAt(0)}
              </span>
            ))}
          </div>
          <span>
            {trip.people.length} example travelers
            <span className="sr-only">: {trip.people.join(", ")}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

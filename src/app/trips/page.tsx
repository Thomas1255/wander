import type { Metadata } from "next";

import {
  CollectionSkeleton,
  EmptyCollection,
} from "@/components/trips/collection-states";
import { TripCard } from "@/components/trips/trip-card";
import { DestinationAnchor } from "@/components/trips/destination-anchor";
import { TripsHeader, type PreviewView } from "@/components/trips/trips-header";
import { demoTrips } from "@/lib/demo-trips";

export const metadata: Metadata = { title: "Your trips" };

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const { view: requestedView } = await searchParams;
  const view: PreviewView =
    requestedView === "empty" || requestedView === "loading"
      ? requestedView
      : "trips";

  return (
    <main id="main-content" tabIndex={-1} className="page-container trips-page">
      <TripsHeader view={view} />
      {view === "empty" ? (
        <EmptyCollection />
      ) : view === "loading" ? (
        <CollectionSkeleton />
      ) : (
        <div className="trip-grid">
          <DestinationAnchor />
          {demoTrips.map((trip, index) => (
            <TripCard
              key={trip.destination.id}
              trip={trip}
              featured={index === 0}
            />
          ))}
        </div>
      )}
      <p className="preview-footnote">
        A glimpse of what&apos;s to come. Trip creation and collaboration
        aren&apos;t available in this preview.
      </p>
    </main>
  );
}

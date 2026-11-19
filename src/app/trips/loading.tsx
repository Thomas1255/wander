import { CollectionSkeleton } from "@/components/trips/collection-states";
import { TripsHeader } from "@/components/trips/trips-header";

export default function Loading() {
  return (
    <main id="main-content" tabIndex={-1} className="page-container trips-page">
      <TripsHeader view="loading" />
      <CollectionSkeleton />
    </main>
  );
}

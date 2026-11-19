import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type PreviewView = "trips" | "empty" | "loading";

export function TripsHeader({ view = "trips" }: { view?: PreviewView }) {
  return (
    <>
      <div className="trips-heading">
        <div>
          <p className="eyebrow">Good things on the horizon</p>
          <h1>
            Your next
            <br />
            <span>somewhere.</span>
          </h1>
        </div>
        <div className="trips-heading-note">
          <Badge variant="outline" className="preview-badge">
            Sample collection
          </Badge>
          <p>
            A few journeys to picture yourself in.
            <br />
            All trips and travelers are examples.
          </p>
          <Link href="/#destinations" className="text-link">
            A little inspiration
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="collection-toolbar">
        <div className="collection-title">
          <h2>Upcoming trips</h2>
          <span className="eyebrow">Read-only preview</span>
        </div>
        <nav aria-label="Collection preview" className="preview-switch">
          {(
            [
              { href: "/trips", value: "trips", label: "With trips" },
              { href: "/trips?view=empty", value: "empty", label: "No trips" },
              {
                href: "/trips?view=loading",
                value: "loading",
                label: "Loading",
              },
            ] as const
          ).map((item) => (
            <Link
              key={item.value}
              href={item.href}
              aria-current={view === item.value ? "page" : undefined}
              scroll={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

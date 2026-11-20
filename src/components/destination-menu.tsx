"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { InfiniteMenuHandle } from "@/components/react-bits/infinite-menu";
import { destinations } from "@/lib/demo-trips";

const InfiniteMenu = dynamic(() => import("./react-bits/infinite-menu"), {
  ssr: false,
});

const items = destinations.map((destination) => ({
  image: destination.image,
  title: destination.name,
  description: destination.locationLabel,
  link: `/trips#${destination.id}`,
}));

function subscribeToMotion(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function allowsMotion() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DestinationMenu() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<InfiniteMenuHandle>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const motion = useSyncExternalStore(
    subscribeToMotion,
    allowsMotion,
    () => false,
  );
  const animated = motion && inView && !unsupported;
  const destination = destinations[activeIndex] ?? destinations[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="destination-menu"
      ref={rootRef}
      data-presentation={animated ? "globe" : "static"}
      data-ready={!animated || ready}
    >
      <div className="destination-menu-stage">
        <span className="horizon-ink-boundary" aria-hidden="true" />
        {animated && (
          <InfiniteMenu
            ref={menuRef}
            items={items}
            count={80}
            roundness={0.1}
            zoom={1.05}
            pullBack={0.35}
            stretch={0.15}
            inertia={0.35}
            autoplay={0}
            grayscale={false}
            dim={0}
            intro={false}
            showInfo={false}
            onReady={() => setReady(true)}
            onUnsupported={() => setUnsupported(true)}
            onActiveChange={(_, index) => setActiveIndex(index)}
            onItemClick={(_, index) => {
              const selected = destinations[index];
              if (selected) router.push(`/trips#${selected.id}`);
            }}
          />
        )}
        {(!animated || !ready) && (
          <div className="destination-menu-still">
            <Image
              src={destination.image}
              alt={destination.imageAlt}
              fill
              sizes="(max-width: 767px) 80vw, 380px"
            />
          </div>
        )}
      </div>
      <div className="destination-menu-details">
        <div aria-live="polite" aria-atomic="true">
          <h3>{destination.name}</h3>
          <p>{destination.locationLabel}</p>
        </div>
        <Button asChild>
          <Link
            href={`/trips#${destination.id}`}
            aria-label={`See ${destination.name} sample trip`}
          >
            View sample trip
          </Link>
        </Button>
      </div>
      <div className="destination-menu-controls">
        <div role="group" aria-label="Choose a destination to explore">
          {destinations.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => {
                setActiveIndex(index);
                menuRef.current?.select(index);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p id="destination-menu-instructions" className="destination-menu-hint">
          {animated ? "Drag to explore" : null}
          <span className="sr-only">
            Use the arrow keys on the globe or the destination buttons to choose
            a place, then open its sample trip.
          </span>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/demo-trips";

const slides = [
  {
    destination: destinations[0],
    country: "Japan",
    navigationTone: "dark",
    location: "Tokyo",
    description: "Tokyo Tower, Senso-ji, and Shinjuku after dark.",
  },
  {
    destination: destinations[1],
    country: "Greece",
    navigationTone: "light",
    location: "Santorini",
    description: "Caldera views, volcanic beaches, and sunsets in Oia.",
  },
  {
    destination: destinations[2],
    country: "Iceland",
    navigationTone: "dark",
    location: "South Coast",
    description: "Waterfalls, black-sand beaches, and glacier lagoons.",
  },
] as const;

export function DestinationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const gesture = useRef<{ x: number; y: number; pointerId: number } | null>(
    null,
  );
  const slide = slides[activeIndex] ?? slides[0];

  function changeSlide(direction: number) {
    setActiveIndex(
      (index) => (index + direction + slides.length) % slides.length,
    );
  }

  function startSwipe(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "touch" ||
      !event.isPrimary ||
      (event.target instanceof Element && event.target.closest("a, button"))
    ) {
      return;
    }
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
  }

  function finishSwipe(event: PointerEvent<HTMLElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || event.pointerId !== start.pointerId) return;

    const horizontal = event.clientX - start.x;
    const vertical = event.clientY - start.y;
    if (
      Math.abs(horizontal) >= 50 &&
      Math.abs(horizontal) > Math.abs(vertical)
    ) {
      changeSlide(horizontal < 0 ? 1 : -1);
    }
  }

  return (
    <section
      className="cinematic-hero"
      data-navigation-tone={slide.navigationTone}
      aria-label="Featured destinations"
      aria-roledescription="carousel"
      onPointerDown={startSwipe}
      onPointerUp={finishSwipe}
      onPointerCancel={() => {
        gesture.current = null;
      }}
    >
      {slides.map((item, index) => (
        <Image
          key={item.country}
          src={item.destination.image}
          alt={index === activeIndex ? item.destination.imageAlt : ""}
          aria-hidden={index !== activeIndex}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority={index === 0 ? "high" : "low"}
          className={`hero-image hero-image-${item.destination.id}`}
          data-active={index === activeIndex}
          draggable={false}
        />
      ))}
      <div className="hero-fade" aria-hidden="true" />
      <div className="page-container hero-content">
        <div
          id="featured-destination"
          className="hero-copy"
          role="group"
          aria-roledescription="slide"
          aria-label={slide.country}
        >
          <p className="hero-location">{slide.location}</p>
          <h1>{slide.country}</h1>
          <p className="hero-description">{slide.description}</p>
          <Button asChild className="hero-action">
            <Link href={`/trips#${slide.destination.id}`}>
              View sample trip
            </Link>
          </Button>
        </div>
        <div
          className="hero-pagination"
          role="group"
          aria-label="Choose a destination"
        >
          {slides.map((item, index) => (
            <button
              key={item.country}
              type="button"
              className="hero-selector"
              aria-pressed={activeIndex === index}
              aria-controls="featured-destination"
              onClick={() => setActiveIndex(index)}
            >
              <span>{item.country}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hero-arrows" role="group" aria-label="Change destination">
        <button
          type="button"
          className="hero-arrow hero-previous"
          aria-label="Previous destination"
          aria-controls="featured-destination"
          onClick={() => changeSlide(-1)}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="hero-arrow hero-next"
          aria-label="Next destination"
          aria-controls="featured-destination"
          onClick={() => changeSlide(1)}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
      <p className="sr-only" role="status">
        {slide.country}, slide {activeIndex + 1} of {slides.length}.
      </p>
    </section>
  );
}

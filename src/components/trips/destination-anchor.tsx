"use client";

import { useEffect } from "react";

export function DestinationAnchor() {
  useEffect(() => {
    // The route's loading fallback can appear before the requested trip exists.
    // Resolve the fragment again once the actual collection has mounted.
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target?.matches(".trip-card")) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, []);

  return null;
}

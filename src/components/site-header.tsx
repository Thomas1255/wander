"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Discover" },
  { href: "/trips", label: "Your trips" },
];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function hasScrolled() {
  return window.scrollY > 16;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    hasScrolled,
    () => false,
  );

  return (
    <header
      className={
        pathname === "/" ? "site-header site-header-overlay" : "site-header"
      }
      data-scrolled={scrolled}
      id="top"
    >
      <div className="page-container header-inner">
        <Link className="wordmark" href="/" aria-label="Wander home">
          wander<span aria-hidden="true">↗</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Badge variant="outline" className="preview-badge">
          <span className="preview-dot" aria-hidden="true" />
          Design preview
        </Badge>
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <Button
              className="mobile-menu-trigger"
              variant="ghost"
              aria-label="Open navigation"
            >
              Menu <Menu size={18} aria-hidden="true" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="mobile-menu">
              <div className="mobile-menu-top">
                <span className="wordmark" aria-hidden="true">
                  wander↗
                </span>
                <Dialog.Close asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Close navigation"
                  >
                    <X size={20} aria-hidden="true" />
                  </Button>
                </Dialog.Close>
              </div>
              <Dialog.Title className="eyebrow">
                A little exploration
              </Dialog.Title>
              <Dialog.Description className="menu-description">
                Somewhere new starts here.
              </Dialog.Description>
              <nav aria-label="Mobile navigation" className="mobile-nav">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
                <Link href="/#destinations" onClick={() => setMenuOpen(false)}>
                  Destinations
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </nav>
              <p className="menu-footnote">A travel companion, taking shape.</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer page-container">
      <div>
        <Link href="/" className="wordmark" aria-label="Wander home">
          wander↗
        </Link>
        <p>For the places. And the people.</p>
      </div>
      <span className="footer-note">
        An independent project. A shared sense of adventure.
      </span>
      <details className="photo-credits">
        <summary>
          Photography
          <ChevronDown size={14} aria-hidden="true" />
        </summary>
        <ul>
          <li>
            <a href="https://unsplash.com/photos/Y4Tn1J25qVA">
              Santorini · Jonas
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="https://unsplash.com/photos/IocJwyqRv3M">
              Tokyo · Louie Martinez
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="https://unsplash.com/photos/BGiBzTZVewM">
              Iceland · Ben Eaton
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </details>
    </footer>
  );
}

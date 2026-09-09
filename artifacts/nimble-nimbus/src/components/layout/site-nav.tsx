import { useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { navItems } from "@/data/content";
import { Brand } from "./brand";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-nav" data-testid="navigation-main">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              className="nav-link mono"
              href={item.href}
              key={item.href}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            className="nav-cta mono"
            href="https://www.linkedin.com/in/wheresjek/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-nav-contact"
          >
            LinkedIn{" "}
            <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>
      </header>
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
        data-testid="menu-mobile"
      >
        <span className="mono">
          Nimble Nimbus / Independent Idea Accelerator Lab
        </span>
        {navItems.map((item) => (
          <Link
            className="mobile-link"
            href={item.href}
            key={item.href}
            onClick={closeMenu}
            data-testid={`link-mobile-${item.label.toLowerCase()}`}
          >
            {item.label}{" "}
            <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
          </Link>
        ))}
        <a
          className="mobile-link"
          href="https://www.linkedin.com/in/wheresjek/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          data-testid="link-mobile-contact"
        >
          LinkedIn <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

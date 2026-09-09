import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-testid="footer-main">
      <Brand />
      <div className="footer-links mono">
        <a
          className="footer-link"
          href="mailto:idea@nimblenimbus.co.uk"
          data-testid="link-footer-email"
        >
          Email
        </a>
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/wheresjek/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-footer-linkedin"
        >
          LinkedIn
        </a>
      </div>
      <span className="footer-note mono" data-testid="text-footer-note">
        Nimble Nimbus / 2026
      </span>
    </footer>
  );
}

import { Link } from "wouter";

export function Brand() {
  return (
    <Link
      className="brand"
      href="/"
      data-testid="link-brand-home"
      aria-label="Nimble Nimbus home"
    >
      <img
        className="brand-logo"
        src="/NN-logo-transparent.png"
        alt="Nimble Nimbus Logo"
      />
      <span>Nimble Nimbus</span>
    </Link>
  );
}

import { type FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = (formData.get("_honey") as string) || "";
    if (honeypot) {
      setFormState("sent");
      form.reset();
      return;
    }

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/idea@nimblenimbus.co.uk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `New Brief from ${name} (${email})`,
          }),
        },
      );

      if (response.ok) {
        setFormState("sent");
        form.reset();
      } else {
        window.location.href = `mailto:idea@nimblenimbus.co.uk?subject=${encodeURIComponent(`New Brief from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        setFormState("sent");
      }
    } catch {
      window.location.href = `mailto:idea@nimblenimbus.co.uk?subject=${encodeURIComponent(`New Brief from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      setFormState("sent");
    }
  };

  return (
    <section
      className="section home-contact"
      id="contact"
      data-testid="section-contact"
    >
      <div className="section-inner">
        <div className="section-kicker reveal">
          <span className="line" aria-hidden="true" />
          <span className="mono">Next move / 05</span>
        </div>
        <h2
          className="contact-heading display reveal"
          data-testid="heading-contact"
        >
          Have a sharp
          <br />
          <em>idea?</em>
        </h2>
        <div className="contact-grid">
          <div>
            <a
              className="contact-email reveal"
              href="mailto:idea@nimblenimbus.co.uk"
              data-testid="link-contact-email"
            >
              idea@nimblenimbus.co.uk{" "}
              <ArrowUpRight size={25} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <form
              className="contact-form reveal delay-1"
              onSubmit={handleSubmit}
              data-testid="form-contact"
            >
              {/* Honeypot field for spam prevention */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <label htmlFor="contact-honey">Leave this field blank</label>
                <input
                  id="contact-honey"
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="contact-form-row">
                <label>
                  <span className="sr-only">Your name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    data-testid="input-contact-name"
                    disabled={formState === "sending"}
                  />
                </label>
                <label>
                  <span className="sr-only">Email address</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    data-testid="input-contact-email"
                    disabled={formState === "sending"}
                  />
                </label>
              </div>
              <label>
                <span className="sr-only">What are you making?</span>
                <textarea
                  name="message"
                  placeholder="What are you making?"
                  required
                  data-testid="input-contact-message"
                  disabled={formState === "sending"}
                />
              </label>
              {formState === "sent" ? (
                <p
                  className="form-success"
                  role="status"
                  data-testid="status-contact-success"
                >
                  Received. We will make room for a useful next conversation.
                </p>
              ) : (
                <button
                  className="form-submit mono"
                  type="submit"
                  disabled={formState === "sending"}
                  data-testid="button-contact-submit"
                >
                  {formState === "sending"
                    ? "Sending brief..."
                    : "Send the brief"}{" "}
                  <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
                </button>
              )}
            </form>
          </div>
          <p className="contact-aside reveal delay-2">
            Tell us how can we help you co-create something that matters.
          </p>
        </div>
      </div>
    </section>
  );
}

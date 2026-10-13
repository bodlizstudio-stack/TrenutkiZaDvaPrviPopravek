"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { contactEmail } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

function setSlovenianValidity(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  if (input.validity.valueMissing) {
    input.setCustomValidity("To polje je obvezno.");
    return;
  }
  if (input.validity.typeMismatch) {
    input.setCustomValidity("Vnesite veljaven e-poštni naslov.");
    return;
  }
  input.setCustomValidity("");
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Sporočila ni bilo mogoče poslati.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Prišlo je do napake. Poskusite znova.");
    }
  };

  return (
    <div className="reveal bg-ivory py-10 md:py-16">
      <div className="container-wide grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] text-ink">
            Pišite nama, če potrebujeta pomoč pri naročilu.
          </h1>
          <p className="mt-4 text-muted">
            Vprašanja o knjigi, dostavi ali obstoječem naročilu pošljite na e-pošto ali prek
            obrazca.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-6 inline-flex min-h-11 items-center font-serif text-2xl text-ink underline decoration-burgundy/40 underline-offset-4"
          >
            {contactEmail}
          </a>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>
              <Link className="underline underline-offset-4" href="/100-nepozabnih-trenutkov">
                Stran knjige in naročilo
              </Link>
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/dostava">
                Dostava
              </Link>
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/vracila">
                Vračila
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-soft md:p-8">
          {status === "success" ? (
            <div role="status" className="py-8 text-center">
              <h2 className="font-serif text-3xl text-ink">Hvala za sporočilo.</h2>
              <p className="mt-3 text-muted">Odgovorili bomo na naslov, ki ste ga vnesli.</p>
              <Button type="button" variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
                Pošlji novo sporočilo
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
              {status === "error" ? (
                <p role="alert" className="rounded-xl bg-cream px-3 py-2 text-sm text-burgundy">
                  {errorMsg}
                </p>
              ) : null}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Spletna stran</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Ime in priimek
                </label>
                <input
                  required
                  id="name"
                  name="name"
                  autoComplete="name"
                  className="min-h-11 w-full rounded-xl border border-line bg-ivory px-3"
                  onInvalid={(event) => setSlovenianValidity(event.currentTarget)}
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  E-pošta
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="min-h-11 w-full rounded-xl border border-line bg-ivory px-3"
                  aria-invalid={status === "error"}
                  onInvalid={(event) => setSlovenianValidity(event.currentTarget)}
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  Zadeva
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="min-h-11 w-full rounded-xl border border-line bg-ivory px-3"
                >
                  <option>Vprašanje o izdelku</option>
                  <option>Moje naročilo</option>
                  <option>Dostava</option>
                  <option>Vračilo</option>
                  <option>Sodelovanje</option>
                  <option>Drugo</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Sporočilo
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border border-line bg-ivory px-3 py-3"
                  onInvalid={(event) => setSlovenianValidity(event.currentTarget)}
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted">
                <input required type="checkbox" name="consent" className="mt-1 h-4 w-4" />
                <span>Strinjam se, da se moji podatki uporabijo za odgovor na to sporočilo.</span>
              </label>
              <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Pošiljam …" : "Pošlji sporočilo"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

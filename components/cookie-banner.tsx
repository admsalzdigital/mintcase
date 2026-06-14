"use client";

import clsx from "clsx";
import {
  getStoredConsent,
  setStoredConsent,
  type ConsentStatus,
} from "lib/consent";
import { enableTracking } from "lib/tracking";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const storedConsent = getStoredConsent();

    if (storedConsent === "accepted") {
      enableTracking();
      return;
    }

    if (!storedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status: ConsentStatus) => {
    setStoredConsent(status);
    setIsVisible(false);

    if (status === "accepted") {
      enableTracking();
    }
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 p-4 transition-all duration-500 ease-out sm:p-6"
    >
      <div
        className={clsx(
          "mx-auto max-w-4xl rounded-2xl border border-cyan-500/20",
          "bg-[#1c1c1e]/95 px-5 py-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl",
          "sm:px-6 sm:py-6",
        )}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              />
              <p className="text-sm font-semibold tracking-wide text-cyan-300">
                MintCase Datenschutz
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/90 sm:text-base">
              Wir verwenden Cookies und Tracking-Technologien (Meta Pixel,
              TikTok Pixel), um unsere Website zu verbessern und relevante
              Inhalte anzuzeigen. Du entscheidest, ob du dem zustimmst.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleConsent("declined")}
              className={clsx(
                "rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium",
                "text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white",
              )}
            >
              Ablehnen
            </button>
            <button
              type="button"
              onClick={() => handleConsent("accepted")}
              className={clsx(
                "rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#111114]",
                "shadow-[0_0_24px_rgba(34,211,238,0.35)] transition",
                "hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]",
              )}
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

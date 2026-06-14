export const CONSENT_STORAGE_KEY = "mintcase-cookie-consent";

export type ConsentStatus = "accepted" | "declined";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;

  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "accepted" || value === "declined") {
    return value;
  }

  return null;
}

export function setStoredConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, status);
}

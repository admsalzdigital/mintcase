export const MINTCASE_PRODUCT_HANDLE =
  process.env.MINTCASE_PRODUCT_HANDLE || "mintcase-iphone-case";

export const BRAND = {
  mint: "#AEE2DB",
  mintHover: "#8FD4CB",
  background: "#0B0B0D",
  surface: "#141418",
  border: "#2A2A30",
} as const;

export const VALUE_PROPS = [
  {
    title: "Zwei-Kammer-Design",
    description:
      "Getrennte Fächer für frische und benutzte Mint-Pads. 100 % geruchsblockierend.",
    icon: "layers" as const,
  },
  {
    title: "Premium-Materialien",
    description:
      "Lebensmittelechtes Silikon — BPA-frei, temperaturbeständig und antimikrobiell.",
    icon: "shield" as const,
  },
  {
    title: "Schlankes Profil",
    description:
      "Nur 3 mm mehr Dicke — volle Funktionalität und kabelloses Laden bleiben erhalten.",
    icon: "device" as const,
  },
  {
    title: "Diskretes Design",
    description:
      "Sieht aus wie jedes Premium-Case — niemand erkennt den versteckten Zweck.",
    icon: "eye" as const,
  },
];

export const REVIEWS = [
  {
    quote: "Ein Gamechanger fürs Büro.",
    body: "Keine peinlichen Momente mehr mit Mint-Dosen. Dieses Case ist so diskret, niemand merkt etwas.",
    name: "Marcus",
    location: "Stockholm",
  },
  {
    quote: "Keine Dosen mehr in der Tasche.",
    body: "Endlich eine Lösung ohne bulkige Hosentaschen. Die zwei Fächer sind genial.",
    name: "Erik",
    location: "Oslo",
  },
  {
    quote: "Sieht cool aus und versteckt den Geruch.",
    body: "Perfekt für alle, die diskret bleiben wollen. Die Geruchsblockierung funktioniert wirklich.",
    name: "Anna",
    location: "Kopenhagen",
  },
];

export const STATS = [
  { value: "1.000+", label: "Zufriedene Kunden" },
  { value: "4,9/5", label: "Durchschnittsbewertung" },
  { value: "1 Jahr", label: "Garantie" },
];

export const TRUST_BADGES = [
  { label: "Passt perfekt", icon: "check" as const },
  { label: "30 Tage Rückgaberecht", icon: "return" as const },
  { label: "Premium-Material", icon: "shield" as const },
  { label: "100 % geruchsblockierend", icon: "sparkle" as const },
];

export const INSTAGRAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    alt: "MintCase Lifestyle-Aufnahme 1",
  },
  {
    src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=600&q=80",
    alt: "MintCase Lifestyle-Aufnahme 2",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    alt: "MintCase Lifestyle-Aufnahme 3",
  },
  {
    src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
    alt: "MintCase Lifestyle-Aufnahme 4",
  },
  {
    src: "https://images.unsplash.com/photo-1592899677978-10e261caba04?auto=format&fit=crop&w=600&q=80",
    alt: "MintCase Lifestyle-Aufnahme 5",
  },
  {
    src: "https://images.unsplash.com/photo-1505740106531-4243a515585a?auto=format&fit=crop&w=600&q=80",
    alt: "MintCase Lifestyle-Aufnahme 6",
  },
];

export const FALLBACK_PRODUCT = {
  title: "MintCase iPhone Case",
  price: "30.00",
  currencyCode: "EUR",
  description:
    "Eine smarte Art, Mint dabei zu haben — ohne Volumen, Geräusche oder Geruch. MintCase bietet zwei diskrete Fächer für frische und benutzte Pads, nahtlos integriert in eine schlanke Silhouette wie dein iPhone.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80",
      altText: "MintCase iPhone Case",
    },
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      altText: "MintCase Detailansicht",
    },
    {
      src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80",
      altText: "MintCase in der Hand",
    },
  ],
  options: [
    {
      name: "Modell",
      values: [
        "iPhone 13",
        "iPhone 13 Pro",
        "iPhone 14",
        "iPhone 14 Pro",
        "iPhone 15",
        "iPhone 15 Pro",
      ],
    },
    {
      name: "Farbe",
      values: ["Schwarz", "Weiß", "Mint"],
    },
  ],
};

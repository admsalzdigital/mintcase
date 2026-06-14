declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: {
      load: (pixelId: string) => void;
      page: () => void;
      grantConsent: () => void;
      holdConsent: () => void;
      methods: string[];
      setAndDefer: (target: Record<string, unknown>, method: string) => void;
      push: (args: unknown[]) => void;
      _i?: Record<string, unknown[]>;
      _t?: Record<string, number>;
      _o?: Record<string, Record<string, unknown>>;
      [key: string]: unknown;
    };
    TiktokAnalyticsObject?: string;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

let trackingEnabled = false;

function initMetaPixel(pixelId: string) {
  if (window.fbq) {
    window.fbq("consent", "grant");
    window.fbq("track", "PageView");
    return;
  }

  const bootstrap = document.createElement("script");
  bootstrap.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('consent', 'grant');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(bootstrap);
}

function initTikTokPixel(pixelId: string) {
  if (window.ttq) {
    window.ttq.grantConsent();
    window.ttq.page();
    return;
  }

  const bootstrap = document.createElement("script");
  bootstrap.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=d.createElement("script");
      o.type="text/javascript";o.async=!0;o.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(o,a);ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{}};
      ttq.holdConsent();
      ttq.load('${pixelId}');
      ttq.grantConsent();
      ttq.page();
    }(window, document, 'ttq');
  `;
  document.head.appendChild(bootstrap);
}

export function enableTracking() {
  if (trackingEnabled || typeof window === "undefined") return;
  trackingEnabled = true;

  if (META_PIXEL_ID) {
    initMetaPixel(META_PIXEL_ID);
  }

  if (TIKTOK_PIXEL_ID) {
    initTikTokPixel(TIKTOK_PIXEL_ID);
  }
}

export {};

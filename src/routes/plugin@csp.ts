import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = ev => {
  const nonce = Date.now().toString(36);
  ev.sharedMap.set("@nonce", nonce);
  const csp = [
    `default-src 'self' 'unsafe-inline'`,
    `font-src 'self'`,
    `img-src 'self' 'unsafe-inline' data:`,
    `script-src 'strict-dynamic' 'unsafe-inline' 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline'`,
    `frame-src 'self' 'nonce-${nonce}'`,
    `object-src 'none'`,
    `base-uri 'self'`,
  ];

  ev.headers.set("Content-Security-Policy-Report-Only", csp.join("; "));
};

const ROBOTS_TAG = "noindex, nofollow, noarchive";

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="BoldOnBald", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": ROBOTS_TAG,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function timingSafeEqual(left, right) {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < length; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

function isAuthorized(request, username, password) {
  if (!username || !password) return false;

  const header = request.headers.get("Authorization");
  if (!header) return false;

  const space = header.indexOf(" ");
  if (space <= 0 || header.slice(0, space) !== "Basic") return false;

  let decoded;
  try {
    decoded = atob(header.slice(space + 1).trim());
  } catch {
    return false;
  }

  const split = decoded.indexOf(":");
  if (split < 0) return false;

  const user = decoded.slice(0, split);
  const pass = decoded.slice(split + 1);
  return timingSafeEqual(user, username) && timingSafeEqual(pass, password);
}

export default {
  async fetch(request, env) {
    if (!isAuthorized(request, env.SITE_USERNAME, env.SITE_PASSWORD)) {
      return unauthorized();
    }

    const asset = await env.ASSETS.fetch(request);
    const headers = new Headers(asset.headers);
    headers.set("X-Robots-Tag", ROBOTS_TAG);
    headers.set("Cache-Control", "private, no-store");
    headers.set("Vary", "Authorization");

    return new Response(asset.body, {
      status: asset.status,
      statusText: asset.statusText,
      headers,
    });
  },
};

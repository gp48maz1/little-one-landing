import { json, error } from '@sveltejs/kit';
import { RsvpSubmitSchema, toPublicEntry } from '$lib/rsvp-shapes.js';
import { createRsvp, checkAndRecordRateLimit } from '$lib/server/rsvp-store.js';

export const prerender = false;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, platform, getClientAddress }) {
  if (!platform?.env?.RSVPS) {
    throw error(503, 'RSVP storage is not configured on this environment.');
  }

  /** @type {unknown} */
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Body must be JSON.');
  }

  const parsed = RsvpSubmitSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw error(400, first?.message ?? 'Invalid submission.');
  }

  // Honeypot — bots fill this; humans don't see it. Don't error, just no-op.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return json({ ok: true, dropped: true }, { status: 200 });
  }

  // Per-IP rate limit (1 submission / 60s)
  const ip = getClientAddress?.() ?? request.headers.get('cf-connecting-ip') ?? '';
  const allowed = await checkAndRecordRateLimit(platform.env.RSVPS, ip);
  if (!allowed) {
    throw error(429, 'Slow down — try again in a minute.');
  }

  const entry = await createRsvp(platform.env.RSVPS, {
    name: parsed.data.name,
    attending: parsed.data.attending,
    partySize: parsed.data.partySize,
    dietary: parsed.data.dietary,
    message: parsed.data.message
  });

  // Return the public-shaped entry (no dietary) so the client can confirm
  // without leaking anything else.
  return json({ ok: true, entry: toPublicEntry(entry) }, { status: 201 });
}

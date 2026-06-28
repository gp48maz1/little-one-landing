import { json, error } from '@sveltejs/kit';
import { listAllRsvps } from '$lib/server/rsvp-store.js';

export const prerender = false;

/**
 * Admin list — Cloudflare Access wraps this path in production. Locally there's
 * no auth gate; that's intentional so dev iteration doesn't require email
 * round-trips. Anyone deploying without CF Access in front would expose this.
 *
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ platform }) {
  if (!platform?.env?.RSVPS) {
    throw error(503, 'RSVP storage is not configured.');
  }
  const entries = await listAllRsvps(platform.env.RSVPS);
  return json({ entries });
}

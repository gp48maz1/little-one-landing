import { listAllRsvps } from '$lib/server/rsvp-store.js';
import { error } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ platform }) {
  if (!platform?.env?.RSVPS) {
    throw error(503, 'RSVP storage is not configured.');
  }
  const entries = await listAllRsvps(platform.env.RSVPS);
  return { entries };
}

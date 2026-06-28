import { json, error } from '@sveltejs/kit';
import { RsvpStatusUpdateSchema } from '$lib/rsvp-shapes.js';
import { deleteRsvp, getRsvp, updateRsvp } from '$lib/server/rsvp-store.js';

export const prerender = false;

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ params, request, platform }) {
  if (!platform?.env?.RSVPS) throw error(503, 'RSVP storage is not configured.');
  if (!params.id) throw error(400, 'Missing id.');

  /** @type {unknown} */
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Body must be JSON.');
  }
  const parsed = RsvpStatusUpdateSchema.safeParse(body);
  if (!parsed.success) throw error(400, 'Invalid status.');

  const existing = await getRsvp(platform.env.RSVPS, params.id);
  if (!existing) throw error(404, 'Not found.');

  const updated = await updateRsvp(platform.env.RSVPS, params.id, {
    status: parsed.data.status
  });
  return json({ ok: true, entry: updated });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, platform }) {
  if (!platform?.env?.RSVPS) throw error(503, 'RSVP storage is not configured.');
  if (!params.id) throw error(400, 'Missing id.');
  await deleteRsvp(platform.env.RSVPS, params.id);
  return json({ ok: true });
}

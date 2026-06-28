// Cloudflare KV-backed RSVP store. All access goes through these helpers so
// the rest of the code never speaks raw KV.

const KEY_PREFIX = 'rsvp:';
const RATELIMIT_PREFIX = 'ratelimit:';
const RATELIMIT_TTL_SEC = 60;

/** @typedef {import('$lib/rsvp-shapes.js').RsvpEntry} RsvpEntry */

/** @param {string} id */
function rsvpKey(id) {
  return `${KEY_PREFIX}${id}`;
}

/**
 * @param {KVNamespace} kv
 * @param {Omit<RsvpEntry, 'id' | 'status' | 'createdAt' | 'updatedAt'>} input
 * @returns {Promise<RsvpEntry>}
 */
export async function createRsvp(kv, input) {
  const now = new Date().toISOString();
  /** @type {RsvpEntry} */
  const entry = {
    id: crypto.randomUUID(),
    name: input.name,
    attending: input.attending,
    partySize: input.partySize,
    dietary: input.dietary ?? '',
    message: input.message ?? '',
    status: 'pending',
    createdAt: now,
    updatedAt: now
  };
  await kv.put(rsvpKey(entry.id), JSON.stringify(entry));
  return entry;
}

/**
 * @param {KVNamespace} kv
 * @param {string} id
 * @returns {Promise<RsvpEntry | null>}
 */
export async function getRsvp(kv, id) {
  const value = await kv.get(rsvpKey(id), 'json');
  return /** @type {RsvpEntry | null} */ (value);
}

/**
 * List ALL entries (admin use). Returns most recent first.
 * @param {KVNamespace} kv
 * @returns {Promise<RsvpEntry[]>}
 */
export async function listAllRsvps(kv) {
  const out = /** @type {RsvpEntry[]} */ ([]);
  let cursor = /** @type {string | undefined} */ (undefined);
  // KV list paginates at 1000 keys. We'll never hit it at this scale, but loop
  // just in case so we don't silently truncate.
  while (true) {
    const page = await kv.list({ prefix: KEY_PREFIX, cursor });
    const values = await Promise.all(
      page.keys.map((k) => kv.get(k.name, 'json').then((v) => /** @type {RsvpEntry | null} */ (v)))
    );
    for (const v of values) if (v) out.push(v);
    if (page.list_complete) break;
    cursor = page.cursor;
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * Filtered helper for the public list — approved only.
 * @param {KVNamespace} kv
 */
export async function listApprovedRsvps(kv) {
  const all = await listAllRsvps(kv);
  return all.filter((e) => e.status === 'approved');
}

/**
 * Count pending entries.
 * @param {KVNamespace} kv
 */
export async function countPending(kv) {
  const all = await listAllRsvps(kv);
  return all.filter((e) => e.status === 'pending').length;
}

/**
 * @param {KVNamespace} kv
 * @param {string} id
 * @param {Partial<Pick<RsvpEntry, 'status' | 'name' | 'dietary' | 'message'>>} patch
 * @returns {Promise<RsvpEntry | null>}
 */
export async function updateRsvp(kv, id, patch) {
  const existing = await getRsvp(kv, id);
  if (!existing) return null;
  const updated = {
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };
  await kv.put(rsvpKey(id), JSON.stringify(updated));
  return updated;
}

/**
 * @param {KVNamespace} kv
 * @param {string} id
 */
export async function deleteRsvp(kv, id) {
  await kv.delete(rsvpKey(id));
}

/**
 * Throttle by IP. Returns true if the caller should be allowed through and
 * false if they're rate-limited. Touching this also primes the window.
 * @param {KVNamespace} kv
 * @param {string} ip
 */
export async function checkAndRecordRateLimit(kv, ip) {
  // Don't rate-limit local dev — no IP header, or localhost IPs.
  if (!ip || ip === '127.0.0.1' || ip === '::1') return true;
  const key = `${RATELIMIT_PREFIX}${ip}`;
  const seen = await kv.get(key);
  if (seen) return false;
  await kv.put(key, '1', { expirationTtl: RATELIMIT_TTL_SEC });
  return true;
}

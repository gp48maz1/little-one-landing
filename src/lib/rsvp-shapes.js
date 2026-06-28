import { z } from 'zod';

// Mirrors the option lists in data.js — kept here so server-side validation
// doesn't need to import UI-shaped data. If you change attendingOptions /
// PARTY_SIZE_VALUES in data.js, update these to match or zod will reject.
export const ATTENDING_VALUES = /** @type {const} */ (['yes', 'no']);
export const PARTY_SIZE_VALUES = /** @type {const} */ (['1', '2', '3', '4+']);
export const STATUS_VALUES = /** @type {const} */ (['pending', 'approved', 'rejected']);

export const RsvpSubmitSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  attending: z.enum(ATTENDING_VALUES),
  partySize: z.enum(PARTY_SIZE_VALUES).default('1'),
  // Dietary notes for the galley — useful to the hosts, not shown publicly.
  dietary: z.string().trim().max(300).default(''),
  // A note for the family. Shown on the RSVP wall after admin approval.
  message: z.string().trim().max(280).default(''),
  // Honeypot — accept any value (so bots get the fake-200 path); the handler
  // decides whether to drop based on whether it's non-empty.
  website: z.string().max(2000).optional().default('')
});

export const RsvpStatusUpdateSchema = z.object({
  status: z.enum(STATUS_VALUES)
});

/**
 * @typedef {Object} RsvpEntry
 * @property {string} id
 * @property {string} name
 * @property {(typeof ATTENDING_VALUES)[number]} attending
 * @property {(typeof PARTY_SIZE_VALUES)[number]} partySize
 * @property {string} dietary
 * @property {string} message
 * @property {(typeof STATUS_VALUES)[number]} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Strip host-only fields for the public list. `message` is public, `dietary`
 * is not.
 * @param {RsvpEntry} entry
 */
export function toPublicEntry(entry) {
  return {
    id: entry.id,
    name: entry.name,
    attending: entry.attending,
    partySize: entry.partySize,
    message: entry.message ?? '',
    createdAt: entry.createdAt
  };
}

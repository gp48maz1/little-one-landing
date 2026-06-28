<script>
  import { invalidateAll } from '$app/navigation';
  import { attendingOptions } from '$lib/data.js';

  let { data } = $props();

  let busyId = $state(/** @type {string | null} */ (null));
  let errorMsg = $state('');

  const attendingLabel = Object.fromEntries(attendingOptions.map((o) => [o.value, o.label]));

  const buckets = $derived.by(() => {
    /** @type {Record<string, any[]>} */
    const groups = { pending: [], approved: [], rejected: [] };
    for (const e of data.entries) {
      groups[e.status]?.push(e);
    }
    return groups;
  });

  async function patchStatus(id, status) {
    busyId = id;
    errorMsg = '';
    try {
      const res = await fetch(`/api/admin/rsvps/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error(`${res.status}`);
      await invalidateAll();
    } catch (err) {
      errorMsg = `Update failed (${err.message}).`;
    } finally {
      busyId = null;
    }
  }

  async function deleteEntry(id) {
    if (!confirm('Delete this RSVP permanently?')) return;
    busyId = id;
    errorMsg = '';
    try {
      const res = await fetch(`/api/admin/rsvps/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`${res.status}`);
      await invalidateAll();
    } catch (err) {
      errorMsg = `Delete failed (${err.message}).`;
    } finally {
      busyId = null;
    }
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  const totalHeads = $derived(
    buckets.approved
      .filter((e) => e.attending === 'yes')
      .reduce((sum, e) => sum + (e.partySize === '4+' ? 4 : Number(e.partySize) || 1), 0)
  );
</script>

<svelte:head>
  <title>Little One Landing — Control Tower</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="admin-wrap">
  <header>
    <h1>Control Tower — RSVPs</h1>
    <p class="muted">
      {data.entries.length} total · {buckets.pending.length} pending ·
      {buckets.approved.length} approved · {buckets.rejected.length} rejected ·
      ~{totalHeads} confirmed heads (approved + attending)
    </p>
  </header>

  {#if errorMsg}
    <div class="error" role="alert">{errorMsg}</div>
  {/if}

  {#each ['pending', 'approved', 'rejected'] as bucket}
    {@const rows = buckets[bucket]}
    <section class="bucket bucket-{bucket}">
      <h2>{bucket} <span class="count">({rows.length})</span></h2>
      {#if rows.length === 0}
        <p class="empty">Nothing here.</p>
      {:else}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Attending</th>
              <th>Seats</th>
              <th>Dietary</th>
              <th>Note to family</th>
              <th>Submitted</th>
              <th class="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as row (row.id)}
              <tr class:busy={busyId === row.id}>
                <td class="name">{row.name}</td>
                <td>{attendingLabel[row.attending] ?? row.attending}</td>
                <td>{row.partySize}</td>
                <td class="notes">{row.dietary || '—'}</td>
                <td class="notes">{row.message || '—'}</td>
                <td class="muted small">{fmtDate(row.createdAt)}</td>
                <td class="actions">
                  {#if row.status !== 'approved'}
                    <button
                      type="button"
                      class="btn approve"
                      disabled={busyId === row.id}
                      onclick={() => patchStatus(row.id, 'approved')}>Approve</button>
                  {/if}
                  {#if row.status !== 'rejected'}
                    <button
                      type="button"
                      class="btn reject"
                      disabled={busyId === row.id}
                      onclick={() => patchStatus(row.id, 'rejected')}>Reject</button>
                  {/if}
                  {#if row.status === 'rejected'}
                    <button
                      type="button"
                      class="btn approve"
                      disabled={busyId === row.id}
                      onclick={() => patchStatus(row.id, 'pending')}>Reopen</button>
                  {/if}
                  <button
                    type="button"
                    class="btn delete"
                    disabled={busyId === row.id}
                    onclick={() => deleteEntry(row.id)}>Delete</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </section>
  {/each}
</main>

<style>
  .admin-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 24px 80px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    color: #1a1a1a;
  }
  header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e6e0cf;
  }
  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .muted {
    color: #6b6b6b;
    font-size: 14px;
    margin: 4px 0 0;
  }
  .small {
    font-size: 13px;
  }
  .bucket {
    margin-bottom: 32px;
  }
  .bucket h2 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #6b6b6b;
    margin: 0 0 10px;
    font-weight: 800;
  }
  .bucket-pending h2 {
    color: #b08a00;
  }
  .bucket-approved h2 {
    color: #2f855a;
  }
  .bucket-rejected h2 {
    color: #b94a1a;
  }
  .count {
    color: #6b6b6b;
    font-weight: 600;
  }
  .empty {
    color: #6b6b6b;
    font-style: italic;
    font-size: 14px;
    margin: 8px 0 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border: 1px solid #e6e0cf;
    border-radius: 12px;
    overflow: hidden;
    font-size: 14px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }
  thead th {
    background: #f4f1e8;
    text-align: left;
    padding: 10px 12px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #6b6b6b;
    font-weight: 800;
    border-bottom: 1px solid #e6e0cf;
  }
  tbody td {
    padding: 10px 12px;
    border-bottom: 1px solid #f0ebdc;
    vertical-align: top;
  }
  tr.busy {
    opacity: 0.5;
  }
  .name {
    font-weight: 700;
  }
  .notes {
    max-width: 240px;
  }
  .actions {
    white-space: nowrap;
  }
  .btn {
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 10px;
    margin: 0 2px;
    border-radius: 7px;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .approve {
    background: #2f855a;
    color: #fff;
  }
  .reject {
    background: #fff;
    color: #b94a1a;
    border-color: #e6b8a3;
  }
  .delete {
    background: #fff;
    color: #6b6b6b;
    border-color: #ddd;
  }
  .error {
    background: #fff5f5;
    border: 1px solid #fbb;
    color: #9b2c2c;
    padding: 10px 12px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
</style>

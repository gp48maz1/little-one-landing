<script>
  import { attendingOptions, PARTY_SIZE_VALUES, event } from '$lib/data.js';

  const MESSAGE_MAX = 280;

  let name = $state('');
  let attending = $state('yes');
  let partySize = $state('1');
  let dietary = $state('');
  let message = $state('');
  // Honeypot — bots fill anything visible. Humans don't see this field.
  let website = $state('');
  let status = $state('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  let errorMsg = $state('');

  const messageCount = $derived(message.length);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      errorMsg = 'Passenger name is required.';
      status = 'error';
      return;
    }
    status = 'sending';
    errorMsg = '';

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          partySize,
          dietary: dietary.trim(),
          message: message.trim(),
          website // honeypot
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message ?? `HTTP ${res.status}`);
      }
      await res.json();
      status = 'sent';
    } catch (err) {
      status = 'error';
      errorMsg = err.message || 'Something went wrong.';
    }
  }

  function resetForm() {
    name = '';
    attending = 'yes';
    partySize = '1';
    dietary = '';
    message = '';
    website = '';
    status = 'idle';
    errorMsg = '';
  }
</script>

<section class="rsvp pad" id="rsvp">
  <div class="wrap">
    <div class="shead" style="justify-content:center">
      <span class="n">06</span><h2>Check in for the flight</h2>
    </div>
    <p class="ssub center" style="margin-left:auto;margin-right:auto">
      Confirm your seat below. We can't wait to see you on the tarmac.
    </p>

    <div class="formcard">
      {#if status === 'sent'}
        <div class="success">
          <div class="success-icon" aria-hidden="true">✈</div>
          <div>
            <strong>You're checked in.</strong>
            Thanks for confirming — we'll see you on the runway. The hosts will be in touch with any
            last-minute details.
          </div>
          <button type="button" class="btn" onclick={resetForm}>Check in someone else</button>
        </div>
      {:else}
        <form onsubmit={handleSubmit} novalidate>
          <!-- Honeypot — visually hidden, never tab-focusable. -->
          <div class="hp" aria-hidden="true">
            <label>
              Leave blank
              <input type="text" name="website" tabindex="-1" autocomplete="off" bind:value={website} />
            </label>
          </div>

          <div class="field">
            <label for="rsvp-name">Passenger name</label>
            <input
              id="rsvp-name"
              type="text"
              placeholder="Your name"
              autocomplete="name"
              maxlength="80"
              bind:value={name}
            />
          </div>

          <div class="field two">
            <div>
              <label for="rsvp-party">Seats (party size)</label>
              <select id="rsvp-party" bind:value={partySize}>
                {#each PARTY_SIZE_VALUES as size}
                  <option value={size}>{size}</option>
                {/each}
              </select>
            </div>
            <div>
              <label for="rsvp-attending">Attending?</label>
              <select id="rsvp-attending" bind:value={attending}>
                {#each attendingOptions as opt}
                  <option value={opt.value}>{opt.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="field">
            <label for="rsvp-dietary">Dietary notes for the galley</label>
            <input
              id="rsvp-dietary"
              type="text"
              placeholder="Allergies, preferences…"
              maxlength="300"
              bind:value={dietary}
            />
          </div>

          <div class="field">
            <label for="rsvp-message">A note for the family</label>
            <textarea
              id="rsvp-message"
              rows="3"
              placeholder="Send some love…"
              maxlength={MESSAGE_MAX}
              bind:value={message}
            ></textarea>
            <span class="char-counter">{messageCount} / {MESSAGE_MAX}</span>
          </div>

          {#if errorMsg}
            <div class="error" role="alert">{errorMsg}</div>
          {/if}

          <button type="submit" class="btn confirm" disabled={status === 'sending'}>
            {status === 'sending' ? 'Confirming…' : 'Confirm my seat'}
          </button>
          <p class="boarding-note">⚑ Boarding closes {event.boardingCloses}</p>
        </form>
      {/if}
    </div>
  </div>
</section>

<style>
  .formcard {
    background: var(--cream);
    border: 1px solid var(--line);
    border-radius: 18px;
    box-shadow: var(--shadow);
    padding: 28px 30px;
    max-width: 640px;
    margin: 0 auto;
  }
  .field {
    margin-bottom: 16px;
  }
  .field label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-soft);
    display: block;
    margin-bottom: 6px;
  }
  .field input,
  .field select,
  .field textarea {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: var(--cream-2);
    font-family: 'Nunito Sans', system-ui, sans-serif;
    font-size: 15px;
    color: var(--ink);
  }
  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    outline: none;
    border-color: var(--sky-deep);
    box-shadow: 0 0 0 3px var(--sky-soft);
  }
  .field textarea {
    resize: vertical;
  }
  .field.two {
    display: flex;
    gap: 14px;
  }
  .field.two > div {
    flex: 1;
  }
  .char-counter {
    display: block;
    text-align: right;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--ink-soft);
    margin-top: 4px;
  }
  .confirm {
    display: block;
    width: 100%;
    text-align: center;
  }
  .boarding-note {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--sky-deep);
    text-align: center;
    margin-top: 12px;
  }

  /* Honeypot — visually removed but still in DOM for bots */
  .hp {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .error {
    background: #fff5f5;
    border: 1px solid #fbb;
    color: #9b2c2c;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .success {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    align-items: center;
  }
  .success-icon {
    font-size: 40px;
    line-height: 1;
    color: var(--lemon-deep);
  }
  .success strong {
    display: block;
    margin-bottom: 2px;
    font-family: 'Fraunces', serif;
    font-size: 18px;
  }
  .success .btn {
    grid-column: 1 / -1;
    justify-self: start;
  }
</style>

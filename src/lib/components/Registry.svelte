<script>
  import { registries } from '$lib/data.js';
</script>

<section class="pad" id="registry">
  <div class="wrap">
    <div class="shead"><span class="n">04</span><h2>Pack the cargo hold</h2></div>
    <p class="ssub">
      Help us stock the cabin for our littlest passenger. Tap a tag to view the registry.
    </p>
    <div class="tags">
      {#each registries as r}
        <a
          class="tag"
          href={r.url}
          target={r.url === '#' ? null : '_blank'}
          rel="noopener noreferrer"
        >
          <div class="k">Registry</div>
          <div class="v">{r.label}</div>
          <div class="go">View list →</div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    margin-top: 8px;
  }
  .tag {
    flex: 1 1 250px;
    background: var(--kraft);
    border: 1px solid var(--kraft-line);
    border-radius: 14px;
    padding: 20px 22px 20px 40px;
    position: relative;
    color: #4a3f20;
    box-shadow: var(--shadow);
    text-decoration: none;
    display: block;
    transition: transform 120ms ease;
  }
  .tag:hover {
    transform: translateY(-2px);
  }
  .tag::before {
    content: '';
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--cream-2);
    border: 2px solid #b59b56;
  }
  .tag .k {
    font-family: 'Space Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .tag .v {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 19px;
    margin: 3px 0 2px;
  }
  .tag .go {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
  }
</style>
